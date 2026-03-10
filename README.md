# Sales Clerk Agent

A conversational AI agent for SAP S/4HANA sales order management. Users chat in natural language to list, create, update, and delete sales orders. The frontend is a SAPUI5 app; the backend is a LangGraph agent that calls SAP AI Core (GPT-4o via Orchestration) and S/4HANA OData APIs.

## Architecture

```
Browser (SAPUI5)
  │
  │  fetch POST /chat  ──────────────────────────────────────────────┐
  │  fetch GET /index.html, *.js, ...                                │
  ▼                                                                  │
CF App: sales-clerk-agent-frontend                                   │
  @sap/approuter (nodejs_buildpack, 128M)                            │
  ├── serves dist/ (built UI5 assets)                                │
  └── proxies /chat → destination "sales-clerk-backend" ────────────┘
                                                                     │
                                                         ▼
                                          CF App: sales-clerk-agent-backend
                                          Express + LangGraph (nodejs_buildpack, 512M)
                                          ├── POST /chat → invokeAgent()
                                          │     ├── SAP AI Core Orchestration (GPT-4o)
                                          │     └── S/4HANA OData via BTP Destination
                                          └── GET /health
```

### Agent Tools

The LangGraph agent has six tools over the S/4HANA `CE_SALESORDER_0001` OData service:

| Tool | Description |
|---|---|
| `getOrders` | List sales orders filtered by sold-to party or sales org |
| `getOrderByKey` | Fetch a single order with all line items |
| `createOrder` | Create a new sales order |
| `updateOrderHeader` | Update payment terms on an order header |
| `updateOrderItem` | Update quantity or requested delivery date on a line item |
| `deleteOrder` | Delete a sales order |

## Prerequisites

