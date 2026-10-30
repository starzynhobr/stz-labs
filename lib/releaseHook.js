import { createHmac, timingSafeEqual } from 'node:crypto';

// Repositórios aceitos são explícitos: o nome do canal nunca vem do payload.
const REPOS = {
    'gf-ui-editor': {
        name: 'GF UI Editor', emoji: '🎨', slug: 'gf-ui-editor',
        discordEnv: 'DISCORD_RELEASES_GF_UI_EDITOR_WEBHOOK_URL',
    },
    'stz-downloader': {
        name: 'STZ Downloader', emoji: '📦', slug: 'stz-downloader',
        discordEnv: 'DISCORD_RELEASES_STZ_DOWNLOADER_WEBHOOK_URL',
    },
    'STZ-XML-Translator': {
        name: 'STZ XML Translator', emoji: '🌐', slug: 'stz-xml-translator',
        discordEnv: 'DISCORD_RELEASES_STZ_XML_TRANSLATOR_WEBHOOK_URL',
    },
    'stz-pdf-suite': {
        name: 'STZ PDF Suite', emoji: '📄', slug: 'stz-pdf-suite',
        discordEnv: 'DISCORD_RELEASES_STZ_PDF_SUITE_WEBHOOK_URL',
    },
    'gym-app': {
        name: 'STZ Gym', emoji: '🏋️', slug: 'stz-gym',
        discordEnv: 'DISCORD_RELEASES_STZ_GYM_WEBHOOK_URL',
    },
};

const OWNER = 'starzynhobr';
const COLOR = 0xff6a00;
const ICON = 'https://stzlabs.com/icon.png';
const DESCRIPTION_LIMIT = 4096;

export function getReleaseRepo(fullName) {
    const [owner, name] = String(fullName || '').split('/');
    if (owner !== OWNER || !Object.hasOwn(REPOS, name)) return null;
    return { ...REPOS[name], repo: name };
}

/** Compara a assinatura `sha256=` do GitHub em tempo constante. */
export function verifySignature(rawBody, header, secret) {
    if (!secret || typeof header !== 'string' || !header.startsWith('sha256=')) return false;
    const expected = Buffer.from(`sha256=${createHmac('sha256', secret).update(rawBody).digest('hex')}`);
    const received = Buffer.from(header);
    return expected.length === received.length && timingSafeEqual(expected, received);
}

/**
 * Notas do GitHub em Markdown do Discord: títulos viram negrito, hashes e
 * instruções do instalador saem (o card já leva ao download).
 */
export function formatNotes(body) {
    const lines = String(body || '').replace(/\r\n/g, '\n').split('\n')
        .filter((line) => !/sha-?256|SHA256SUMS|^\s*baixe o instalador|^\s*download the .*installer/i.test(line))
        .map((line) => line.replace(/^#{1,6}\s+(.+?)\s*$/, '**$1**'));
    const text = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    return text.length > DESCRIPTION_LIMIT - 200
        ? `${text.slice(0, DESCRIPTION_LIMIT - 201).trimEnd()}…`
        : text;
}

const formatDate = (value) => new Date(value).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

export function buildReleaseEmbed(project, release) {
    const version = String(release.tag_name || '').replace(/^.*?v(?=\d)/i, '');
    const download = `https://stzlabs.com/pt/projects/${project.slug}`;
    const notes = formatNotes(release.body) || '—';
    return {
        title: `${project.emoji} ${project.name} ${version}`.trim(),
        url: release.html_url,
        color: COLOR,
        thumbnail: { url: ICON },
        description: `${notes}\n\n⬇️ [Baixar / Download](${download})`,
        footer: { text: `STZ Labs · ${formatDate(release.published_at || release.created_at || Date.now())}` },
    };
}

const isDiscordWebhook = (value) => {
    try {
        const url = new URL(value);
        // O cliente PTB/Canary copia a URL com o próprio subdomínio; a API é a mesma.
        return url.protocol === 'https:' && /^(?:(?:ptb|canary)\.)?discord\.com$/.test(url.hostname)
            && /^\/api\/webhooks\/\d+\/[\w-]+$/.test(url.pathname);
    } catch {
        return false;
    }
};

const reply = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

/** Recebe o webhook `release` do GitHub e publica a release no canal de patch-notes. */
export async function handleReleaseHook(request) {
    const raw = await request.text();
    if (!verifySignature(raw, request.headers.get('x-hub-signature-256'), process.env.GITHUB_RELEASES_WEBHOOK_SECRET)) {
        return reply({ error: 'invalid_signature' }, 401);
    }

    const event = request.headers.get('x-github-event');
    if (event === 'ping') return reply({ ok: true });
    if (event !== 'release') return reply({ ignored: 'event' });

    let payload;
    try {
        payload = JSON.parse(raw);
    } catch {
        return reply({ error: 'invalid_json' }, 400);
    }

    const { action, release, repository } = payload || {};
    if (action !== 'published' || !release || release.draft || release.prerelease) return reply({ ignored: 'action' });

    const project = getReleaseRepo(repository?.full_name);
    if (!project) return reply({ ignored: 'repository' });

    const webhook = process.env[project.discordEnv];
    if (!webhook || !isDiscordWebhook(webhook)) return reply({ ignored: 'not_configured' });

    const url = new URL(webhook);
    url.hostname = 'discord.com';
    url.search = '';
    url.searchParams.set('wait', 'true');
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: 'STZ Labs',
            avatar_url: ICON,
            allowed_mentions: { parse: [] },
            embeds: [buildReleaseEmbed(project, release)],
        }),
        signal: AbortSignal.timeout(8000),
        redirect: 'error',
    }).catch(() => null);

    // 502 faz o GitHub marcar a entrega como falha, e ela pode ser reenviada pelo painel.
    if (!response?.ok) return reply({ error: 'discord_unavailable' }, 502);
    return reply({ ok: true });
}
