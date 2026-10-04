import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { isRedisConfigured, redisPipeline } from './redis';
import { notifyTelegram } from './telegram';
import { notifyDiscord } from './discord';
import { isLocale } from './i18n';

/** Envios por IP a cada hora, por tipo. */
const RATE_LIMITS = { like: 3, vote: 3, suggestion: 3 };
const RATE_WINDOW_SECONDS = 3600;
const SUGGESTIONS_KEPT = 1000;
const MAX_BODY_BYTES = 8192;

async function readPayload(request) {
    if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) throw new Error('too_large');
    if (!request.body) throw new Error('invalid');
    const reader = request.body.getReader();
    const chunks = [];
    let size = 0;
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > MAX_BODY_BYTES) {
                await reader.cancel();
                throw new Error('too_large');
            }
            chunks.push(value);
        }
    } finally {
        reader.releaseLock();
    }
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('invalid');
    return body;
}

function isAllowedOrigin(request) {
    const origin = request.headers.get('origin');
    // Clientes desktop não enviam Origin; continuam sujeitos ao rate limit.
    if (!origin) return true;
    const allowed = (process.env.FEEDBACK_ALLOWED_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean);
    return origin === new URL(request.url).origin || allowed.includes(origin);
}

const json = (body, status = 200) => NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
});

const cleanText = (value) => String(value || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();

/**
 * Rota de feedback anônimo de um projeto: curtida, enquete e sugestão.
 * Contagens ficam no Upstash sob `<prefix>:*`; sugestões avisam os canais configurados.
 *
 * @param {{ prefix: string, name: string, pollOptions: string[], suggestionLength: { min: number, max: number } }} config
 */
export function createFeedbackRoute(config) {
    const { prefix, name, pollOptions, suggestionLength, clientHashPrefix = prefix } = config;
    const keys = {
        likes: `${prefix}:likes`,
        votes: `${prefix}:votes`,
        suggestions: `${prefix}:suggestions`,
    };

    async function readCounts() {
        const [likes, votes] = await redisPipeline([
            ['GET', keys.likes],
            ['HGETALL', keys.votes],
        ]);

        // HGETALL chega como lista plana [campo, valor, ...].
        const voteMap = {};
        for (let i = 0; i < (votes || []).length; i += 2) {
            voteMap[votes[i]] = Number(votes[i + 1]) || 0;
        }

        return {
            likes: Number(likes) || 0,
            votes: Object.fromEntries(pollOptions.map((id) => [id, voteMap[id] || 0])),
        };
    }

    /** O IP vira hash: o limite funciona sem guardar o endereço de ninguém. */
    const clientKey = (request) => {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
            || request.headers.get('x-real-ip')
            || 'unknown';
        return createHash('sha256').update(`${clientHashPrefix}:${ip}`).digest('hex').slice(0, 32);
    };

    async function isRateLimited(request, type) {
        const key = `${prefix}:rl:${type}:${clientKey(request)}`;
        const [count] = await redisPipeline([
            ['INCR', key],
            ['EXPIRE', key, RATE_WINDOW_SECONDS, 'NX'],
        ]);
        return count > RATE_LIMITS[type];
    }

    async function GET() {
        if (!isRedisConfigured()) return json({ error: 'unavailable' }, 503);

        try {
            return json(await readCounts());
        } catch {
            return json({ error: 'unavailable' }, 503);
        }
    }

    async function POST(request) {
        if (!isAllowedOrigin(request)) return json({ error: 'forbidden' }, 403);
        if (!isRedisConfigured()) return json({ error: 'unavailable' }, 503);

        let body;
        try {
            body = await readPayload(request);
        } catch (error) {
            return json({ error: 'invalid' }, error.message === 'too_large' ? 413 : 400);
        }

        const { type, option, text, website, locale } = body || {};

        // Honeypot: campo invisível que só robôs preenchem. Finge sucesso.
        if (website) return json({ ok: true });

        if (typeof type !== 'string' || !Object.hasOwn(RATE_LIMITS, type)) return json({ error: 'invalid' }, 400);
        if (type === 'vote' && !pollOptions.includes(option)) return json({ error: 'invalid' }, 400);

        if (type === 'suggestion' && typeof text !== 'string') return json({ error: 'invalid' }, 400);
        const suggestion = type === 'suggestion' ? cleanText(text) : '';
        if (type === 'suggestion' && (suggestion.length < suggestionLength.min || suggestion.length > suggestionLength.max)) {
            return json({ error: 'invalid' }, 400);
        }

        try {
            if (await isRateLimited(request, type)) return json({ error: 'rate_limited' }, 429);

            if (type === 'like') {
                await redisPipeline([['INCR', keys.likes]]);
            } else if (type === 'vote') {
                await redisPipeline([['HINCRBY', keys.votes, option, 1]]);
            } else {
                const at = new Date().toISOString();
                const validLocale = isLocale(locale) ? locale : null;
                const entry = JSON.stringify({ text: suggestion, at, ...(validLocale ? { locale: validLocale } : {}) });
                await redisPipeline([
                    ['LPUSH', keys.suggestions, entry],
                    ['LTRIM', keys.suggestions, 0, SUGGESTIONS_KEPT - 1],
                ]);
                await Promise.all([
                    notifyDiscord({ project: config, text: suggestion, locale: validLocale, at }),
                    notifyTelegram({
                        title: `💡 Nova sugestão — ${name}`,
                        body: suggestion,
                        footer: validLocale ? validLocale.toUpperCase() : null,
                    }),
                ]);
            }

            return json({ ok: true, ...(type === 'suggestion' ? {} : await readCounts()) });
        } catch {
            return json({ error: 'unavailable' }, 503);
        }
    }

    return { GET, POST };
}
