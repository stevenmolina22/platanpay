import type { Product } from "../lib/types.js";

export const PRODUCTS: Product[] = [
  // Alimentos básicos
  { id: "p001", storeId: "carrefour", name: "Arroz Gallo Oro 1kg", category: "alimentos", price: 1850, listPrice: 2100, stock: 42, discountPct: 12, tags: ["arroz", "gallo"] },
  { id: "p002", storeId: "coto", name: "Arroz Gallo Oro 1kg", category: "alimentos", price: 1990, listPrice: 1990, stock: 30, discountPct: 0, tags: ["arroz", "gallo"] },
  { id: "p003", storeId: "jumbo", name: "Arroz Gallo Oro 1kg", category: "alimentos", price: 1780, listPrice: 2050, stock: 18, discountPct: 13, tags: ["arroz", "gallo"], promo: "3x2 los miércoles" },
  { id: "p004", storeId: "mercadolibre", name: "Arroz Gallo Oro 1kg x6", category: "alimentos", price: 10_500, listPrice: 11_900, stock: 120, discountPct: 12, tags: ["arroz", "gallo", "pack"], promo: "Envío gratis" },
  { id: "p005", storeId: "club_beneficios", name: "Arroz Gallo Oro 1kg", category: "alimentos", price: 1690, listPrice: 2100, stock: 8, discountPct: 19, tags: ["arroz", "gallo"], promo: "Cupón socios" },

  // Aceite
  { id: "p010", storeId: "carrefour", name: "Aceite Natura 1.5L", category: "alimentos", price: 4200, listPrice: 4500, stock: 25, discountPct: 7, tags: ["aceite", "natura"] },
  { id: "p011", storeId: "coto", name: "Aceite Natura 1.5L", category: "alimentos", price: 4350, listPrice: 4350, stock: 40, discountPct: 0, tags: ["aceite", "natura"] },
  { id: "p012", storeId: "jumbo", name: "Aceite Natura 1.5L", category: "alimentos", price: 4100, listPrice: 4500, stock: 12, discountPct: 9, tags: ["aceite", "natura"] },

  // Limpieza
  { id: "p020", storeId: "carrefour", name: "Detergente Magistral 750ml", category: "limpieza", price: 2890, listPrice: 3200, stock: 60, discountPct: 10, tags: ["detergente", "magistral"] },
  { id: "p021", storeId: "coto", name: "Detergente Magistral 750ml", category: "limpieza", price: 2750, listPrice: 2990, stock: 22, discountPct: 8, tags: ["detergente", "magistral"], promo: "2da unidad 50% off" },
  { id: "p022", storeId: "jumbo", name: "Detergente Magistral 750ml", category: "limpieza", price: 2950, listPrice: 2950, stock: 35, discountPct: 0, tags: ["detergente", "magistral"] },

  // Electrónica
  { id: "p030", storeId: "mercadolibre", name: "Auriculares JBL Tune 510BT", category: "electronica", price: 89_990, listPrice: 119_990, stock: 14, discountPct: 25, tags: ["auriculares", "jbl", "bluetooth"], promo: "12 cuotas sin interés" },
  { id: "p031", storeId: "carrefour", name: "Auriculares JBL Tune 510BT", category: "electronica", price: 99_900, listPrice: 119_990, stock: 5, discountPct: 17, tags: ["auriculares", "jbl", "bluetooth"] },
  { id: "p032", storeId: "club_beneficios", name: "Auriculares JBL Tune 510BT", category: "electronica", price: 84_500, listPrice: 119_990, stock: 3, discountPct: 30, tags: ["auriculares", "jbl"], promo: "Cupón socio premium" },

  // Bebidas
  { id: "p040", storeId: "carrefour", name: "Coca Cola 2.25L", category: "bebidas", price: 3200, listPrice: 3500, stock: 80, discountPct: 9, tags: ["gaseosa", "coca"] },
  { id: "p041", storeId: "coto", name: "Coca Cola 2.25L", category: "bebidas", price: 3050, listPrice: 3300, stock: 50, discountPct: 8, tags: ["gaseosa", "coca"] },
  { id: "p042", storeId: "jumbo", name: "Coca Cola 2.25L", category: "bebidas", price: 3290, listPrice: 3290, stock: 70, discountPct: 0, tags: ["gaseosa", "coca"] },

  // Lácteos
  { id: "p050", storeId: "carrefour", name: "Leche La Serenísima 1L", category: "alimentos", price: 1650, listPrice: 1750, stock: 100, discountPct: 6, tags: ["leche", "serenisima"] },
  { id: "p051", storeId: "coto", name: "Leche La Serenísima 1L", category: "alimentos", price: 1590, listPrice: 1590, stock: 88, discountPct: 0, tags: ["leche", "serenisima"] },
  { id: "p052", storeId: "jumbo", name: "Leche La Serenísima 1L", category: "alimentos", price: 1620, listPrice: 1700, stock: 65, discountPct: 5, tags: ["leche", "serenisima"] },
];

export function searchProducts(query: string, category?: string): Product[] {
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter((p) => {
    if (category && p.category !== category) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
    );
  });
}
