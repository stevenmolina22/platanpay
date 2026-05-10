import type { Store } from "../lib/types";

export const STORES: Store[] = [
  {
    id: "carrefour",
    name: "Carrefour",
    domain: "carrefour.com.ar",
    reputation: 85,
    avgShippingDays: 2,
    freeShippingThreshold: 25_000,
    paymentMethods: ["debito", "credito", "mercadopago", "modo", "efectivo"],
  },
  {
    id: "coto",
    name: "Coto Digital",
    domain: "cotodigital.com.ar",
    reputation: 80,
    avgShippingDays: 3,
    freeShippingThreshold: 30_000,
    paymentMethods: ["debito", "credito", "mercadopago", "tarjeta_coto"],
  },
  {
    id: "jumbo",
    name: "Jumbo",
    domain: "jumbo.com.ar",
    reputation: 88,
    avgShippingDays: 2,
    freeShippingThreshold: 35_000,
    paymentMethods: ["debito", "credito", "mercadopago", "modo"],
  },
  {
    id: "mercadolibre",
    name: "Mercado Libre",
    domain: "mercadolibre.com.ar",
    reputation: 92,
    avgShippingDays: 4,
    freeShippingThreshold: 12_000,
    paymentMethods: ["mercadopago", "credito", "debito"],
  },
  {
    id: "club_beneficios",
    name: "Club de Beneficios",
    domain: "clubdebeneficios.com",
    reputation: 75,
    avgShippingDays: 5,
    freeShippingThreshold: 0,
    paymentMethods: ["credito", "mercadopago"],
  },
];

export function findStore(id: string): Store | undefined {
  return STORES.find((s) => s.id === id);
}
