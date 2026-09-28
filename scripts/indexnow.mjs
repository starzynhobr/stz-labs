/**
 * Avisa os buscadores do IndexNow (Bing, Yandex, Seznam, Naver) sobre as URLs
 * do sitemap. Roda depois do deploy de produção — ver .github/workflows/indexnow.yml.
 *
 * Uso: node scripts/indexnow.mjs [--dry-run]
 */
const SITE = 'https://stzlabs.com';
const HOST = 'stzlabs.com';
// A chave é pública por natureza: o arquivo public/<chave>.txt prova que o site é nosso.
const KEY = 'a75df408bd92e4ed3325f9cd9f526e9b';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const dryRun = process.argv.includes('--dry-run');

async function sitemapUrls() {
    const response = await fetch(`${SITE}/sitemap.xml`);
    if (!response.ok) throw new Error(`sitemap.xml respondeu ${response.status}`);

    const xml = await response.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
    return [...new Set(urls)].filter((url) => url.startsWith(SITE));
}

const urlList = await sitemapUrls();
console.log(`${urlList.length} URLs no sitemap.`);

if (dryRun) {
    console.log(urlList.join('\n'));
    process.exit(0);
}

const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});

// 200 = recebido; 202 = recebido, chave ainda em validação.
console.log(`IndexNow respondeu ${response.status} ${response.statusText}`);
if (![200, 202].includes(response.status)) {
    console.error(await response.text());
    process.exit(1);
}
