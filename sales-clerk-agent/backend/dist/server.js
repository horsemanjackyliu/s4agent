"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xsenv_1 = __importDefault(require("@sap/xsenv"));
xsenv_1.default.loadEnv();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const graph_1 = require("./agent/graph");
const middleware_1 = require("./auth/middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check (no auth)
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
// Lightweight XSUAA token verification middleware
async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Missing or invalid Authorization header' });
        return;
    }
    try {
        // In production (CF), XSUAA is available; skip validation locally if no VCAP_SERVICES
        const vcapServices = process.env.VCAP_SERVICES;
        if (vcapServices && vcapServices !== '{}') {
            const token = authHeader.substring(7);
            await (0, middleware_1.verifyXsuaaToken)(token);
        }
        next();
    }
    catch (err) {
        res.status(401).json({ error: `Token verification failed: ${err.message}` });
    }
}
// Chat endpoint
app.post('/chat', requireAuth, async (req, res) => {
    const { message, threadId } = req.body;
    if (!message || !threadId) {
        res.status(400).json({ error: 'message and threadId are required' });
        return;
    }
    try {
        const reply = await (0, graph_1.invokeAgent)(message, threadId);
        res.json({ reply });
    }
    catch (err) {
        // Unwrap cause chain so destination/auth errors are visible in the response
        const cause = err.cause?.message ?? err.cause ?? '';
        const detail = cause ? `${err.message} — Caused by: ${cause}` : err.message;
        console.error('Agent error:', detail);
        res.status(500).json({ error: `Agent error: ${detail}` });
    }
});
const port = parseInt(process.env.PORT ?? '3000');
app.listen(port, () => {
    console.log(`Sales Clerk Agent backend listening on port ${port}`);
});
