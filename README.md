# PlatandPay

Agente de compras supervisado para Argentina, creado para Platanus Hack 26. El backend conversa con Claude y ejecuta tools de busqueda, scoring y compra simulada. El frontend web permite chatear, ver propuestas como cards y aprobar explicitamente cada simulacion.

## Stack

- Backend: Express + TypeScript + Anthropic SDK
- Frontend: Vite sirviendo la WebApp HTML provista, con integracion JS al backend
- Datos: mocks locales con fallback para demo
- Tests API: Hurl

## Requisitos

- Node.js 22+
- npm
- Hurl para correr `npm run test:api`
- `ANTHROPIC_API_KEY` en `.env` si queres usar el agente real

## Configuracion

```bash
npm install
copy .env.example .env
```

Para demo local sin Anthropic, usa `PLATANDPAY_AGENT_MOCK=1`.

## Desarrollo

Terminal 1, backend:

```bash
$env:PLATANDPAY_AGENT_MOCK="1"
npm run dev:server
```

Terminal 2, frontend:

```bash
npm run dev:frontend
```

La app queda en `http://127.0.0.1:5173` y espera el backend en `http://127.0.0.1:3000`.

Si el backend corre en otro host, configura:

```bash
$env:VITE_API_BASE_URL="http://127.0.0.1:43129"
npm run dev:frontend
```

## API

- `GET /health`
- `POST /chat` con `{ "sessionId": "id", "message": "buscame arroz" }`
- `POST /sessions/:id/reset`

La respuesta de `/chat` incluye:

- `reply`: texto del agente
- `toolCalls`: tools ejecutadas
- `proposals`: productos puntuados para renderizar cards
- `purchaseReceipts`: compras simuladas registradas

## Validacion

```bash
npm run typecheck
npm run build
npm run build:frontend
```

Con el backend mock levantado:

```bash
$env:API_BASE_URL="http://127.0.0.1:3000"
npm run test:api
```

## Frontend integrado

La entrada activa es `frontend/index.html`, basada en el archivo de WebApp provisto. La conexion al backend esta en `frontend/public/backend-integration.js`.

## Flujo principal

1. El usuario pide un producto en el chat.
2. El backend busca y puntua opciones.
3. El frontend muestra cards con precio, descuento, score y razones.
4. El usuario aprueba una opcion desde el modal.
5. El frontend envia una aprobacion explicita al agente.
6. El backend simula la compra y devuelve un recibo mock.

## Equipo

team-26, Platanus Hack 26, Track Agentic Money.
