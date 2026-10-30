import { projects } from '../data/projects';
import { siteUpdates } from '../data/siteUpdates';
import { listReleases } from './github';

/** Nome curto de cada projeto no histórico, pelo repositório das releases. */
const PROJECT_NAMES = {
    'gf-ui-editor': 'STZ GF UI',
    'gf-dashboard': 'GF Farmer',
    'stz-downloader': 'STZ Downloader',
    'STZ-XML-Translator': 'XML Translator',
    stzlyrics: 'STZ Lyrics',
    'stzlyrics-python': 'Lyrics Overlay',
    'stz-taskpulse': 'TaskPulse',
    'stz-csv-converter': 'CSV Converter',
    'stz-pdf-suite': 'PDF Suite',
    'stz-clicker': 'STZ Clicker',
    'stz-suite-releases': 'STZ Suite',
};

export const SITE_PROJECT = 'STZ Labs';

/**
 * Destaques de uma release: os títulos em negrito das notas ("- **Estados dos botões.** …"),
 * da seção no idioma pedido quando existe (as releases trazem português e inglês).
 */
const highlightsFor = (body, wantPortuguese) => {
    if (!body) return [];
    const sections = body.split(/^##\s+/m).slice(1);
    const pick = sections.find((section) => {
        const heading = section.split('\n', 1)[0].toLowerCase();
        const portuguese = /o que mudou|novidades|mudanças/.test(heading);
        return wantPortuguese ? portuguese : !portuguese;
    }) || sections[0] || body;
    return [...pick.matchAll(/^\s*[-*]\s+\*\*(.+?)\*\*/gm)]
        .map((match) => match[1].replace(/[.:]+$/, '').trim())
        .filter(Boolean)
        .slice(0, 3);
};

const versionOf = (tag) => (tag || '').replace(/^.*?-?v(?=\d)/i, '');

/**
 * Histórico do laboratório: as releases de todos os projetos mais as entregas do
 * portal. Cada entrada já traz os destaques nos dois idiomas das notas; a página
 * escolhe o do idioma atual.
 */
export async function loadChangelog() {
    const repos = [...new Set(projects.map((project) => project.repoName).filter((name) => PROJECT_NAMES[name]))];
    const slugByRepo = Object.fromEntries(
        projects.filter((project) => project.repoName && project.slug).map((project) => [project.repoName, project.slug])
    );

    const releaseLists = await Promise.all(repos.map((repo) => listReleases(repo).catch(() => [])));
    const entries = [];

    repos.forEach((repo, index) => {
        releaseLists[index].forEach((release) => {
            const date = release.published_at || release.created_at;
            if (!date) return;
            entries.push({
                id: `${repo}-${release.id}`,
                date: date.slice(0, 10),
                precision: 'day',
                project: PROJECT_NAMES[repo],
                slug: slugByRepo[repo] || null,
                title: release.name || `${PROJECT_NAMES[repo]} ${versionOf(release.tag_name)}`,
                url: release.html_url,
                highlights: {
                    pt: highlightsFor(release.body, true),
                    other: highlightsFor(release.body, false),
                },
            });
        });
    });

    siteUpdates.forEach((update) => {
        entries.push({
            id: `site-${update.month}`,
            date: `${update.month}-01`,
            precision: 'month',
            project: SITE_PROJECT,
            slug: null,
            title: null,
            text: update.text,
            url: null,
            highlights: null,
        });
    });

    return entries.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
