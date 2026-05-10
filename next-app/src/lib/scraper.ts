import type { Product, Category } from "./types";
import { searchProducts as searchMock } from "../mocks/products";
import { searchGoogleShoppingWithFirecrawl } from "./firecrawl";

const CACHE_TTL_MS = 5 * 60 * 1000;
const FETCH_TIMEOUT_MS = 15_000;

const cache = new Map<string, { results: Product[]; expiresAt: number }>();

/** Registry of live products seen this process lifetime — used by simulate_purchase. */
export const liveProductRegistry = new Map<string, Product>();

// VTEX catalog API — works on Jumbo and Carrefour without auth
const VTEX_STORES: Record<string, { host: string }> = {
  jumbo: { host: "www.jumbo.com.ar" },
  carrefour: { host: "www.carrefour.com.ar" },
};

interface VtexOffer {
  Price: number;
  PriceWithoutDiscount: number;
  AvailableQuantity: number;
  Teasers?: { Name?: string }[];
}

interface VtexProduct {
  productName: string;
  categories: string[];
  items: { sellers: { commertialOffer: VtexOffer }[] }[];
}

function inferCategory(name: string, vtexCategories: string[]): Category {
  const haystack = (name + " " + vtexCategories.join(" ")).toLowerCase();
  if (/gaseosa|agua|jugo|cerveza|vino|bebida|coca|sprite|fanta|gatorade/.test(haystack))
    return "bebidas";
  if (/detergente|lavandina|jab[oó]n|suavizante|limpia|esponja|cloro/.test(haystack))
    return "limpieza";
  if (/auricular|celular|tablet|notebook|\btv\b|televisor|mouse|teclado|usb|hdmi|cable|cargador|router|parlante|bluetooth/.test(haystack))
    return "electronica";
  if (/arroz|leche|aceite|harina|az[uú]car|fideos|at[uú]n|yerba|caf[eé]|pan|galleta|queso|yogur|manteca|crema|alimento|verdura|fruta/.test(haystack))
    return "alimentos";
  return "otros";
}

function vtexToProduct(storeId: string, raw: VtexProduct, index: number): Product | null {
  const offer = raw.items?.[0]?.sellers?.[0]?.commertialOffer;
  if (!offer || offer.Price <= 0) return null;

  const price = offer.Price;
  const listPrice = offer.PriceWithoutDiscount > price ? offer.PriceWithoutDiscount : price;
  const discountPct = listPrice > price ? Math.round(((listPrice - price) / listPrice) * 100) : 0;
  const promo = offer.Teasers?.find((t) => t.Name)?.Name;

  return {
    id: `live_${storeId}_${index}`,
    storeId,
    name: raw.productName,
    category: inferCategory(raw.productName, raw.categories),
    price,
    listPrice,
    stock: Math.min(offer.AvailableQuantity, 100),
    discountPct,
    tags: raw.productName.toLowerCase().split(/\s+/).filter((t) => t.length > 2),
    promo,
  };
}

async function fetchVtex(storeId: string, query: string): Promise<Product[]> {
  const { host } = VTEX_STORES[storeId]!;
  const url = `https://${host}/api/catalog_system/pub/products/search/?ft=${encodeURIComponent(query)}&_from=0&_to=7`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return [];

    const data: VtexProduct[] = await res.json();
    if (!Array.isArray(data)) return [];

    const queryTerms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);
    return data
      .map((p, i) => vtexToProduct(storeId, p, i))
      .filter((p): p is Product => p !== null)
      .filter((p) => {
        const haystack = p.name.toLowerCase();
        return queryTerms.some((term) => haystack.includes(term));
      });
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Searches products via VTEX APIs (Jumbo, Carrefour) with mock fallback
 * for stores without a public API. Results are cached 5 minutes per query.
 */
export async function searchProducts(query: string, category?: string): Promise<Product[]> {
  const cacheKey = `${query}:${category ?? ""}`;
  const hit = cache.get(cacheKey);
  if (hit && Date.now() < hit.expiresAt) return hit.results;

  const settled = await Promise.allSettled(
    Object.keys(VTEX_STORES).map((id) => fetchVtex(id, query)),
  );

  const live = settled
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((p) => !category || p.category === category);

  // Supplement with mock results for stores not covered by VTEX (coto, club_beneficios)
  const mockSupplements = searchMock(query, category).filter((p) => !VTEX_STORES[p.storeId]);
  
  // Real-time Web Search using Firecrawl for Google Shopping
  const firecrawlResults = await searchGoogleShoppingWithFirecrawl(query);

  let results = [
    ...live,
    ...firecrawlResults,
    ...(live.length === 0 && firecrawlResults.length === 0 ? searchMock(query, category) : mockSupplements)
  ];

  // Smart Relevancy Filter: Exclude accessories if the user didn't explicitly search for them
  const negativeKeywords = [
    'cepillo', 'adhesivo', 'funda', 'protector', 'estuche', 'soporte', 
    'repuesto', 'accesorio', 'limpiador', 'cable', 'cargador', 'correa', 
    'bateria', 'batería', 'vidrio templado', 'mica', 'carcasa', 'liquido', 
    'líquido', 'cordon', 'cordones', 'plantilla', 'pomada', 'pasta', 'bolsa',
    'esponja', 'cera', 'renovador', 'crema', 'impermeabilizante', 'kit', 'desodorante', 'cordón'
  ];
  
  const queryLower = query.toLowerCase();
  
  results = results.filter(p => {
    const nameLower = p.name.toLowerCase();
    
    // Check if the product name contains a negative keyword
    for (const nk of negativeKeywords) {
      if (nameLower.includes(nk)) {
        // If the query ITSELF doesn't contain that negative keyword, exclude it!
        // E.g. query "zapatillas" -> exclude "cepillo lava zapatillas"
        // E.g. query "funda iphone" -> ALLOW "funda para iphone"
        if (!queryLower.includes(nk)) {
          return false;
        }
      }
    }
    
    return true;
  });

  // Register live products so simulate_purchase can look them up by id
  for (const p of live) liveProductRegistry.set(p.id, p);

  cache.set(cacheKey, { results, expiresAt: Date.now() + CACHE_TTL_MS });
  return results;
}
