import xsenv from '@sap/xsenv';
xsenv.loadEnv();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { invokeAgent } from './agent/graph';
import { verifyXsuaaToken } from './auth/middleware';

const app = express();
app.use(cors());
app.use(express.json());

// Health check (no auth)
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
});

// Lightweight XSUAA token verification middleware
async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
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
            await verifyXsuaaToken(token);
        }
        next();
    } catch (err: any) {
        res.status(401).json({ error: `Token verification failed: ${err.message}` });
    }
}

// Chat endpoint
app.post('/chat', requireAuth, async (req: Request, res: Response): Promise<void> => {
    const { message, threadId } = req.body as { message?: string; threadId?: string };
    if (!message || !threadId) {
        res.status(400).json({ error: 'message and threadId are required' });
        return;
    }
    try {
        const reply = await invokeAgent(message, threadId);
        res.json({ reply });
    } catch (err: any) {
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
