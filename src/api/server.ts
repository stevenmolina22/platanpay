import express from "express";
import { runAgentTurn, type AgentMessage, type AgentTurnResult } from "../lib/agent.js";
import { PRODUCTS, searchProducts } from "../mocks/products.js";
import { scoreProducts } from "../lib/scoring.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: express.Express = express();
app.use(express.static(path.join(__dirname, "../../frontend")));
app.use(express.static(path.join(__dirname, "../../frontend/public")));

app.use((req, res, next) => {
  const allowedOrigin = process.env.CORS_ORIGIN ?? "*";
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  return next();
});
app.use(express.json({ limit: "1mb" }));
app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      ok: false,
      error: "bad_json",
      message: "El body tiene que ser JSON válido.",
    });
  }
  return next(err);
});

/**
 * Sesiones en memoria (por simplicidad). En prod esto va a Redis o DB.
 * Cada sessionId mantiene su propio historial de conversación.
 */
const sessions = new Map<string, AgentMessage[]>();

app.get("/health", (_req, res) => {
  res.json({ ok: true, agent: "PlatandPay 🍌", sessions: sessions.size });
});

app.post("/chat", async (req, res) => {
  const { sessionId, message } = req.body ?? {};
  if (
    typeof sessionId !== "string" ||
    typeof message !== "string" ||
    sessionId.trim() === "" ||
    message.trim() === ""
  ) {
    return res.status(400).json({
      ok: false,
      error: "bad_request",
      message: "Mandá { sessionId: string, message: string } no vacíos en el body.",
    });
  }

  const history = sessions.get(sessionId) ?? [];
  history.push({ role: "user", content: message });

  try {
    const result = await runConfiguredAgentTurn(history);
    sessions.set(sessionId, history);
    return res.json({
      ok: true,
      reply: result.reply,
      toolCalls: result.toolCalls,
      proposals: result.proposals ?? [],
      purchaseReceipts: result.purchaseReceipts ?? [],
      usage: result.usage,
      stopReason: result.stopReason,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    // Auto-reset si Anthropic rechaza el historial por tool_use sin tool_result
    const isHistoryCorruption =
      msg.includes("tool_use") && msg.includes("tool_result") && msg.includes("400") ||
      msg.includes("invalid_request_error");
    if (isHistoryCorruption) {
      console.warn(`[server] History corruption detected for session ${sessionId}, resetting and retrying...`);
      const freshHistory: AgentMessage[] = [{ role: "user", content: message }];
      sessions.set(sessionId, freshHistory);
      try {
        const retryResult = await runConfiguredAgentTurn(freshHistory);
        sessions.set(sessionId, freshHistory);
        return res.json({
          ok: true,
          reply: retryResult.reply,
          toolCalls: retryResult.toolCalls,
          proposals: retryResult.proposals ?? [],
          purchaseReceipts: retryResult.purchaseReceipts ?? [],
          usage: retryResult.usage,
          stopReason: retryResult.stopReason,
        });
      } catch (retryErr: unknown) {
        const retryMsg = retryErr instanceof Error ? retryErr.message : String(retryErr);
        return res.status(500).json({ ok: false, error: "agent_failure", message: retryMsg });
      }
    }
    return res.status(500).json({ ok: false, error: "agent_failure", message: msg });
  }
});

app.post("/sessions/:id/reset", (req, res) => {
  sessions.delete(req.params.id);
  res.json({ ok: true, message: "Sesión reseteada." });
});

const port = Number(process.env.PORT ?? 3000);
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`🍌 PlatandPay escuchando en http://localhost:${port}`);
    console.log(`   POST /chat  { sessionId, message }`);
    console.log(`   POST /sessions/:id/reset`);
  });
}

export default app;

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
