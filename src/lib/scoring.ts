import type { Product, ScoredProduct, Store } from "./types.js";
import { findStore } from "../mocks/stores.js";

/**
 * Scoring 0-100. Más alto = mejor opción para el usuario.
 *
 * Pesos:
 *   Precio        40 pts (relativo al más barato del lote)
 *   Descuento     20 pts (lineal sobre discountPct)
 *   Reputación    15 pts (proporcional a store.reputation)
 *   Stock         10 pts (>10 = full; 1-10 escalado; 0 = 0)
 *   Envío         10 pts (gratis si supera threshold; 0 puntos si tarda > 5 días)
 *   Medios pago    5 pts (≥4 métodos = full)
 */
export function scoreProducts(products: Product[]): ScoredProduct[] {
  if (products.length === 0) return [];

  const minPrice = Math.min(...products.map((p) => p.price));

  return products
    .map((p) => {
      const store = findStore(p.storeId);
      if (!store) return null;
      const { score, reasons } = computeScore(p, store, minPrice);
      return {
        ...p,
        storeName: store.name,
        score,
        reasons,
      } satisfies ScoredProduct;
    })
    .filter((x): x is ScoredProduct => x !== null)
    .sort((a, b) => b.score - a.score);
}

function computeScore(
  p: Product,
  store: Store,
  minPrice: number,
): { score: number; reasons: string[] } {
  const reasons: string[] = [];

  // Precio: 40 pts si es el más barato; cae linealmente.
  const priceRatio = minPrice / p.price;
  const pricePts = Math.round(priceRatio * 40);
  if (p.price === minPrice) reasons.push("Es el precio más bajo del lote");
  else reasons.push(`+${Math.round(((p.price - minPrice) / minPrice) * 100)}% vs el más barato`);

  // Descuento
  const discountPts = Math.min(20, Math.round((p.discountPct / 30) * 20));
  if (p.discountPct >= 15) reasons.push(`Descuento fuerte (${p.discountPct}%)`);
  else if (p.discountPct > 0) reasons.push(`Descuento ${p.discountPct}%`);

  // Reputación
  const repPts = Math.round((store.reputation / 100) * 15);

  // Stock
  let stockPts = 0;
  if (p.stock === 0) stockPts = 0;
  else if (p.stock >= 10) stockPts = 10;
  else stockPts = Math.round((p.stock / 10) * 10);
  if (p.stock < 5 && p.stock > 0) reasons.push(`Poco stock (${p.stock} unidades)`);

  // Envío: gratis si el precio supera threshold y entrega en ≤ 4 días
  let shipPts = 0;
  const freeShipping =
    store.freeShippingThreshold > 0 && p.price >= store.freeShippingThreshold;
  if (freeShipping && store.avgShippingDays <= 4) shipPts = 10;
  else if (store.avgShippingDays <= 2) shipPts = 7;
  else if (store.avgShippingDays <= 4) shipPts = 4;
  if (freeShipping) reasons.push("Envío gratis");

  // Medios de pago
  const payPts = Math.min(5, Math.round((store.paymentMethods.length / 4) * 5));

  if (p.promo) reasons.push(`Promo: ${p.promo}`);

  const score = pricePts + discountPts + repPts + stockPts + shipPts + payPts;
  return { score: Math.min(100, score), reasons };
}