- Node.js 20+
- SAP BTP subaccount with:
  - **SAP AI Core** service instance (plan `extended`) with a deployment of `gpt-4o`
  - **XSUAA** service instance (plan `application`) — service name `xsuaa-sales-clerk`
  - **Destination** service instance (plan `lite`) — service name `destination-sales-clerk`
  - **BTP Destination** `aicore-destination` created and pointing to AI Core (see [Step 2](#step-2--configure-btp-destinations) below)
  - **BTP Destination** named `S4_SALESORDER_DEST` pointing to an S/4HANA system with the `CE_SALESORDER_0001` OData service enabled
- CF CLI installed and logged in (`cf login`)

## Local Development

### 1. Backend

```bash
cd sales-clerk-agent/backend
cp .env.example .env
```

Edit `.env` and fill in:

- `VCAP_SERVICES` — paste the JSON output of `cf env sales-clerk-agent-backend` after deploying the backend once. Must include credentials for both `xsuaa` and `destination` services. The `destination` credentials allow the SDK to fetch the `aicore-destination` BTP Destination at runtime.
- `AICORE_RESOURCE_GROUP` — the AI Core resource group that contains the `gpt-4o` deployment (default: `default`). Find it in BTP Cockpit → SAP AI Core → Resource Groups, or via `cf env sales-clerk-agent-backend`.
- `S4_DESTINATION_NAME` — BTP Destination name (default: `S4_SALESORDER_DEST`)

No `AICORE_SERVICE_KEY` is needed. AI Core credentials are resolved via the `aicore-destination` BTP Destination.

```bash
npm install
npm run dev        # starts on http://localhost:3000
```

### 2. Frontend

```bash
cd sales-clerk-agent/frontend
npm install
npm run start:dev  # starts on http://localhost:8080
```

`ui5-middleware-simpleproxy` in `ui5.yaml` forwards `POST /chat` to `localhost:3000`. Open `http://localhost:8080/index.html`.

> **Note:** The local dev script is `npm run start:dev`, not `npm start`. `npm start` runs the approuter for CF deployment.

## Deployment to BTP Cloud Foundry

### Step 1 — Create BTP service instances

```bash
# XSUAA
cf create-service xsuaa application xsuaa-sales-clerk \
  -c '{"xsappname":"sales-clerk-agent","tenant-mode":"dedicated"}'

# Destination
cf create-service destination lite destination-sales-clerk
```

### Step 2 — Configure BTP Destinations

In BTP Cockpit → Connectivity → Destinations, create two destinations.

**AI Core destination** (`aicore-destination`):

| Field | Value |
|---|---|
| Name | `aicore-destination` |
| Type | `HTTP` |
| URL | `AI_API_URL` from AI Core service key |
| Proxy Type | `Internet` |
| Authentication | `OAuth2ClientCredentials` |
| Client ID | `clientid` from AI Core service key |
| Client Secret | `clientsecret` from AI Core service key |
| Token Service URL Type | `Dedicated` |
| Token Service URL | `url` from AI Core service key + `/oauth/token` |

**S/4HANA destination** (`S4_SALESORDER_DEST`):

| Field | Value |
|---|---|
| Name | `S4_SALESORDER_DEST` |
| Type | `HTTP` |
| URL | `https://<your-s4-host>` |
| Authentication | `BasicAuthentication` (or `OAuth2SAMLBearerAssertion` for SSO) |
| Additional property: `sap-client` | e.g. `100` |

### Step 3 — Deploy the backend

Before pushing, update `manifest.yml` if your AI Core resource group differs from the default:

```yaml
env:
  AICORE_RESOURCE_GROUP: <your-resource-group>   # default: "default"
```

```bash
cd sales-clerk-agent/backend
npm run build          # compiles TypeScript → dist/
cf push
```

Get the backend route:

```bash
cf app sales-clerk-agent-backend | grep routes
# e.g. sales-clerk-agent-backend.cfapps.eu10.hana.ondemand.com
```

### Step 4 — Update the frontend destination URL

Edit `sales-clerk-agent/frontend/manifest.yml` and replace the backend URL with the actual hostname from Step 3. The `ui5` entry points to the SAP UI5 CDN and does not need to change:

```yaml
destinations: >
  [
    {"name":"sales-clerk-backend","url":"https://sales-clerk-agent-backend.cfapps.<region>.hana.ondemand.com","forwardAuthToken":true},
    {"name":"ui5","url":"https://ui5.sap.com","forwardAuthToken":false}
  ]
```

> The `ui5` destination serves the SAPUI5 framework assets (`/resources/`) via the approuter CDN proxy. Its version must match `framework.version` in `frontend/ui5.yaml`.

### Step 5 — Deploy the frontend

```bash
cd sales-clerk-agent/frontend
npm run build          # builds UI5 app → dist/
cf push                # nodejs_buildpack runs npm install, then npm start (approuter)
```

### Step 6 — Verify

```bash
cf apps
# Both apps should be "started"

cf app sales-clerk-agent-frontend | grep routes
# e.g. sales-clerk-agent-frontend.cfapps.eu10.hana.ondemand.com
```

Open `https://sales-clerk-agent-frontend.<domain>/index.html`.

## Authorization

Authentication is enforced at two layers:

**Frontend (Approuter)**
- `xs-app.json` sets `"authenticationMethod": "route"` — unauthenticated users are redirected to the XSUAA login page automatically.
- If IAS is configured as a trusted corporate IdP in BTP Cockpit (Security → Trust Configuration), XSUAA redirects the browser to the IAS login screen.
- After login, the approuter forwards the XSUAA `Bearer` token to the backend via `"forwardAuthToken": true` on the `sales-clerk-backend` destination.
- Static UI5 CDN routes (`/resources/`, `/test-resources/`) use `"authenticationType": "none"` — framework assets are public.

**Backend (Express)**
- `POST /chat` verifies the forwarded XSUAA JWT using `@sap/xssec`.
- In **local development**, token verification is skipped when `VCAP_SERVICES` is absent or `{}`.

**Required service bindings for the frontend CF app** (declared in `frontend/manifest.yml`):
- `xsuaa-sales-clerk` — XSUAA credentials for the login redirect and token issuance
- `destination-sales-clerk` — Destination service so the approuter can resolve the `sales-clerk-backend` destination at runtime

## Usage After Deployment

Open `https://sales-clerk-agent-frontend.<domain>/index.html`.

Type natural language requests in the chat input. Examples:

| Request | What the agent does |
|---|---|
| `Show me all orders for customer 17100001` | Calls `getOrders` with sold-to party filter |
| `What are the line items on order 5000000?` | Calls `getOrderByKey` |
| `Create an order for customer 17100001, sales org 1710, channel 10, division 00` | Calls `createOrder` |
| `Update order 5000000 item 10 quantity to 5` | Calls `updateOrderItem` |
| `Change payment terms on order 5000000 to NT30` | Calls `updateOrderHeader` |
| `Delete order 5000000` | Agent confirms, then calls `deleteOrder` |

Each conversation is identified by a `threadId` generated in the browser. Message history is stored in-memory on the backend via LangGraph `MemorySaver` — history is lost when the backend restarts.

The assistant renders its responses as formatted markdown: tables with SAP-blue headers, bold text, bullet lists, and inline code. Rendering uses `sap.ui.core.HTML` with inline styles (not `sap.m.FormattedText`, which strips table styling).

## Project Structure

```
sales-clerk-agent/
├── backend/
│   ├── src/
│   │   ├── server.ts              # Express app, /chat + /health endpoints
│   │   ├── agent/
│   │   │   ├── graph.ts           # LangGraph StateGraph (agent ↔ tools loop)
│   │   │   └── systemPrompt.ts    # Agent persona and guidelines
│   │   ├── auth/
│   │   │   └── middleware.ts      # XSUAA JWT verification
│   │   ├── odata/
│   │   │   └── client.ts          # SAP Cloud SDK OData client setup
│   │   ├── tools/                 # LangChain tools (one file per operation)
│   │   │   ├── index.ts
│   │   │   ├── getOrders.ts
│   │   │   ├── getOrderByKey.ts
│   │   │   ├── createOrder.ts
│   │   │   ├── updateOrderHeader.ts
│   │   │   ├── updateOrderItem.ts
│   │   │   └── deleteOrder.ts
│   │   └── services/              # Generated SAP Cloud SDK OData typed client
│   │       └── CE_SALESORDER_0001/
│   ├── manifest.yml               # CF push config (nodejs_buildpack, 512M)
│   ├── .env.example               # Local dev environment template
│   └── package.json
└── frontend/
    ├── webapp/                    # SAPUI5 TypeScript source
    ├── dist/                      # Built output (generated by npm run build)
    ├── xs-app.json                # Approuter routing: XSUAA auth, /resources/ → UI5 CDN, /chat → backend, /* → dist/
    ├── manifest.yml               # CF push config (nodejs_buildpack, 128M)
    ├── ui5.yaml                   # UI5 tooling config + dev proxy middleware
    ├── .cfignore                  # Excludes node_modules/, webapp/ from CF upload
    └── package.json
```

## Key Dependencies

**Backend:**
- `@sap-ai-sdk/langchain` — `OrchestrationClient` routing LLM calls through SAP AI Core
- `@langchain/langgraph` — agent loop with tool-calling and in-memory thread history
- `@sap-cloud-sdk/odata-v4` — typed OData client for S/4HANA
- `@sap/xssec` — XSUAA JWT validation

**Frontend:**
- `@sap/approuter` — CF entry point; enforces XSUAA login, proxies `/chat`, and serves UI5 CDN assets
- `ui5-middleware-simpleproxy` — local dev proxy for `/chat` → `localhost:3000`

## End User Documentation

See [`ENDUSER.md`](ENDUSER.md) for a non-technical guide covering the chat interface, available features, example requests, SAP terminology, and FAQ. A PDF version is available at [`ENDUSER.pdf`](ENDUSER.pdf).
