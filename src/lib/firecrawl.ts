import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";
import type { Product, Category } from "./types";

let _app: FirecrawlApp | null = null;
function getApp() {
  if (!_app && process.env.FIRECRAWL_API_KEY) {
    _app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
  }
  return _app;
}

const ExtractedProductSchema = z.object({
  products: z.array(z.object({
    name: z.string().describe("El título o nombre del producto"),
    price: z.number().describe("El precio actual de venta en ARS (número entero)"),
    listPrice: z.number().optional().describe("El precio original sin descuento si figura tachado, en ARS"),
    storeName: z.string().describe("Nombre del comercio o tienda que lo vende (ej: Mercado Libre, Frávega, etc)"),
    imageUrl: z.string().optional().describe("URL completa de la imagen principal del producto (empezando con https://). Solo incluir si la URL es válida y apunta a una imagen real del producto."),
  })).describe("Lista de productos encontrados en la página de shopping")
});

type ExtractedProductData = z.infer<typeof ExtractedProductSchema>;

function inferCategory(name: string): Category {
  const haystack = name.toLowerCase();
  if (/gaseosa|agua|jugo|cerveza|vino|bebida|coca|sprite|fanta|gatorade/.test(haystack)) return "bebidas";
  if (/detergente|lavandina|jab[oó]n|suavizante|limpia|esponja|cloro/.test(haystack)) return "limpieza";
  if (/auricular|celular|tablet|notebook|\btv\b|televisor|mouse|teclado|usb|hdmi|cable|cargador|router|parlante|bluetooth/.test(haystack)) return "electronica";
  if (/arroz|leche|aceite|harina|az[uú]car|fideos|at[uú]n|yerba|caf[eé]|pan|galleta|queso|yogur|manteca|crema|alimento|verdura|fruta/.test(haystack)) return "alimentos";
  return "otros";
}

export async function searchGoogleShoppingWithFirecrawl(query: string): Promise<Product[]> {
  const app = getApp();
  if (!app) return [];

  // Fuentes de búsqueda en paralelo: Google Shopping + MercadoLibre + Fravega
  const urlGoogle = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query + ' Argentina')}`;
  const urlMeli = `https://listado.mercadolibre.com.ar/${encodeURIComponent(query.replace(/\s+/g, '-'))}?category=MLA`;
  const urlFravega = `https://www.fravega.com/l/?keyword=${encodeURIComponent(query)}`;
  const urlAdidas = `https://www.adidas.com.ar/search?q=${encodeURIComponent(query)}`;

  // Elegir fuentes según si parece electrodoméstico o ropa
  const isApplianceQuery = /termotanque|heladera|lavarropas|aire\s?acondicionado|split|estufa|calefactor|microondas|tv|televisor/.test(query.toLowerCase());
  const isFashionQuery = /zapatilla|campera|remera|jean|ropa|calzado|adidas|nike/.test(query.toLowerCase());
  const urls = isApplianceQuery
    ? [urlGoogle, urlFravega, urlMeli]
    : isFashionQuery
    ? [urlGoogle, urlMeli, urlAdidas]
    : [urlGoogle, urlMeli, urlFravega];

  try {
    const extractResult = await app.extract({
      urls,
      prompt: `Extraer productos en Argentina EXACTAMENTE como aparecen en la página para la búsqueda: "${query}". Devolver nombre, precio actual en pesos argentinos (ARS), precio original si tiene descuento, y tienda. CRÍTICO: NO inventar, adivinar ni estimar precios. Solo extraer productos cuyos precios figuran claramente en el HTML de la página web visitada. Si no encuentras el precio real, omite el producto. Incluir al menos 5 productos de distintas tiendas si están disponibles.`,
      schema: ExtractedProductSchema
    });

    console.log("Raw Firecrawl API:", JSON.stringify(extractResult, null, 2));
    const data = extractResult.data as ExtractedProductData | undefined;
    if (!extractResult.success || !data?.products) {
      console.error(`Firecrawl no pudo extraer resultados para ${query}:`, extractResult.error);
      return [];
    }

    return data.products.map((p, i) => {
      const price = Math.round(p.price);
      const listPrice = p.listPrice ? Math.max(Math.round(p.listPrice), price) : price;
      const discountPct = listPrice > price ? Math.round(((listPrice - price) / listPrice) * 100) : 0;
      const storeId = p.storeName.toLowerCase().replace(/[^a-z0-9]/g, "_") || "google_shopping";

      return {
        id: `fc_${storeId}_${i}_${Date.now()}`,
        storeId,
        name: p.name,
        category: inferCategory(p.name),
        price,
        listPrice,
        stock: 10,
        discountPct,
        tags: p.name.toLowerCase().split(/\s+/).filter((t: string) => t.length > 2),
        imageUrl: p.imageUrl && p.imageUrl.startsWith('https://') ? p.imageUrl : undefined,
      };
    });
  } catch (error) {
    console.error(`Error de red con Firecrawl para ${query}:`, error);
    return [];
  }
}
