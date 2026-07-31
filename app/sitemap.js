import { projects } from '../data/projects';
import { MOUSE_LOCALES, MOUSE_TOOLS, hubPath, toolPath } from '../lib/mouseTools';
import { DEFAULT_LOCALE, HTML_LANG, LOCALES } from '../lib/i18n';

export const baseUrl = 'https://stzlabs.com';

const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/support', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

/** Cada rota declara suas irmãs para o Google parear as traduções. */
const siteLanguages = (path) => ({
    ...Object.fromEntries(
        LOCALES.map((locale) => [HTML_LANG[locale], `${baseUrl}/${locale}${path}`])
    ),
    'x-default': `${baseUrl}/${DEFAULT_LOCALE}${path}`,
});

export default function sitemap() {
    const lastModified = new Date();

    const projectRoutes = LOCALES.flatMap((locale) => (
        projects
            .filter((project) => project.slug && project.detail)
            .map((project) => ({
                url: `${baseUrl}/${locale}/projects/${project.slug}`,
                lastModified,
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: { languages: siteLanguages(`/projects/${project.slug}`) },
            }))
    ));

    // Cada rota de ferramenta declara suas irmãs em outros idiomas, para o
    // Google tratá-las como traduções em vez de páginas concorrentes.
    const languagesFor = (pathBuilder) => Object.fromEntries(
        MOUSE_LOCALES.map((locale) => [
            locale === 'pt' ? 'pt-BR' : 'en',
            `${baseUrl}${pathBuilder(locale)}`,
        ])
    );

    const mouseRoutes = MOUSE_LOCALES.flatMap((locale) => [
        {
            url: `${baseUrl}${hubPath(locale)}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
            alternates: { languages: languagesFor(hubPath) },
        },
        ...MOUSE_TOOLS.map((tool) => ({
            url: `${baseUrl}${toolPath(locale, tool)}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: { languages: languagesFor((item) => toolPath(item, tool)) },
        })),
    ]);

    return [
        ...LOCALES.flatMap((locale) => (
            staticRoutes.map(({ path, priority, changeFrequency }) => ({
                url: `${baseUrl}/${locale}${path}`,
                lastModified,
                changeFrequency,
                priority,
                alternates: { languages: siteLanguages(path) },
            }))
        )),
        ...mouseRoutes,
        ...projectRoutes,
    ];
}
