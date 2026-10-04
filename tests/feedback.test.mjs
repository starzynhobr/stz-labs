import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

// Rede e persistência são simuladas: nenhum token ou serviço real é acessado.
const commands = [];
const notifications = [];
const requests = [];
let rateCount = 1;
const context = vm.createContext({
    Buffer, URL, AbortSignal, console,
    process: { env: { DISCORD_FEEDBACK_STZ_PDF_SUITE_WEBHOOK_URL: 'https://discord.com/api/webhooks/123/test-token' } },
    fetch: async (url, options) => {
        requests.push({ url: String(url), payload: JSON.parse(options.body) });
        return { ok: false }; // Discord indisponível também deve preservar o sucesso.
    },
});
const stubs = {
    'node:crypto': { createHash },
    'next/server': { NextResponse: { json: (body, options) => Response.json(body, options) } },
    'redis': {
        isRedisConfigured: () => true,
        redisPipeline: async (batch) => {
            commands.push(...batch);
            if (batch[0][0] === 'GET') return [12, ['scheduler', '3']];
            return [rateCount];
        },
    },
    'telegram': { notifyTelegram: async (payload) => notifications.push(payload) },
    'i18n': { isLocale: (locale) => ['pt', 'en'].includes(locale) },
};
const cache = new Map();
async function load(path) {
    if (cache.has(path)) return cache.get(path);
    const sourceModule = new vm.SourceTextModule(await readFile(path, 'utf8'), { context, identifier: path });
    cache.set(path, sourceModule);
    await sourceModule.link(async (specifier, parent) => {
        const stub = stubs[specifier] || stubs[specifier.split('/').pop()];
        if (stub) return new vm.SyntheticModule(Object.keys(stub), function () {
            for (const [key, value] of Object.entries(stub)) this.setExport(key, value);
        }, { context });
        return load(resolve(dirname(parent.identifier), `${specifier}.js`));
    });
    return sourceModule;
}
const feedback = await load(resolve('lib/feedback.js'));
const projects = await load(resolve('lib/feedbackProjects.js'));
await feedback.evaluate();
await projects.evaluate();
const { getFeedbackProject } = projects.namespace;
const route = feedback.namespace.createFeedbackRoute(getFeedbackProject('stz-pdf-suite'));
const request = (payload, headers = {}) => new Request('https://stzlabs.com/api/feedback/stz-pdf-suite', {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(payload),
});
assert.equal(getFeedbackProject('__proto__'), null);
assert.equal(getFeedbackProject('unknown'), null);
assert.equal(getFeedbackProject('stz-gym').prefix, 'gym');
assert.equal(getFeedbackProject('stz-gym').clientHashPrefix, 'stz-gym');
assert.equal(getFeedbackProject('stz-downloader').prefix, 'downloader');
assert.equal((await route.POST(request({ type: 'vote', option: 'invented' }))).status, 400);
assert.equal((await route.POST(request({ type: 'suggestion', text: {} }))).status, 400);
assert.equal((await route.POST(request({ type: 'like' }, { Origin: 'https://spam.example' }))).status, 403);
assert.equal((await route.POST(request({ type: 'like', padding: 'x'.repeat(9000) }))).status, 413);
assert.equal((await route.POST(request({ type: 'suggestion', website: 'bot' }))).status, 200);
assert.equal(commands.length, 0);
const response = await route.POST(request({ type: 'suggestion', text: '  Uma sugestão @everyone  ', locale: 'pt' }));
assert.equal(response.status, 200);
const saved = JSON.parse(commands.find((command) => command[0] === 'LPUSH')[2]);
assert.equal(saved.text, 'Uma sugestão @everyone');
assert.equal(saved.locale, 'pt');
assert.equal(commands.find((command) => command[0] === 'LPUSH')[1], 'pdf-suite:suggestions');
assert.deepEqual(requests[0].payload.allowed_mentions, { parse: [] });
assert.equal(requests[0].payload.embeds[0].footer.text, 'stz-pdf-suite · PT');
assert.equal(notifications.length, 1);
rateCount = 4;
assert.equal((await route.POST(request({ type: 'like' }))).status, 429);
assert.equal(requests.length, 1);
const downloader = feedback.namespace.createFeedbackRoute(getFeedbackProject('stz-downloader'));
assert.equal((await downloader.POST(request({ type: 'vote', option: 'scheduler' }))).status, 429);
rateCount = 1;
assert.deepEqual(await (await downloader.GET()).json(), {
    likes: 12, votes: { scheduler: 3, torrent: 0, categories: 0, linux: 0 },
});
console.log('Feedback: contratos, isolamento, antiabuso e falha de Discord validados com mocks.');
