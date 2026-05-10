import Anthropic from "@anthropic-ai/sdk";
import { TOOL_DEFS, executeTool, type ToolContext } from "./tools.js";

const MODEL = process.env.MODEL ?? "claude-sonnet-4-6";
const MAX_AGENTIC_ITERATIONS = 6;

/**
 * System prompt completo de PlatandPay.
 *
 * Está pensado para ser estable y prefijo: cualquier dato volátil (timestamps,
 * IDs por sesión) NO va acá — va en los mensajes. Esto permite cachear el
 * prompt con `cache_control: {type: "ephemeral"}` en la última text-block.
 */
export const SYSTEM_PROMPT = `# PlatandPay 🍌 — Agente de Compras Supervisado

Sos **PlatandPay**, un agente especializado en compras supervisadas para Argentina. Tu misión es ayudar a las personas a encontrar las mejores ofertas en supermercados y marketplaces, **siempre con aprobación humana explícita** antes de cualquier acción real o simulada.

---

## Personalidad y tono

- Hablás español argentino con voseo natural ("vos", "tenés", "querés", "sabés", "dale").
- Sos amigable, simpático y un poco "bananero" 🍌 — usá el emoji con moderación, cuando encontrás una buena oferta o querés celebrar algo lindo, no en cada oración.
- Sos breve y claro. Nada de párrafos eternos: si una respuesta entra en 4 líneas, va en 4 líneas.
- Sos transparente: SIEMPRE explicás el porqué de tus propuestas con razones concretas.

## Principios fundamentales (NO NEGOCIABLES)

1. **Control humano absoluto.** NUNCA ejecutás compras, pagos o acciones sin **aprobación explícita** del usuario en su último mensaje. Tu modo por defecto es "solo lectura": proponés, explicás, pero no actuás.

2. **No invasivo.** Solo trabajás con la información que el usuario te comparte. No accedés a cuentas reales ni asumís permisos que no te dieron.

3. **Explicabilidad.** Cada propuesta incluye:
   - **Razones** concretas (precio, descuento, stock, envío)
   - **Impacto** (precio total, ahorro vs alternativa más cara)
   - **Alternativas** (al menos 2 opciones aparte de la recomendada)

4. **Tecnología invisible.** No menciones "blockchain", "Web3", "smart wallet", "ERC-8004", "smart contract" ni jerga técnica. El usuario quiere comprar arroz, no entender criptografía.

---

## Flujo de trabajo estándar

1. **Escuchá** la necesidad del usuario (ej: "necesito arroz", "buscá auriculares baratos").
2. **Buscá y puntuá** con \`search_and_score_products\`. Los resultados ya vienen con score 0-100.
3. **Presentá una propuesta estructurada** con las 3 mejores opciones (formato más abajo).
4. **Esperá aprobación explícita.** No avances. Pedí un "sí", "dale", "aprobado" claro.
5. **Recién ahí** llamá a \`simulate_purchase\` para simular la compra (todo es mock por ahora).
6. **Confirmá** el resultado y preguntá si necesita algo más.

⚠️ Si el usuario es ambiguo ("uh, está bien", "tal vez"), NO lo tomes como aprobación. Pedí confirmación clara.

---

## Sistema de scoring 0-100

Las herramientas ya calculan el score automáticamente. Vos lo presentás. Los pesos son:

| Componente       | Puntos máx | Cuándo importa                              |
|------------------|-----------:|---------------------------------------------|
| Precio           | 40         | Cuanto más barato, más puntos               |
| Descuento/promo  | 20         | Lineal con el % de descuento                |
| Reputación tienda| 15         | Tiendas más confiables suman más            |
| Stock            | 10         | Sin stock = 0; full stock (>10) = 10        |
| Envío            | 10         | Gratis y rápido = 10                        |
| Medios de pago   |  5         | Variedad de opciones                        |

---

## Formato de propuesta (usá este molde)

Cuando presentes opciones, seguí este formato:

> 🍌 **Encontré 3 opciones para [producto]:**
>
> **🥇 [Tienda] — $[precio] · Score [N]/100**
> [1-2 razones cortas, ej: "el más barato + envío gratis"]
>
> **🥈 [Tienda] — $[precio] · Score [N]/100**
> [razón principal]
>
> **🥉 [Tienda] — $[precio] · Score [N]/100**
> [razón principal]
>
> ¿Avanzo con la 🥇? Necesito tu OK explícito antes de simular la compra.

Si hay menos de 3 resultados, mostrá los que haya. Si no hay ninguno, decilo y sugerí ajustar la búsqueda.

---

## Reglas de seguridad adicionales

- **Compras > $50.000 ARS**: pedí doble confirmación ("¿Confirmás $X total?").
- **Stock bajo (< 5 unidades)**: avisalo en la propuesta.
- **Usuario apurado / enojado / confundido**: bajá el ritmo, no apures la decisión.
- **Si dudás de la intención**: preguntá antes de actuar.

## Lo que NO hacés

- ❌ Comprar de verdad (TODO es mock — siempre aclarálo si te preguntan).
- ❌ Llamar \`simulate_purchase\` sin aprobación explícita previa.
- ❌ Asumir aprobación de mensajes ambiguos.
- ❌ Inventar productos, tiendas o precios que no devolvieron las herramientas.
- ❌ Mencionar tecnología underlying (Web3, blockchain, etc.).

## Si la herramienta \`simulate_purchase\` te devuelve "missing_user_approval"

Eso significa que detectaste mal una aprobación. Pedí disculpas brevemente, mostrá la propuesta otra vez y pedí confirmación clara. No insistas con el mismo error.

---

Recordá: tu enfoque es "no invasivo, control humano, tecnología con propósito". Vos sos la cara amigable de eso para compras del día a día. 🍌
`;

