const OWNER = 'starzynhobr';
const MAX_PAGES = 5;
const REVALIDATE_SECONDS = 60 * 60;

/**
 * Aceita apenas repositórios do próprio owner para que o parâmetro público
 * não possa apontar a rota para qualquer endereço.
 */
const resolveRepo = (repoName) => {
    if (!repoName) return null;

    const full = repoName.includes('/') ? repoName : `${OWNER}/${repoName}`;
    const [owner, name] = full.split('/');

    if (owner !== OWNER) return null;
    if (!/^[A-Za-z0-9._-]+$/.test(name || '')) return null;

    return `${owner}/${name}`;
};

const stripTagPrefix = (tagName, tagPrefix) => {
    const value = tagPrefix && tagName.startsWith(tagPrefix)
        ? tagName.slice(tagPrefix.length)
        : tagName;

    return value.replace(/^v/i, '');
};

const parseVersion = (value) => value.split('.').map((part) => Number.parseInt(part, 10) || 0);

const isNewerVersion = (candidate, current) => {
    if (!current) return true;

    const next = parseVersion(candidate);
    const previous = parseVersion(current);

    for (let index = 0; index < Math.max(next.length, previous.length); index += 1) {
        const a = next[index] || 0;
        const b = previous[index] || 0;
        if (a !== b) return a > b;
    }

    return false;
};

/**
 * Percorre os releases do repositório. O token é opcional: sem ele a chamada
 * continua funcionando, mas com o limite menor da API pública do GitHub.
 */
const PLUGIN_TAG = /^([a-z0-9-]+)-v(\d+\.\d+\.\d+)$/i;

/**
 * Última release estável com o asset esperado. Usada tanto pelas rotas quanto
 * pelas páginas no build, para que a versão exibida não dependa de um valor
 * fixo que precise ser atualizado à mão a cada publicação.
 */
export async function findRelease({ repoName, tagPrefix = '', assetPattern }) {
    const repo = resolveRepo(repoName);
    if (!repo || !assetPattern) return null;

    let assetRegex;
    try {
        assetRegex = new RegExp(assetPattern, 'i');
    } catch {
        return null;
    }

    let found = null;

    await fetchReleasePages(repo, (releases) => {
        const release = releases.find((item) => (
            !item.draft
            && !item.prerelease
            && item.tag_name?.startsWith(tagPrefix)
            && item.assets?.some((asset) => assetRegex.test(asset.name))
        ));

        if (!release) return false;

        const asset = release.assets.find((item) => assetRegex.test(item.name));
        found = {
            tagName: release.tag_name,
            version: stripTagPrefix(release.tag_name, tagPrefix),
            downloadUrl: asset.browser_download_url,
            releaseUrl: release.html_url,
        };

        return true;
    });

    return found;
}

/** Versão mais recente de cada plugin publicado no repositório de releases. */
export async function findPluginVersions(repoName) {
    const repo = resolveRepo(repoName);
    if (!repo) return null;

    const versions = {};

    await fetchReleasePages(repo, (releases) => {
        releases.forEach((release) => {
            if (release.draft) return;

            const match = PLUGIN_TAG.exec(release.tag_name || '');
            if (!match) return;

            const [, id, version] = match;
            const hasPackage = release.assets?.some((asset) => /\.stz-plugin$/i.test(asset.name));
            if (!hasPackage) return;

            if (isNewerVersion(version, versions[id]?.version)) {
                versions[id] = { version, releaseUrl: release.html_url };
            }
        });

        return false;
    });

    return versions;
}

async function fetchReleasePages(repo, onPage) {
    const headers = { Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    for (let page = 1; page <= MAX_PAGES; page += 1) {
        const response = await fetch(
            `https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`,
            { headers, next: { revalidate: REVALIDATE_SECONDS } }
        );

        if (!response.ok) return false;

        const releases = await response.json();
        if (!Array.isArray(releases)) return false;

        const shouldStop = onPage(releases);
        if (shouldStop || releases.length < 100) return true;
    }

    return true;
}
