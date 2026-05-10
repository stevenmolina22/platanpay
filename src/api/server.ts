import express from "express";
import { runAgentTurn, type AgentMessage, type AgentTurnResult } from "../lib/agent.js";

const app = express();
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
      usage: result.usage,
      stopReason: result.stopReason,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ ok: false, error: "agent_failure", message: msg });
  }
});

app.post("/sessions/:id/reset", (req, res) => {
  sessions.delete(req.params.id);
  res.json({ ok: true, message: "Sesión reseteada." });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`🍌 PlatandPay escuchando en http://localhost:${port}`);
  console.log(`   POST /chat  { sessionId, message }`);
  console.log(`   POST /sessions/:id/reset`);
});

async function runConfiguredAgentTurn(history: AgentMessage[]): Promise<AgentTurnResult> {
  if (process.env.PLATANDPAY_AGENT_MOCK !== "1") {
    return runAgentTurn(history);
  }

  const lastUser = [...history].reverse().find((m) => m.role === "user");
  const lastUserText = typeof lastUser?.content === "string" ? lastUser.content : "";
  const reply = `Respuesta mock para: ${lastUserText}`;
  history.push({ role: "assistant", content: reply });

  return {
    reply,
    toolCalls: [],
    stopReason: "end_turn",
    usage: { input: 0, output: 0, cacheRead: 0, cacheCreate: 0 },
  };
}
