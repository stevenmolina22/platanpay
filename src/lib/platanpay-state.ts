import type { ScoredProduct } from "@/lib/types";

export const APP_STATE_KEY = "platanpay_webapp_state_v5";
export const BACKEND_SESSION_KEY = "platandpay_backend_session_id";

export type ViewName = "dashboard" | "ofertas" | "historial" | "chat" | "perfil";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  memberSince: string;
}

export interface Offer {
  id: string;
  backendProductId?: string;
  backendStoreId?: string;
  store: string;
  product: string;
  originalPrice: number;
  price: number;
  discount: number;
  image?: string;
  imageUrl?: string;
  category: string;
  savings: number;
  description: string;
  score?: number;
  reasons?: string[];
}

export interface HistoryItem {
  id: string;
  date: string;
  store: string;
  product: string;
  saved: number;
  total: number;
  receiptId?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
  status?: "loading" | "error";
  action?: {
    label: string;
    view: ViewName;
  };
}

export interface PlatanPayState {
  user: UserProfile;
  saldo: number;
  presupuestoTotal: number;
  presupuestoRestante: number;
  ahorroMes: number;
  historial: HistoryItem[];
  selectedOfferIds: string[];
  offers: Offer[];
  chatMessages: ChatMessage[];
}

export const initialOffers: Offer[] = [
  {
    id: "demo-yerba",
    store: "Carrefour",
    product: "Yerba Mate Playadito 1kg",
    originalPrice: 5890,
    price: 3490,
    discount: 41,
    image: "🧉",
    category: "Almacén",
    savings: 2400,
    description:
      "Yerba mate suave elaborada con palo. Cosecha seleccionada del norte argentino. Promo exclusiva 3x2 detectada por el agente.",
  },
  {
    id: "demo-jbl",
    store: "Mercado Libre",
    product: "Auriculares Bluetooth JBL Tune 520BT",
    originalPrice: 67900,
    price: 42500,
    discount: 37,
    image: "🎧",
    category: "Electrónica",
    savings: 25400,
    description:
      "Auriculares inalámbricos con cancelación de ruido, 57hs de batería. Vendedor MercadoLíder con envío gratis detectado.",
  },
  {
    id: "demo-cafe",
    store: "Coto Digital",
    product: "Café Torrado La Virginia 500g",
    originalPrice: 8200,
    price: 4990,
    discount: 39,
    image: "☕",
    category: "Almacén",
    savings: 3210,
    description:
      "Café torrado molido, blend premium argentino. El agente detectó precio histórico más bajo en los últimos 90 días.",
  },
  {
    id: "demo-aceite",
    store: "Jumbo",
    product: "Aceite de Oliva Cocinero 1L",
    originalPrice: 12500,
    price: 7890,
    discount: 37,
    image: "🫒",
    category: "Almacén",
    savings: 4610,
    description:
      "Aceite de oliva extra virgen, primera prensada en frío. Comparación automática: mejor precio vs Carrefour y Coto.",
  },
];

export const defaultState: PlatanPayState = {
  user: {
    name: "Ana Belén Méndez",
    email: "ana.mendez@email.com",
    avatar: "https://i.pravatar.cc/80?img=28",
    memberSince: "Marzo 2025",
  },
  saldo: 48750,
  presupuestoTotal: 65000,
  presupuestoRestante: 42300,
  ahorroMes: 12450,
  historial: [
    { id: "hist-1", date: "9 May", store: "Carrefour", product: "Yerba + Café + Arroz", saved: 4820, total: 12350 },
    { id: "hist-2", date: "5 May", store: "Mercado Libre", product: "Cargador USB-C Anker", saved: 8900, total: 18700 },
    { id: "hist-3", date: "1 May", store: "Coto Digital", product: "Pack limpieza hogar", saved: 3150, total: 9480 },
    { id: "hist-4", date: "28 Abr", store: "Jumbo", product: "Compra semanal super", saved: 6200, total: 34500 },
  ],
  selectedOfferIds: [],
  offers: initialOffers,
  chatMessages: [],
};

export function formatArs(value: number) {
  return value.toLocaleString("es-AR", { maximumFractionDigits: 0 });
}

export function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function getBackendSessionId() {
  const existing = localStorage.getItem(BACKEND_SESSION_KEY);
  if (existing) return existing;

  const sessionId = createId("session");
  localStorage.setItem(BACKEND_SESSION_KEY, sessionId);
  return sessionId;
}

export function loadPlatanPayState(): PlatanPayState {
  const saved = localStorage.getItem(APP_STATE_KEY);
  if (!saved) return defaultState;

  try {
    const parsed = JSON.parse(saved) as Partial<PlatanPayState> & { selectedOffers?: number[] | string[] };
    const selectedOfferIds = Array.isArray(parsed.selectedOfferIds)
      ? parsed.selectedOfferIds.map(String)
      : Array.isArray(parsed.selectedOffers)
        ? parsed.selectedOffers.map((value) => {
            if (typeof value === "number") return (parsed.offers ?? defaultState.offers)[value]?.id ?? String(value);
            return String(value);
          })
        : [];

    return {
      ...defaultState,
      ...parsed,
      user: { ...defaultState.user, ...parsed.user },
      historial: parsed.historial ?? defaultState.historial,
      offers: parsed.offers ?? defaultState.offers,
      selectedOfferIds,
      chatMessages: parsed.chatMessages ?? [],
    };
  } catch {
    return defaultState;
  }
}

export function savePlatanPayState(state: PlatanPayState) {
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

export function mapProposalToOffer(product: ScoredProduct, index: number): Offer {
  const listPrice = Number(product.listPrice || product.price || 0);
  const price = Number(product.price || 0);

  return {
    id: product.id || `proposal-${index}`,
    backendProductId: product.id,
    backendStoreId: product.storeId,
    store: product.storeName,
    product: product.name,
    originalPrice: listPrice,
    price,
    discount: Number(product.discountPct || 0),
    score: Number(product.score || 0),
    imageUrl: product.imageUrl,
    category: product.category || "otros",
    savings: Math.max(0, listPrice - price),
    description:
      `${(product.reasons || []).join(" · ")}${product.promo ? " · " + product.promo : ""}` ||
      "Propuesta generada por el agente.",
    reasons: product.reasons || [],
  };
}