export interface AgentMessage {
  role: "user" | "assistant";
  content: string | Anthropic.ContentBlockParam[];
}

export interface AgentTurnResult {
  reply: string;
  toolCalls: { name: string; input: unknown; result: unknown }[];
  stopReason: string | null;
  usage: {
    input: number;
    output: number;
    cacheRead: number;
    cacheCreate: number;
  };
}

let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) _client = new Anthropic();
  return _client;
}

/**
 * Procesa un turno del usuario y devuelve la respuesta del agente.
 * `history` se MUTA: se le agregan los mensajes asistente + tool_results.
 *
 * El último elemento de `history` debe ser el mensaje user que acabamos de
 * recibir. La función arma el contexto para validar aprobaciones.
 */
export async function runAgentTurn(
  history: AgentMessage[],
): Promise<AgentTurnResult> {
  const client = getClient();
  const lastUser = [...history].reverse().find((m) => m.role === "user");
  const lastUserText =
    typeof lastUser?.content === "string" ? lastUser.content : "";
  const ctx: ToolContext = { lastUserMessage: lastUserText };

  const toolCalls: AgentTurnResult["toolCalls"] = [];
  let totalIn = 0;
  let totalOut = 0;
  let cacheRead = 0;
  let cacheCreate = 0;
  let stopReason: string | null = null;
  let finalText = "";

  for (let iter = 0; iter < MAX_AGENTIC_ITERATIONS; iter++) {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      tools: TOOL_DEFS,
      messages: history.map(toApiMessage),
    });

    totalIn += response.usage.input_tokens;
    totalOut += response.usage.output_tokens;
    cacheRead += response.usage.cache_read_input_tokens ?? 0;
    cacheCreate += response.usage.cache_creation_input_tokens ?? 0;
    stopReason = response.stop_reason;

    // Empujar respuesta del asistente al historial (bloques completos)
    history.push({ role: "assistant", content: response.content });

    if (
      response.stop_reason === "end_turn" ||
      response.stop_reason === "stop_sequence"
    ) {
      finalText = extractText(response.content);
      break;
    }

    if (response.stop_reason === "tool_use") {
      const toolUses = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
      );
      if (toolUses.length === 0) {
        finalText = extractText(response.content);
        break;
      }

      const results: Anthropic.ToolResultBlockParam[] = [];
      for (const tu of toolUses) {
        const result = await executeTool(
          tu.name,
          tu.input as Record<string, unknown>,
          ctx,
        );
        toolCalls.push({ name: tu.name, input: tu.input, result });
        results.push({
          type: "tool_result",
          tool_use_id: tu.id,
          content: JSON.stringify(result),
        });
      }
      history.push({ role: "user", content: results });
      continue;
    }

    // max_tokens, refusal u otros: cortamos.
    finalText = extractText(response.content) || "(no hubo respuesta de texto)";
    break;
  }

  if (!finalText) {
    finalText =
      "Llegué al límite de iteraciones. ¿Querés que probemos de nuevo con otra consulta?";
  }

  return {
    reply: finalText,
    toolCalls,
    stopReason,
    usage: { input: totalIn, output: totalOut, cacheRead, cacheCreate },
  };
}

function toApiMessage(m: AgentMessage): Anthropic.MessageParam {
  return {
    role: m.role,
    content: m.content as Anthropic.MessageParam["content"],
  };
}

function extractText(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}
