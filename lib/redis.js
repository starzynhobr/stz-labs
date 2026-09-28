/**
 * Cliente mínimo da API REST do Upstash Redis — sem dependência extra.
 * A integração da Vercel cria KV_REST_API_*; o Upstash direto usa UPSTASH_REDIS_REST_*.
 */
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const isRedisConfigured = () => Boolean(REDIS_URL && REDIS_TOKEN);

/** Executa vários comandos numa ida só; devolve os resultados na mesma ordem. */
export async function redisPipeline(commands) {
    const response = await fetch(`${REDIS_URL}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(commands),
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Redis ${response.status}`);
    }

    const results = await response.json();
    const failed = results.find((item) => item.error);
    if (failed) throw new Error(failed.error);

    return results.map((item) => item.result);
}
