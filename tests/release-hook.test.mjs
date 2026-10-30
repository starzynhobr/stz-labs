import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import * as crypto from 'node:crypto';
import vm from 'node:vm';

// Rede simulada: nenhum webhook real é acessado.
const SECRET = 'test-secret';
const requests = [];
let discordOk = true;
const context = vm.createContext({
    Buffer, URL, AbortSignal, Response, Date,
    process: { env: {
        GITHUB_RELEASES_WEBHOOK_SECRET: SECRET,
        DISCORD_RELEASES_STZ_DOWNLOADER_WEBHOOK_URL: 'https://ptb.discord.com/api/webhooks/123/test-token',
    } },
    fetch: async (url, options) => {
        requests.push({ url: String(url), payload: JSON.parse(options.body) });
        return { ok: discordOk };
    },
});
const source = new vm.SourceTextModule(await readFile(resolve('lib/releaseHook.js'), 'utf8'), { context });
await source.link(async () => new vm.SyntheticModule(Object.keys(crypto), function () {
    for (const [key, value] of Object.entries(crypto)) this.setExport(key, value);
}, { context }));
await source.evaluate();
const { getReleaseRepo, verifySignature, formatNotes, handleReleaseHook } = source.namespace;

const sign = (body) => `sha256=${crypto.createHmac('sha256', SECRET).update(body).digest('hex')}`;
const hook = (payload, { event = 'release', signature } = {}) => {
    const body = JSON.stringify(payload);
    return handleReleaseHook(new Request('https://stzlabs.com/api/release-hook', {
        method: 'POST',
        headers: { 'x-github-event': event, 'x-hub-signature-256': signature ?? sign(body) },
        body,
    }));
};
const release = {
    tag_name: 'v0.2.3', html_url: 'https://github.com/starzynhobr/stz-downloader/releases/tag/v0.2.3',
    published_at: '2026-11-01T12:00:00Z', draft: false, prerelease: false,
    body: '## O que mudou\r\n\r\n- **Novo:** algo\r\n\r\nSHA-256 do instalador: `ABC`\r\n',
};
const published = { action: 'published', release, repository: { full_name: 'starzynhobr/stz-downloader' } };

assert.equal(getReleaseRepo('other/stz-downloader'), null);
assert.equal(getReleaseRepo('starzynhobr/__proto__'), null);
assert.equal(getReleaseRepo('starzynhobr/STZ-XML-Translator').slug, 'stz-xml-translator');
assert.equal(verifySignature('x', 'sha256=00', SECRET), false);
assert.equal(verifySignature('x', sign('x'), ''), false);
assert.equal(formatNotes(release.body), '**O que mudou**\n\n- **Novo:** algo');

assert.equal((await hook(published, { signature: 'sha256=bad' })).status, 401);
assert.deepEqual(await (await hook({}, { event: 'ping' })).json(), { ok: true });
assert.deepEqual(await (await hook({ ...published, action: 'created' })).json(), { ignored: 'action' });
assert.deepEqual(await (await hook({ ...published, release: { ...release, prerelease: true } })).json(), { ignored: 'action' });
assert.deepEqual(await (await hook({ ...published, repository: { full_name: 'starzynhobr/gf-ui-editor' } })).json(),
    { ignored: 'not_configured' });
assert.equal(requests.length, 0);

const ok = await hook(published);
assert.equal(ok.status, 200);
assert.equal(requests.length, 1);
assert.equal(requests[0].url, 'https://discord.com/api/webhooks/123/test-token?wait=true');
const [embed] = requests[0].payload.embeds;
assert.equal(embed.title, '📦 STZ Downloader 0.2.3');
assert.equal(embed.url, release.html_url);
assert.match(embed.description, /stzlabs\.com\/pt\/projects\/stz-downloader/);
assert.doesNotMatch(embed.description, /SHA-256/);
assert.equal(embed.footer.text, 'STZ Labs · 01/11/2026');
assert.deepEqual(requests[0].payload.allowed_mentions, { parse: [] });

discordOk = false;
assert.equal((await hook(published)).status, 502);

console.log('release-hook: ok');
