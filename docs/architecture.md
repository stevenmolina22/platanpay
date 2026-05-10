# PlatandPay — Arquitectura

## Resumen

PlatandPay es un agente de compras supervisado para Argentina. Está construido sobre tres principios fundamentales:

1. **No invasivo** — solo trabaja con datos que el usuario comparte.
2. **Control humano** — toda acción requiere aprobación explícita.
3. **Tecnología con propósito** — el LLM y tools son invisibles al usuario.

## Layout

```
plantadpay/
├── src/
│   ├── lib/
│   │   ├── agent.ts        # Orquestador + system prompt + loop agentic
│   │   ├── tools.ts        # Definición de tools y guardia de aprobación
│   │   ├── scoring.ts      # Cálculo 0-100
│   │   └── types.ts        # Tipos compartidos
│   ├── mocks/
│   │   ├── stores.ts       # Carrefour, Coto, Jumbo, Mercado Libre, Club de Beneficios
│   │   └── products.ts     # ~20 productos mockeados
│   ├── api/
│   │   └── server.ts       # Express POST /chat
│   └── cli/
│       └── chat.ts         # CLI interactivo (REPL)
└── docs/
    └── architecture.md
```

## Flujo de un turno

```
Usuario ──► API/CLI ──► runAgentTurn(history)
                            │
                            ▼
                    client.messages.create({
                      system: SYSTEM_PROMPT (cacheado),
                      tools:  [search_and_score, list_stores, simulate_purchase],
                      messages: history
                    })
                            │
                            ▼
                  ┌── tool_use? ──► executeTool() ──► append tool_result
                  │                                          │
                  └─ end_turn ◄──────────────────────────────┘
                            │
                            ▼
                  reply al usuario
```

## Control humano: la guardia de `simulate_purchase`

La aprobación se valida en **dos lugares**:

1. **System prompt**: el modelo tiene instrucciones explícitas para nunca llamar `simulate_purchase` sin aprobación previa, y debe pasar `user_confirmation_quote` con el texto exacto que cita la aprobación.

2. **Runtime guard** (`tools.ts::userApprovedExplicitly`): chequea el último mensaje del usuario contra patrones (`sí`, `dale`, `aprobado`, `confirmo`, `ok`, etc.) y descarta negaciones explícitas (`no`, `cancelar`, `pará`). Si no hay aprobación, la herramienta devuelve `{ok: false, error: "missing_user_approval"}` y el modelo ve que falló y debe volver a pedirla.

Esto es defensa en profundidad: el prompt podría fallar (jailbreak), pero el runtime no.

## Sistema de scoring

`scoring.ts::scoreProducts()` toma el set completo de resultados y calcula score relativo (el más barato del lote saca 40 pts en precio; los demás caen linealmente). Pesos:

| Componente       | Máx |
|------------------|----:|
| Precio           |  40 |
| Descuento        |  20 |
| Reputación       |  15 |
| Stock            |  10 |
| Envío            |  10 |
| Medios de pago   |   5 |

Cada `ScoredProduct` viene con `reasons: string[]` para que el modelo pueda explicar la propuesta.

## Prompt caching

El `SYSTEM_PROMPT` es estable (no contiene timestamps, IDs, ni nada volátil) y lleva `cache_control: {type: "ephemeral"}`. A partir del 2do turno de la misma sesión, los tokens del system se leen del caché (~10x más barato). Verificable en `usage.cacheRead`.

## Próximos pasos sugeridos

- Reemplazar mocks por scraping real con Playwright MCP (carrefour.com.ar, etc.).
- Agregar Firecrawl para extracción estructurada de productos.
- Persistir sesiones en Redis (hoy son in-memory).
- Streaming de respuestas (`client.messages.stream()`).
- Tests con sesiones grabadas.
- Extender el sistema con otros agentes especializados (Presupuesto, Suscripciones, Alertas).
