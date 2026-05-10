import { FirecrawlAppV1 } from "@mendable/firecrawl-js";
import { z } from "zod";
import type { Product, Category } from "./types.js";
import { searchProducts as searchMock } from "../mocks/products.js";

const CACHE_TTL_MS = 5 * 60 * 1000;
const SCRAPE_TIMEOUT_MS = 20_000;

const cache = new Map<string, { results: Product[]; expiresAt: number }>();

let _client: FirecrawlAppV1 | null = null;
function getClient(): FirecrawlAppV1 | null {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) return null;
  if (!_client) _client = new FirecrawlAppV1({ apiKey });
  return _client;
}

const STORE_SEARCH: Record<string, (q: string) => string> = {
  carrefour: (q) => `https://www.carrefour.com.ar/busca/?q=${encodeURIComponent(q)}`,
  coto: (q) => `https://www.cotodigital3.com.ar/sitios/cdigi/browse?Ntt=${encodeURIComponent(q)}&_dyncharset=utf-8`,
  jumbo: (q) => `https://www.jumbo.com.ar/busca/?q=${encodeURIComponent(q)}`,
  mercadolibre: (q) => `https://listado.mercadolibre.com.ar/${encodeURIComponent(q.replace(/ /g, "-"))}`,
};

const RawItemSchema = z.object({
  name: z.string(),
  price: z.number().positive(),
  listPrice: z.number().positive().optional(),
  discountPct: z.number().min(0).max(100).optional(),
  stock: z.number().int().min(0).optional(),
  promo: z.string().optional(),
});

const RawResultSchema = z.object({
  items: z.array(RawItemSchema).max(5),
});

type RawItem = z.infer<typeof RawItemSchema>;

function inferCategory(name: string): Category {
  const n = name.toLowerCase();
  if (/arroz|leche|aceite|harina|az[uú]car|fideos|at[uú]n|yerba|caf[eé]|pan|galleta|queso|yogur|manteca|crema/.test(n))
    return "alimentos";
  if (/gaseosa|agua|jugo|cerveza|vino|bebida|coca|sprite|fanta|gatorade/.test(n))
    return "bebidas";
  if (/detergente|lavandina|jab[oó]n|suavizante|limpia|esponja|cloro/.test(n))
    return "limpieza";
  if (/auricular|celular|tablet|notebook|\btv\b|televisor|mouse|teclado|usb|hdmi|cable|cargador|router|parlante|bluetooth/.test(n))
    return "electronica";
  return "otros";
}

function toProduct(storeId: string, raw: RawItem, index: number): Product {
  const listPrice = raw.listPrice ?? raw.price;
  const discountPct =
    raw.discountPct ??
    (listPrice > raw.price ? Math.round(((listPrice - raw.price) / listPrice) * 100) : 0);
  return {
    id: `live_${storeId}_${index}`,
    storeId,
    name: raw.name,
    category: inferCategory(raw.name),
    price: raw.price,
    listPrice,
    stock: raw.stock ?? 10,
    discountPct,
    tags: raw.name
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 2),
    promo: raw.promo,
  };
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout ${ms}ms`)), ms),
    ),
  ]);
}

const EXTRACTION_PROMPT =
  "Extract up to 5 product listings matching the search query from this Argentine supermarket/marketplace search results page. " +
  "For each: name as shown on the page, current price in ARS as a number (no $ sign), original/list price if different from current, " +
  "discount percentage if displayed, stock count if shown, and any active promo text (e.g. '3x2', '12 cuotas sin interés', 'Envío gratis'). " +
  "Only include products actually visible in the results, not ads or banners.";

async function scrapeStore(
  storeId: string,
  query: string,
  client: FirecrawlAppV1,
): Promise<Product[]> {
  const urlFn = STORE_SEARCH[storeId];
  if (!urlFn) return [];

  const doc = await withTimeout(
    client.scrapeUrl(urlFn(query), {
      formats: ["extract"],
      extract: { schema: RawResultSchema, prompt: EXTRACTION_PROMPT },
    }),
    SCRAPE_TIMEOUT_MS,
  );

  if (!doc.success || !doc.extract) return [];

  const parsed = RawResultSchema.safeParse(doc.extract);
  if (!parsed.success) return [];

  return parsed.data.items
    .filter((item) => item.price > 0 && item.name.trim().length > 0)
    .map((item, i) => toProduct(storeId, item, i));
}

/**
 * Searches products via Firecrawl live scraping.
 * Falls back to mock data when FIRECRAWL_API_KEY is absent or all stores fail.
 */
export async function searchProducts(query: string, category?: string): Promise<Product[]> {
  const client = getClient();
  if (!client) return searchMock(query, category);

  const cacheKey = `${query}:${category ?? ""}`;
  const hit = cache.get(cacheKey);
  if (hit && Date.now() < hit.expiresAt) return hit.results;

  const settled = await Promise.allSettled(
    Object.keys(STORE_SEARCH).map((id) => scrapeStore(id, query, client)),
  );

  let results = settled
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((p) => !category || p.category === category);

  if (results.length === 0) results = searchMock(query, category);

  cache.set(cacheKey, { results, expiresAt: Date.now() + CACHE_TTL_MS });
  return results;
}
