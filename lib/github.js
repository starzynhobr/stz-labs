const OWNER = 'starzynhobr';
const MAX_PAGES = 5;
const REVALIDATE_SECONDS = 60 * 60;

export const OWNER_NAME = OWNER;
export const RELEASE_CACHE_SECONDS = REVALIDATE_SECONDS;

/**
 * Aceita apenas repositórios do próprio owner para que o parâmetro público
 * não possa apontar a rota para qualquer endereço.
 */
export const resolveRepo = (repoName) => {
    if (!repoName) return null;

    const full = repoName.includes('/') ? repoName : `${OWNER}/${repoName}`;
    const [owner, name] = full.split('/');

    if (owner !== OWNER) return null;
    if (!/^[A-Za-z0-9._-]+$/.test(name || '')) return null;

    return `${owner}/${name}`;
};

export const stripTagPrefix = (tagName, tagPrefix) => {
    const value = tagPrefix && tagName.startsWith(tagPrefix)
        ? tagName.slice(tagPrefix.length)
        : tagName;

    return value.replace(/^v/i, '');
};

const parseVersion = (value) => value.split('.').map((part) => Number.parseInt(part, 10) || 0);

export const isNewerVersion = (candidate, current) => {
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
export async function fetchReleasePages(repo, onPage) {
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
