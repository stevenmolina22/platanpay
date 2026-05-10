import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { runAgentTurn, type AgentMessage } from "../lib/agent.js";

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("⚠️  Falta ANTHROPIC_API_KEY en el environment. Copiá .env.example a .env.");
    process.exit(1);
  }

  const rl = readline.createInterface({ input: stdin, output: stdout });
  const history: AgentMessage[] = [];

  console.log("🍌 PlatandPay listo. Escribí lo que querés comprar (o 'salir').\n");

  while (true) {
    const userMsg = (await rl.question("vos> ")).trim();
    if (!userMsg) continue;
    if (["salir", "exit", "chau"].includes(userMsg.toLowerCase())) break;

    history.push({ role: "user", content: userMsg });
    try {
      const result = await runAgentTurn(history);
      console.log(`\nplatandpay> ${result.reply}\n`);
      if (result.toolCalls.length > 0) {
        console.log(
          `   [tools usadas: ${result.toolCalls.map((t) => t.name).join(", ")}]\n`,
        );
      }
    } catch (err) {
      console.error("Error:", err instanceof Error ? err.message : err);
    }
  }

  rl.close();
  console.log("Chau! 🍌");
}

main();
