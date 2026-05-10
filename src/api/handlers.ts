import { runAgentTurn, type AgentMessage, type AgentTurnResult } from "@/lib/agent";
import { PRODUCTS, searchProducts } from "@/mocks/products";
import { scoreProducts } from "@/lib/scoring";

const sessions = new Map<string, AgentMessage[]>();

export function getHealth() {
  return { ok: true, agent: "PlatandPay 🍌", sessions: sessions.size };
}

export async function handleChat(input: unknown) {
  const { sessionId, message } = (input ?? {}) as { sessionId?: unknown; message?: unknown };
  if (
    typeof sessionId !== "string" ||
    typeof message !== "string" ||
    sessionId.trim() === "" ||
    message.trim() === ""
  ) {
    return {
      status: 400,
      body: {
        ok: false,
        error: "bad_request",
        message: "Mandá { sessionId: string, message: string } no vacíos en el body.",
      },
    };
  }

  const history = sessions.get(sessionId) ?? [];
  history.push({ role: "user", content: message });

  try {
    const result = await runConfiguredAgentTurn(history);
    sessions.set(sessionId, history);
    return { status: 200, body: serializeAgentResult(result) };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const isHistoryCorruption =
      (msg.includes("tool_use") && msg.includes("tool_result") && msg.includes("400")) ||
      msg.includes("invalid_request_error");

    if (isHistoryCorruption) {
      console.warn(`[server] History corruption detected for session ${sessionId}, resetting and retrying...`);
      const freshHistory: AgentMessage[] = [{ role: "user", content: message }];
      sessions.set(sessionId, freshHistory);
      try {
        const retryResult = await runConfiguredAgentTurn(freshHistory);
        sessions.set(sessionId, freshHistory);
        return { status: 200, body: serializeAgentResult(retryResult) };
      } catch (retryErr: unknown) {
        const retryMsg = retryErr instanceof Error ? retryErr.message : String(retryErr);
        return { status: 500, body: { ok: false, error: "agent_failure", message: retryMsg } };
      }
    }

    return { status: 500, body: { ok: false, error: "agent_failure", message: msg } };
  }
}

export function resetSession(id: string) {
  sessions.delete(id);
  return { ok: true, message: "Sesión reseteada." };
}

function serializeAgentResult(result: AgentTurnResult) {
  return {
    ok: true,
    reply: result.reply,
    toolCalls: result.toolCalls,
    proposals: result.proposals ?? [],
    purchaseReceipts: result.purchaseReceipts ?? [],
    usage: result.usage,
    stopReason: result.stopReason,
  };
}

async function runConfiguredAgentTurn(history: AgentMessage[]): Promise<AgentTurnResult> {
  if (process.env.PLATANDPAY_AGENT_MOCK !== "1") {
    return runAgentTurn(history);
  }

  const lastUser = [...history].reverse().find((m) => m.role === "user");
  const lastUserText = typeof lastUser?.content === "string" ? lastUser.content : "";
  const proposals = scoreProducts(searchProducts(inferMockProductQuery(lastUserText))).slice(0, 10);
  const approved = /\b(si|sí|dale|aprobado|confirmo|ok)\b/i.test(lastUserText);
  const purchaseReceipts =
    approved && proposals[0]
      ? [
          {
            ok: true,
            mock: true as const,
            productId: proposals[0].id,
            storeId: proposals[0].storeId,
            storeName: proposals[0].storeName,
            total: proposals[0].price,
            estimatedDeliveryDays: 2,
            receiptId: `MOCK-${Date.now().toString(36).toUpperCase()}`,
            message: `Compra SIMULADA. No se cobró nada real. Total: $${proposals[0].price.toLocaleString("es-AR")}.`,
          },
        ]
      : [];
  const reply =
    proposals.length > 0
      ? `Encontré ${proposals.length} opciones para "${inferMockProductQuery(lastUserText)}". Revisalas abajo y aprobá una si querés que simule la compra.`
      : `Respuesta mock para: ${lastUserText}`;
  history.push({ role: "assistant", content: reply });

  return {
    reply,
    toolCalls: [],
    proposals,
    purchaseReceipts,
    stopReason: "end_turn",
    usage: { input: 0, output: 0, cacheRead: 0, cacheCreate: 0 },
  };
}

function inferMockProductQuery(text: string): string {
  const normalized = text.toLowerCase();
  const tags = new Set(PRODUCTS.flatMap((product) => product.tags));
  const matched = [...tags].find((tag) => normalized.includes(tag));
  return matched ?? normalized.split(/\s+/).find((part) => part.length > 3) ?? normalized;
}
