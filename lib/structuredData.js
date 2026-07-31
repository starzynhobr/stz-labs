import { DEFAULT_LOCALE, HTML_LANG } from './i18n';
import { getProjectMetaEntry } from './pageMetadata';
import { SITE_URL, SITE_NAME } from './site';

export { SITE_URL, SITE_NAME } from './site';

const publisher = {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
};

/** Só declara a versão quando ela é conhecida no build; a maioria é resolvida em runtime. */
const readVersion = (project) => {
    const fromBadge = /^v?(\d+\.\d+\.\d+)$/i.exec(project.badgeLabel || '');
    if (fromBadge) return fromBadge[1];

    const fromTag = /(\d+\.\d+\.\d+)$/.exec(project.releaseFallbackTag || '');
    return fromTag ? fromTag[1] : null;
};

export function buildSoftwareApplicationLd(project, release = null, locale = DEFAULT_LOCALE) {
    const entry = getProjectMetaEntry(project.slug, locale) || project.detail.meta;
    const name = project.detail.meta.title.replace(/\s*\|\s*STZ LABS\s*$/, '').trim();
    const version = release?.version || readVersion(project);

    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name,
        url: `${SITE_URL}/${locale}/projects/${project.slug}`,
        description: entry.description,
        inLanguage: HTML_LANG[locale],
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Windows',
        image: `${SITE_URL}/og-image.png`,
        publisher,
        author: publisher,
        ...(version ? { softwareVersion: version } : {}),
        ...(release?.downloadUrl || project.downloadHref
            ? { downloadUrl: release?.downloadUrl || project.downloadHref }
            : {}),
        ...(project.repoName
            ? { codeRepository: `https://github.com/starzynhobr/${project.repoName}` }
            : {}),
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };
}

export function buildSiteLd() {
    return [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/icon.png`,
            sameAs: ['https://github.com/starzynhobr'],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
        },
    ];
}

/** Evita que um "</script>" vindo dos dados feche a tag antes da hora. */
const serialize = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

export function JsonLd({ data }) {
    const payload = Array.isArray(data) ? data : [data];

    return payload.map((item, index) => (
        <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serialize(item) }}
        />
    ));
}
