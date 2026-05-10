export type PaymentMethod =
  | "debito"
  | "credito"
  | "mercadopago"
  | "modo"
  | "efectivo"
  | "tarjeta_coto";

export type Category = "alimentos" | "limpieza" | "electronica" | "bebidas" | "otros";

export interface Store {
  id: string;
  name: string;
  domain: string;
  reputation: number; // 0-100
  avgShippingDays: number;
  freeShippingThreshold: number; // 0 = nunca gratis
  paymentMethods: PaymentMethod[];
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  category: Category;
  price: number;
  listPrice: number;
  stock: number;
  discountPct: number;
  tags: string[];
  promo?: string;
}

export interface ScoredProduct extends Product {
  score: number;
  storeName: string;
  reasons: string[];
}

export interface PurchaseRequest {
  productId: string;
  storeId: string;
  quantity: number;
  approved: boolean;
}

export interface PurchaseReceipt {
  ok: boolean;
  mock: true;
  productId: string;
  storeId: string;
  storeName: string;
  total: number;
  estimatedDeliveryDays: number;
  receiptId: string;
  message: string;
}
