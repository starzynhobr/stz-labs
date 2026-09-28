import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { isRedisConfigured, redisPipeline } from '../../../lib/redis';
import { GYM_POLL_OPTIONS } from '../../../data/stzGym';

export const dynamic = 'force-dynamic';

const KEYS = {
    likes: 'gym:likes',
    votes: 'gym:votes',
    suggestions: 'gym:suggestions',
};

/** Envios por IP a cada hora, por tipo. */
const RATE_LIMITS = { like: 3, vote: 3, suggestion: 3 };
const RATE_WINDOW_SECONDS = 3600;
const SUGGESTION_MIN = 3;
const SUGGESTION_MAX = 500;
const SUGGESTIONS_KEPT = 1000;

const json = (body, status = 200) => NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
});

async function readCounts() {
    const [likes, votes] = await redisPipeline([
        ['GET', KEYS.likes],
        ['HGETALL', KEYS.votes],
    ]);

    // HGETALL chega como lista plana [campo, valor, ...].
    const voteMap = {};
    for (let i = 0; i < (votes || []).length; i += 2) {
        voteMap[votes[i]] = Number(votes[i + 1]) || 0;
    }

    return {
        likes: Number(likes) || 0,
        votes: Object.fromEntries(GYM_POLL_OPTIONS.map((id) => [id, voteMap[id] || 0])),
    };
}

/** O IP vira hash: o limite funciona sem guardar o endereço de ninguém. */
const clientKey = (request) => {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
        || request.headers.get('x-real-ip')
        || 'unknown';
    return createHash('sha256').update(`stz-gym:${ip}`).digest('hex').slice(0, 32);
};

async function isRateLimited(request, type) {
    const key = `gym:rl:${type}:${clientKey(request)}`;
    const [count] = await redisPipeline([
        ['INCR', key],
        ['EXPIRE', key, RATE_WINDOW_SECONDS, 'NX'],
    ]);
    return count > RATE_LIMITS[type];
}

const cleanText = (value) => String(value || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();

export async function GET() {
    if (!isRedisConfigured()) return json({ error: 'unavailable' }, 503);

    try {
        return json(await readCounts());
    } catch {
        return json({ error: 'unavailable' }, 503);
    }
}

export async function POST(request) {
    if (!isRedisConfigured()) return json({ error: 'unavailable' }, 503);

    let body;
    try {
        body = await request.json();
    } catch {
        return json({ error: 'invalid' }, 400);
    }

    const { type, option, text, website } = body || {};

    // Honeypot: campo invisível que só robôs preenchem. Finge sucesso.
    if (website) return json({ ok: true });

    if (!Object.hasOwn(RATE_LIMITS, type)) return json({ error: 'invalid' }, 400);
    if (type === 'vote' && !GYM_POLL_OPTIONS.includes(option)) return json({ error: 'invalid' }, 400);

    const suggestion = type === 'suggestion' ? cleanText(text) : '';
    if (type === 'suggestion' && (suggestion.length < SUGGESTION_MIN || suggestion.length > SUGGESTION_MAX)) {
        return json({ error: 'invalid' }, 400);
    }

    try {
        if (await isRateLimited(request, type)) return json({ error: 'rate_limited' }, 429);

        if (type === 'like') {
            await redisPipeline([['INCR', KEYS.likes]]);
        } else if (type === 'vote') {
            await redisPipeline([['HINCRBY', KEYS.votes, option, 1]]);
        } else {
            const entry = JSON.stringify({ text: suggestion, at: new Date().toISOString() });
            await redisPipeline([
                ['LPUSH', KEYS.suggestions, entry],
                ['LTRIM', KEYS.suggestions, 0, SUGGESTIONS_KEPT - 1],
            ]);
        }

        return json({ ok: true, ...(type === 'suggestion' ? {} : await readCounts()) });
    } catch {
        return json({ error: 'unavailable' }, 503);
    }
}
