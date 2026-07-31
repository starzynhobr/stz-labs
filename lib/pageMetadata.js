import { SITE_URL } from './site';
import { DEFAULT_LOCALE, LOCALES, HTML_LANG, OG_LOCALE } from './i18n';
import { pageMeta } from '../content/meta/pages';
import { projectMeta } from '../content/meta/projects';

/** Canonical do próprio idioma mais os irmãos, para o Google parear as versões. */
export function localeAlternates(locale, path = '') {
    const url = (item) => `${SITE_URL}/${item}${path}`;

    return {
        canonical: url(locale),
        languages: {
            ...Object.fromEntries(LOCALES.map((item) => [HTML_LANG[item], url(item)])),
            'x-default': url(DEFAULT_LOCALE),
        },
    };
}

const withOpenGraph = (locale, { title, description, ogDescription }, alternates) => ({
    title,
    description,
    alternates,
    openGraph: {
        title,
        description: ogDescription || description,
        type: 'website',
        locale: OG_LOCALE[locale],
        images: ['/og-image.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description: ogDescription || description,
        images: ['/og-image.png'],
    },
});

export function buildPageMetadata(pageKey, locale, path = '') {
    const entry = pageMeta[pageKey]?.[locale] || pageMeta[pageKey]?.[DEFAULT_LOCALE];
    if (!entry) return {};

    return withOpenGraph(locale, entry, localeAlternates(locale, path));
}

export function buildProjectMetadata(slug, locale) {
    const entry = projectMeta[slug]?.[locale] || projectMeta[slug]?.[DEFAULT_LOCALE];
    if (!entry) return {};

    return withOpenGraph(locale, entry, localeAlternates(locale, `/projects/${slug}`));
}

export const getProjectMetaEntry = (slug, locale) => (
    projectMeta[slug]?.[locale] || projectMeta[slug]?.[DEFAULT_LOCALE] || null
);
