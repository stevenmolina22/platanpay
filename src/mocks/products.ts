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

  // Zapatillas (Ropa & Indumentaria)
  { id: "p_adi_1", storeId: "mercadolibre", name: "Zapatillas Adidas Duramo SL Hombre", category: "otros", price: 74999, listPrice: 89999, stock: 25, discountPct: 16, tags: ["zapatillas", "adidas", "calzado", "running", "deportivas"], promo: "Envío Gratis Full" },
  { id: "p_adi_2", storeId: "jumbo", name: "Zapatillas Adidas Advantage Base Mujer", category: "otros", price: 69999, listPrice: 69999, stock: 15, discountPct: 0, tags: ["zapatillas", "adidas", "calzado", "urbanas", "blancas"] },
  { id: "p_adi_3", storeId: "mercadolibre", name: "Zapatillas Adidas Runfalcon 3.0", category: "otros", price: 82500, listPrice: 95000, stock: 40, discountPct: 13, tags: ["zapatillas", "adidas", "calzado", "running"] },

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

  // Café
  { id: "p164", storeId: "coto", name: "Café Torrado La Virginia 500g", category: "alimentos", price: 4990, listPrice: 8200, stock: 40, discountPct: 39, tags: ["cafe", "café", "virginia"] },
  { id: "p165", storeId: "mercadolibre", name: "Cápsulas Nespresso x50", category: "alimentos", price: 32000, listPrice: 45000, stock: 15, discountPct: 28, tags: ["cafe", "café", "nespresso", "capsulas"], promo: "Envío Full" },
  { id: "p166", storeId: "carrefour", name: "Café Soluble Nescafé 100g", category: "alimentos", price: 3900, listPrice: 5100, stock: 50, discountPct: 23, tags: ["cafe", "café", "nescafe", "soluble"] },

  // Verdulería
  { id: "p170", storeId: "verduleria_don_jose", name: "Palta Hass x 1KG", category: "frescos", price: 8500, listPrice: 12000, stock: 15, discountPct: 29, tags: ["palta", "paltas", "aguacate", "verdura"] },
  { id: "p171", storeId: "jumbo", name: "Tomate Perita x 1KG", category: "frescos", price: 2100, listPrice: 3500, stock: 50, discountPct: 40, tags: ["tomate", "tomates", "verdura"] },

  // Carnicería
  { id: "p180", storeId: "carniceria_los_amigos", name: "Asado de Novillo x 1KG", category: "carnes", price: 6800, listPrice: 9500, stock: 20, discountPct: 28, tags: ["carne", "asado", "novillo", "parrilla"] },
  { id: "p181", storeId: "coto", name: "Pechuga de Pollo x 1KG", category: "carnes", price: 5500, listPrice: 7200, stock: 40, discountPct: 23, tags: ["pollo", "pechuga", "carne"] },

  // Lácteos Extra
  { id: "p190", storeId: "jumbo", name: "Queso Cremoso La Paulina 1KG", category: "lacteos", price: 7800, listPrice: 10500, stock: 25, discountPct: 25, tags: ["queso", "cremoso", "paulina", "lacteo"] },

  // Mascotas
  { id: "p200", storeId: "mercadolibre", name: "Alimento Perro Pedigree 21KG", category: "mascotas", price: 34500, listPrice: 45000, stock: 8, discountPct: 23, tags: ["perro", "alimento", "mascota", "pedigree"], promo: "Envío gratis" },

  // Bebés
  { id: "p210", storeId: "farmacity", name: "Pañales Pampers Premium G x72", category: "bebes", price: 24500, listPrice: 38000, stock: 12, discountPct: 35, tags: ["pañales", "bebe", "pampers"], promo: "Super promo 2x1" },

  // Electrónica TV/Celular
  { id: "p220", storeId: "fravega", name: "Smart TV LG 50 4K", category: "electronica", price: 580000, listPrice: 750000, stock: 4, discountPct: 22, tags: ["tv", "televisor", "smart", "lg", "pantalla"] },
  { id: "p221", storeId: "mercadolibre", name: "Samsung Galaxy A54 256GB", category: "electronica", price: 650000, listPrice: 890000, stock: 10, discountPct: 27, tags: ["celular", "smartphone", "samsung", "galaxy"], promo: "12 cuotas sin interés" },

  // Snacks & Golosinas
  { id: "p230", storeId: "jumbo", name: "Papas Fritas Lays Clásicas 145g", category: "alimentos", price: 2100, listPrice: 2800, stock: 45, discountPct: 25, tags: ["papas", "fritas", "lays", "snack"] },
  { id: "p231", storeId: "coto", name: "Alfajor Havanna Mixto x6", category: "alimentos", price: 9500, listPrice: 11000, stock: 20, discountPct: 14, tags: ["alfajor", "havanna", "dulce", "chocolate"] },
  { id: "p232", storeId: "carrefour", name: "Chocolate Milka Leche 100g", category: "alimentos", price: 1800, listPrice: 2200, stock: 30, discountPct: 18, tags: ["chocolate", "milka", "dulce"] },
  { id: "p233", storeId: "jumbo", name: "Gomitas Mogul Ositos 150g", category: "alimentos", price: 950, listPrice: 1200, stock: 60, discountPct: 21, tags: ["gomitas", "mogul", "dulce", "caramelo"] },

  // Congelados
  { id: "p240", storeId: "coto", name: "Hamburguesas Paty Clásicas x4", category: "congelados", price: 3500, listPrice: 4200, stock: 50, discountPct: 17, tags: ["hamburguesa", "paty", "carne", "congelado"] },
  { id: "p241", storeId: "jumbo", name: "Papas Congeladas McCain 1kg", category: "congelados", price: 4200, listPrice: 5500, stock: 25, discountPct: 24, tags: ["papas", "mccain", "congelado"] },
  { id: "p242", storeId: "carrefour", name: "Helado Freddo Dulce de Leche 1kg", category: "congelados", price: 11500, listPrice: 14000, stock: 15, discountPct: 18, tags: ["helado", "freddo", "dulce de leche", "postre"] },

  // Panadería & Desayuno
  { id: "p250", storeId: "carrefour", name: "Pan Lactal Bimbo Blanco 400g", category: "panaderia", price: 1850, listPrice: 2400, stock: 35, discountPct: 23, tags: ["pan", "lactal", "bimbo", "desayuno"] },
  { id: "p251", storeId: "coto", name: "Medialunas de Manteca x12", category: "panaderia", price: 4500, listPrice: 5500, stock: 18, discountPct: 18, tags: ["medialunas", "facturas", "manteca", "panaderia"] },
  { id: "p252", storeId: "jumbo", name: "Mermelada La Campagnola Frutilla 400g", category: "alimentos", price: 2100, listPrice: 2600, stock: 28, discountPct: 19, tags: ["mermelada", "campagnola", "frutilla", "desayuno"] },
  { id: "p253", storeId: "carrefour", name: "Galletas de Agua Express x3", category: "alimentos", price: 1450, listPrice: 1800, stock: 42, discountPct: 19, tags: ["galletas", "express", "agua"] },

  // Cuidado Personal / Perfumería
  { id: "p260", storeId: "farmacity", name: "Shampoo Pantene Restauración 400ml", category: "perfumeria", price: 4200, listPrice: 5800, stock: 50, discountPct: 28, tags: ["shampoo", "pantene", "pelo", "higiene"] },
  { id: "p261", storeId: "farmacity", name: "Desodorante Rexona Hombre Aerosol", category: "perfumeria", price: 2100, listPrice: 2900, stock: 65, discountPct: 28, tags: ["desodorante", "rexona", "higiene"] },
  { id: "p262", storeId: "jumbo", name: "Crema Nivea Corporal 400ml", category: "perfumeria", price: 5500, listPrice: 7200, stock: 22, discountPct: 24, tags: ["crema", "nivea", "corporal", "piel"] },
  { id: "p263", storeId: "carrefour", name: "Pasta Dental Colgate Total 12 90g", category: "perfumeria", price: 1850, listPrice: 2500, stock: 80, discountPct: 26, tags: ["pasta", "dental", "colgate", "dientes"] },
  { id: "p264", storeId: "farmacity", name: "Jabón de Tocador Dove x3", category: "perfumeria", price: 3200, listPrice: 4000, stock: 45, discountPct: 20, tags: ["jabon", "jabón", "dove", "tocador", "higiene"] },

  // Hogar & Electrodomésticos
  { id: "p270", storeId: "fravega", name: "Microondas BGH 20 Litros", category: "electro", price: 125000, listPrice: 160000, stock: 12, discountPct: 22, tags: ["microondas", "bgh", "electrodomestico", "cocina"] },
  { id: "p271", storeId: "mercadolibre", name: "Pava Eléctrica Philips 1.7L", category: "electro", price: 38000, listPrice: 52000, stock: 35, discountPct: 27, tags: ["pava", "electrica", "philips", "mate"] },
  { id: "p272", storeId: "coto", name: "Licuadora Liliana 500W", category: "electro", price: 42000, listPrice: 55000, stock: 15, discountPct: 24, tags: ["licuadora", "liliana", "electrodomestico"] },
  { id: "p273", storeId: "fravega", name: "Aspiradora Yelmo Sin Bolsa", category: "electro", price: 95000, listPrice: 130000, stock: 8, discountPct: 27, tags: ["aspiradora", "yelmo", "limpieza", "electrodomestico"] },

  // Mascotas (Gatos)
  { id: "p280", storeId: "mercadolibre", name: "Alimento Gato Whiskas Carne 3kg", category: "mascotas", price: 11500, listPrice: 14000, stock: 25, discountPct: 18, tags: ["gato", "mascota", "alimento", "whiskas"] },
  { id: "p281", storeId: "jumbo", name: "Piedras Sanitarias Absorbentes 4kg", category: "mascotas", price: 3200, listPrice: 4100, stock: 40, discountPct: 22, tags: ["piedras", "gato", "mascota", "sanitarias"] },

  // Frutas y Verduras Extra
  { id: "p290", storeId: "verduleria_don_jose", name: "Banana Ecuador x 1KG", category: "frescos", price: 1800, listPrice: 2500, stock: 30, discountPct: 28, tags: ["banana", "bananas", "fruta"] },
  { id: "p291", storeId: "coto", name: "Manzana Red Delicious x 1KG", category: "frescos", price: 2200, listPrice: 2900, stock: 20, discountPct: 24, tags: ["manzana", "manzanas", "fruta"] },
  { id: "p292", storeId: "jumbo", name: "Papa Negra Cepillada x 1KG", category: "frescos", price: 850, listPrice: 1200, stock: 100, discountPct: 29, tags: ["papa", "papas", "verdura"] },
  { id: "p293", storeId: "verduleria_don_jose", name: "Cebolla Comercial x 1KG", category: "frescos", price: 950, listPrice: 1400, stock: 60, discountPct: 32, tags: ["cebolla", "cebollas", "verdura"] },

  // Ropa / Deportes
  { id: "p300", storeId: "mercadolibre", name: "Zapatillas Nike Revolution 6", category: "indumentaria", price: 85000, listPrice: 120000, stock: 15, discountPct: 29, tags: ["zapatillas", "nike", "ropa", "calzado", "deporte"] },
  { id: "p301", storeId: "mercadolibre", name: "Remera Lisa Algodón Premium", category: "indumentaria", price: 12000, listPrice: 18000, stock: 45, discountPct: 33, tags: ["remera", "ropa", "algodon"] },
  { id: "p302", storeId: "coto", name: "Pantalón Jean Clásico Hombre", category: "indumentaria", price: 25000, listPrice: 35000, stock: 20, discountPct: 28, tags: ["pantalon", "jean", "ropa", "indumentaria"] },
  { id: "p303", storeId: "mercadolibre", name: "Campera Puffer Hombre Ripstop", category: "indumentaria", price: 55000, listPrice: 75000, stock: 18, discountPct: 27, tags: ["campera", "puffer", "abrigo", "invierno", "ropa"] },
  { id: "p304", storeId: "fravega", name: "Campera Impermeable Mujer Montaña", category: "indumentaria", price: 62000, listPrice: 90000, stock: 10, discountPct: 31, tags: ["campera", "impermeable", "mujer", "trekking"] },

  // Electrodomésticos grandes
  { id: "p310", storeId: "fravega", name: "Termotanque Eléctrico Rheem 80 Litros", category: "electro", price: 185000, listPrice: 240000, stock: 8, discountPct: 23, tags: ["termotanque", "electrico", "rheem", "agua", "calefaccion"] },
  { id: "p311", storeId: "mercadolibre", name: "Termotanque a Gas Longvie 80L", category: "electro", price: 210000, listPrice: 270000, stock: 5, discountPct: 22, tags: ["termotanque", "gas", "longvie", "agua", "calefaccion"] },
  { id: "p312", storeId: "fravega", name: "Termotanque Eléctrico Ariston 50L Slim", category: "electro", price: 155000, listPrice: 195000, stock: 12, discountPct: 21, tags: ["termotanque", "electrico", "ariston", "agua"] },
  { id: "p313", storeId: "mercadolibre", name: "Heladera con Freezer Drean 310L", category: "electro", price: 420000, listPrice: 580000, stock: 6, discountPct: 28, tags: ["heladera", "freezer", "drean", "electrodomestico"] },
  { id: "p314", storeId: "fravega", name: "Heladera No Frost Samsung 400L", category: "electro", price: 890000, listPrice: 1200000, stock: 4, discountPct: 26, tags: ["heladera", "no frost", "samsung", "inverter"] },
  { id: "p315", storeId: "fravega", name: "Lavarropas Automático BGH 7kg", category: "electro", price: 350000, listPrice: 480000, stock: 7, discountPct: 27, tags: ["lavarropas", "bgh", "automatico", "electrodomestico"] },
  { id: "p316", storeId: "mercadolibre", name: "Lavarropas Carga Frontal LG 8kg Inverter", category: "electro", price: 750000, listPrice: 980000, stock: 3, discountPct: 23, tags: ["lavarropas", "frontal", "lg", "inverter"] },
  { id: "p317", storeId: "fravega", name: "Smart TV Samsung 55\" 4K QLED", category: "electronica", price: 980000, listPrice: 1350000, stock: 5, discountPct: 27, tags: ["tv", "smart tv", "samsung", "4k", "qled", "televisor"] },
  { id: "p318", storeId: "fravega", name: "Smart TV LG 43\" Full HD WebOS", category: "electronica", price: 480000, listPrice: 650000, stock: 9, discountPct: 26, tags: ["tv", "smart tv", "lg", "full hd", "televisor"] },
  { id: "p319", storeId: "fravega", name: "Aire Acondicionado Inverter BGH 2250W", category: "electro", price: 650000, listPrice: 890000, stock: 4, discountPct: 27, tags: ["aire acondicionado", "split", "bgh", "inverter", "calefaccion"] },
  { id: "p320", storeId: "mercadolibre", name: "Aire Acondicionado Frío Calor LG 3000 BTU", category: "electro", price: 820000, listPrice: 1100000, stock: 3, discountPct: 25, tags: ["aire acondicionado", "split", "lg", "frio calor"] },
  { id: "p321", storeId: "fravega", name: "Estufa a Gas Orbis 3500 kcal", category: "electro", price: 95000, listPrice: 130000, stock: 15, discountPct: 27, tags: ["estufa", "gas", "orbis", "calefaccion", "calor"] },
  { id: "p322", storeId: "mercadolibre", name: "Estufa Eléctrica Caloventor Yelmo", category: "electro", price: 45000, listPrice: 62000, stock: 20, discountPct: 27, tags: ["estufa", "electrica", "caloventor", "calefaccion"] },
  { id: "p323", storeId: "fravega", name: "Calefactor a Gas Peisa 3000 kcal", category: "electro", price: 180000, listPrice: 240000, stock: 8, discountPct: 25, tags: ["calefactor", "gas", "peisa", "calefaccion", "calor"] },
  { id: "p324", storeId: "mercadolibre", name: "Cafetera Express DeLonghi 15 Bar", category: "electro", price: 185000, listPrice: 250000, stock: 10, discountPct: 26, tags: ["cafetera", "express", "delonghi", "cafe"] },
  { id: "p325", storeId: "fravega", name: "Tostadora Oster 2 Ranuras Inox", category: "electro", price: 28000, listPrice: 38000, stock: 25, discountPct: 26, tags: ["tostadora", "oster", "pan", "desayuno"] },
  { id: "p326", storeId: "fravega", name: "Plancha de Pelo Remington Titanio", category: "electro", price: 52000, listPrice: 72000, stock: 18, discountPct: 28, tags: ["plancha", "pelo", "remington", "cabello", "secador"] },
  { id: "p327", storeId: "mercadolibre", name: "Secadora de Pelo Philips 2200W", category: "electro", price: 38000, listPrice: 52000, stock: 22, discountPct: 27, tags: ["secador", "pelo", "philips", "cabello"] },

  // Celulares y Tecnología
  { id: "p330", storeId: "mercadolibre", name: "Samsung Galaxy S24 256GB", category: "electronica", price: 1200000, listPrice: 1600000, stock: 8, discountPct: 25, tags: ["celular", "samsung", "galaxy", "s24", "smartphone"] },
  { id: "p331", storeId: "fravega", name: "iPhone 15 128GB Negro", category: "electronica", price: 1650000, listPrice: 2100000, stock: 5, discountPct: 21, tags: ["iphone", "apple", "celular", "smartphone"] },
  { id: "p332", storeId: "mercadolibre", name: "Motorola Edge 40 Neo 256GB", category: "electronica", price: 520000, listPrice: 720000, stock: 12, discountPct: 28, tags: ["celular", "motorola", "edge", "smartphone"] },
  { id: "p333", storeId: "mercadolibre", name: "Notebook Lenovo IdeaPad 15\" i5 16GB", category: "electronica", price: 980000, listPrice: 1300000, stock: 6, discountPct: 25, tags: ["notebook", "laptop", "lenovo", "computadora"] },
  { id: "p334", storeId: "fravega", name: "Tablet Samsung Galaxy Tab A8 64GB", category: "electronica", price: 280000, listPrice: 380000, stock: 10, discountPct: 26, tags: ["tablet", "samsung", "galaxy", "android"] },
  { id: "p335", storeId: "fravega", name: "Consola PS5 Slim 1TB", category: "electronica", price: 1400000, listPrice: 1900000, stock: 3, discountPct: 26, tags: ["playstation", "ps5", "consola", "gaming", "sony"] },
  { id: "p336", storeId: "mercadolibre", name: "Auriculares Inalámbricos Sony WH-1000XM5", category: "electronica", price: 380000, listPrice: 520000, stock: 8, discountPct: 27, tags: ["auriculares", "sony", "noise cancelling", "bluetooth", "headphones"] },
  { id: "p337", storeId: "fravega", name: "Parlante Bluetooth JBL Charge 5", category: "electronica", price: 145000, listPrice: 200000, stock: 14, discountPct: 28, tags: ["parlante", "bluetooth", "jbl", "portatil", "speaker"] },

  // Más Indumentaria
  { id: "p340", storeId: "mercadolibre", name: "Mochila Escolar Totto 20L", category: "indumentaria", price: 38000, listPrice: 52000, stock: 20, discountPct: 27, tags: ["mochila", "totto", "escolar", "bolso"] },
  { id: "p341", storeId: "mercadolibre", name: "Buzo Hoodie Algodón Unisex", category: "indumentaria", price: 22000, listPrice: 30000, stock: 35, discountPct: 27, tags: ["buzo", "hoodie", "ropa", "algodon"] },
  { id: "p342", storeId: "coto", name: "Gorra Adidas Originals Ajustable", category: "indumentaria", price: 12000, listPrice: 18000, stock: 28, discountPct: 33, tags: ["gorra", "adidas", "cap", "accesorio"] },

  // Muebles / Hogar
  { id: "p350", storeId: "mercadolibre", name: "Sillón Individual Revestimiento Ecocuero", category: "hogar", price: 180000, listPrice: 250000, stock: 5, discountPct: 28, tags: ["sillon", "mueble", "sala", "hogar"] },
  { id: "p351", storeId: "mercadolibre", name: "Escritorio Gamer con Soporte de Monitor", category: "hogar", price: 95000, listPrice: 135000, stock: 8, discountPct: 30, tags: ["escritorio", "gamer", "mueble", "oficina", "silla"] },
  { id: "p352", storeId: "mercadolibre", name: "Cama de 2 Plazas con Colchón Resortes", category: "hogar", price: 450000, listPrice: 650000, stock: 3, discountPct: 31, tags: ["cama", "colchon", "hogar", "dormitorio", "plaza"] },

  // Deportes & Fitness
  { id: "p360", storeId: "mercadolibre", name: "Bicicleta MTB Rodado 29 Shimano", category: "deportes", price: 320000, listPrice: 450000, stock: 6, discountPct: 29, tags: ["bicicleta", "mtb", "shimano", "rodado", "deporte"] },
  { id: "p361", storeId: "mercadolibre", name: "Mancuernas Hexagonales Par 5kg", category: "deportes", price: 28000, listPrice: 40000, stock: 20, discountPct: 30, tags: ["mancuernas", "pesas", "gym", "fitness", "entrenamiento"] },
  { id: "p362", storeId: "mercadolibre", name: "Pelota de Fútbol Adidas FIFA Quality", category: "deportes", price: 35000, listPrice: 48000, stock: 15, discountPct: 27, tags: ["pelota", "futbol", "adidas", "deporte"] }
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
