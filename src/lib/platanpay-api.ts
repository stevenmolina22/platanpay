import type { PurchaseReceipt, ScoredProduct } from "@/lib/types";

export interface ChatApiResponse {
  ok: boolean;
  reply: string;
  proposals?: ScoredProduct[];
  purchaseReceipts?: PurchaseReceipt[];
  message?: string;
}

export async function sendChatTurn(sessionId: string, message: string): Promise<ChatApiResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, message }),
  });

  const payload = (await response.json()) as ChatApiResponse;
  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || "No se pudo conectar con PlatandPay API.");
  }

  return payload;
}
