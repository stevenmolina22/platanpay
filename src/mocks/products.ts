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

  // Yerba mate
  { id: "p060", storeId: "carrefour", name: "Yerba Mate Rosamonte 1kg", category: "alimentos", price: 4200, listPrice: 4800, stock: 30, discountPct: 12, tags: ["yerba", "mate", "rosamonte"] },
  { id: "p061", storeId: "coto", name: "Yerba Mate Rosamonte 1kg", category: "alimentos", price: 4450, listPrice: 4450, stock: 25, discountPct: 0, tags: ["yerba", "mate", "rosamonte"] },
  { id: "p062", storeId: "jumbo", name: "Yerba Mate Rosamonte 1kg", category: "alimentos", price: 3990, listPrice: 4800, stock: 18, discountPct: 17, tags: ["yerba", "mate", "rosamonte"], promo: "2da unidad 30% off" },
  { id: "p063", storeId: "club_beneficios", name: "Yerba Mate Rosamonte 1kg", category: "alimentos", price: 3850, listPrice: 4800, stock: 12, discountPct: 20, tags: ["yerba", "mate", "rosamonte"], promo: "Cupón socios" },

  // Fideos
  { id: "p070", storeId: "carrefour", name: "Fideos Matarazzo Spaghetti 500g", category: "alimentos", price: 890, listPrice: 980, stock: 60, discountPct: 9, tags: ["fideos", "pasta", "matarazzo"] },
  { id: "p071", storeId: "coto", name: "Fideos Matarazzo Spaghetti 500g", category: "alimentos", price: 850, listPrice: 850, stock: 50, discountPct: 0, tags: ["fideos", "pasta", "matarazzo"] },
  { id: "p072", storeId: "jumbo", name: "Fideos Matarazzo Spaghetti 500g", category: "alimentos", price: 920, listPrice: 920, stock: 35, discountPct: 0, tags: ["fideos", "pasta", "matarazzo"] },

  // Atún
  { id: "p080", storeId: "carrefour", name: "Atún Gomes da Costa al Natural 170g", category: "alimentos", price: 1650, listPrice: 1850, stock: 35, discountPct: 11, tags: ["atun", "lata", "gomes"] },
  { id: "p081", storeId: "coto", name: "Atún Gomes da Costa al Natural 170g", category: "alimentos", price: 1750, listPrice: 1750, stock: 20, discountPct: 0, tags: ["atun", "lata", "gomes"] },
  { id: "p082", storeId: "mercadolibre", name: "Atún Gomes da Costa al Natural 170g x6", category: "alimentos", price: 8990, listPrice: 11100, stock: 80, discountPct: 19, tags: ["atun", "lata", "pack"], promo: "Envío gratis" },

  // Galletitas
  { id: "p085", storeId: "carrefour", name: "Galletitas Oreo 117g", category: "alimentos", price: 1490, listPrice: 1690, stock: 60, discountPct: 12, tags: ["galletitas", "oreo"] },
  { id: "p086", storeId: "jumbo", name: "Galletitas Oreo 117g", category: "alimentos", price: 1550, listPrice: 1550, stock: 40, discountPct: 0, tags: ["galletitas", "oreo"] },
  { id: "p087", storeId: "coto", name: "Galletitas Oreo 117g", category: "alimentos", price: 1390, listPrice: 1690, stock: 22, discountPct: 18, tags: ["galletitas", "oreo"], promo: "3x2" },

  // Yogur
  { id: "p090", storeId: "carrefour", name: "Yogur La Serenísima Bebible 1kg", category: "alimentos", price: 2250, listPrice: 2250, stock: 80, discountPct: 0, tags: ["yogur", "serenisima"] },
  { id: "p091", storeId: "coto", name: "Yogur La Serenísima Bebible 1kg", category: "alimentos", price: 2150, listPrice: 2350, stock: 50, discountPct: 9, tags: ["yogur", "serenisima"] },
  { id: "p092", storeId: "jumbo", name: "Yogur La Serenísima Bebible 1kg", category: "alimentos", price: 2290, listPrice: 2290, stock: 30, discountPct: 0, tags: ["yogur", "serenisima"] },

  // Limpieza extra
  { id: "p100", storeId: "carrefour", name: "Lavandina Ayudín 1L", category: "limpieza", price: 1290, listPrice: 1390, stock: 70, discountPct: 7, tags: ["lavandina", "ayudin"] },
  { id: "p101", storeId: "coto", name: "Lavandina Ayudín 1L", category: "limpieza", price: 1250, listPrice: 1250, stock: 60, discountPct: 0, tags: ["lavandina", "ayudin"] },
  { id: "p102", storeId: "jumbo", name: "Lavandina Ayudín 1L", category: "limpieza", price: 1350, listPrice: 1350, stock: 45, discountPct: 0, tags: ["lavandina", "ayudin"] },

  { id: "p105", storeId: "carrefour", name: "Papel Higiénico Higienol Plus x4", category: "limpieza", price: 4290, listPrice: 4290, stock: 50, discountPct: 0, tags: ["papel", "higienico", "higienol"] },
  { id: "p106", storeId: "coto", name: "Papel Higiénico Higienol Plus x4", category: "limpieza", price: 3990, listPrice: 4490, stock: 30, discountPct: 11, tags: ["papel", "higienico", "higienol"], promo: "Hot Sale" },
  { id: "p107", storeId: "jumbo", name: "Papel Higiénico Higienol Plus x4", category: "limpieza", price: 4150, listPrice: 4150, stock: 28, discountPct: 0, tags: ["papel", "higienico", "higienol"] },
  { id: "p108", storeId: "club_beneficios", name: "Papel Higiénico Higienol Plus x4", category: "limpieza", price: 3790, listPrice: 4490, stock: 12, discountPct: 16, tags: ["papel", "higienico", "higienol"], promo: "Cupón socios premium" },

  { id: "p110", storeId: "carrefour", name: "Suavizante Vivere 900ml", category: "limpieza", price: 2890, listPrice: 3150, stock: 25, discountPct: 8, tags: ["suavizante", "vivere"] },
  { id: "p111", storeId: "jumbo", name: "Suavizante Vivere 900ml", category: "limpieza", price: 2950, listPrice: 2950, stock: 20, discountPct: 0, tags: ["suavizante", "vivere"] },
  { id: "p112", storeId: "mercadolibre", name: "Suavizante Vivere 900ml x6", category: "limpieza", price: 16190, listPrice: 19200, stock: 100, discountPct: 16, tags: ["suavizante", "vivere", "pack"], promo: "Envío gratis" },

  // Electrónica extra
  { id: "p120", storeId: "mercadolibre", name: "Cargador Samsung 25W USB-C", category: "electronica", price: 14990, listPrice: 19990, stock: 50, discountPct: 25, tags: ["cargador", "samsung", "usb-c"], promo: "12 cuotas sin interés" },
  { id: "p121", storeId: "carrefour", name: "Cargador Samsung 25W USB-C", category: "electronica", price: 17500, listPrice: 17500, stock: 8, discountPct: 0, tags: ["cargador", "samsung", "usb-c"] },

  { id: "p125", storeId: "mercadolibre", name: "Cable HDMI Noganet 1.5m", category: "electronica", price: 4990, listPrice: 7500, stock: 200, discountPct: 33, tags: ["cable", "hdmi", "noganet"], promo: "Envío gratis" },
  { id: "p126", storeId: "carrefour", name: "Cable HDMI Noganet 1.5m", category: "electronica", price: 6200, listPrice: 6200, stock: 12, discountPct: 0, tags: ["cable", "hdmi", "noganet"] },

  { id: "p130", storeId: "mercadolibre", name: "Mouse Logitech M170", category: "electronica", price: 9490, listPrice: 11990, stock: 80, discountPct: 20, tags: ["mouse", "logitech"], promo: "12 cuotas sin interés" },
  { id: "p131", storeId: "club_beneficios", name: "Mouse Logitech M170", category: "electronica", price: 8500, listPrice: 11990, stock: 5, discountPct: 29, tags: ["mouse", "logitech"], promo: "Cupón socios" },

  // Bebidas extra
  { id: "p140", storeId: "carrefour", name: "Agua Mineral Villavicencio 2.25L", category: "bebidas", price: 1490, listPrice: 1490, stock: 80, discountPct: 0, tags: ["agua", "villavicencio"] },
  { id: "p141", storeId: "coto", name: "Agua Mineral Villavicencio 2.25L", category: "bebidas", price: 1390, listPrice: 1550, stock: 60, discountPct: 10, tags: ["agua", "villavicencio"] },
  { id: "p142", storeId: "jumbo", name: "Agua Mineral Villavicencio 2.25L", category: "bebidas", price: 1520, listPrice: 1520, stock: 100, discountPct: 0, tags: ["agua", "villavicencio"] },

  { id: "p150", storeId: "carrefour", name: "Cerveza Quilmes Cristal 1L", category: "bebidas", price: 2750, listPrice: 2990, stock: 40, discountPct: 8, tags: ["cerveza", "quilmes"] },
  { id: "p151", storeId: "coto", name: "Cerveza Quilmes Cristal 1L", category: "bebidas", price: 2890, listPrice: 2890, stock: 30, discountPct: 0, tags: ["cerveza", "quilmes"] },
  { id: "p152", storeId: "jumbo", name: "Cerveza Quilmes Cristal 1L", category: "bebidas", price: 2690, listPrice: 2990, stock: 25, discountPct: 10, tags: ["cerveza", "quilmes"] },

  { id: "p160", storeId: "carrefour", name: "Vino Norton Roble Malbec 750ml", category: "bebidas", price: 7990, listPrice: 9500, stock: 18, discountPct: 16, tags: ["vino", "norton", "malbec"] },
  { id: "p161", storeId: "jumbo", name: "Vino Norton Roble Malbec 750ml", category: "bebidas", price: 7500, listPrice: 9500, stock: 15, discountPct: 21, tags: ["vino", "norton", "malbec"], promo: "20% off vinos los miércoles" },
  { id: "p162", storeId: "mercadolibre", name: "Vino Norton Roble Malbec 750ml", category: "bebidas", price: 8290, listPrice: 9500, stock: 50, discountPct: 13, tags: ["vino", "norton", "malbec"], promo: "Envío gratis" },
  { id: "p163", storeId: "club_beneficios", name: "Vino Norton Roble Malbec 750ml", category: "bebidas", price: 6990, listPrice: 9500, stock: 6, discountPct: 26, tags: ["vino", "norton", "malbec"], promo: "Cupón socios premium - vinos seleccionados" },
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
