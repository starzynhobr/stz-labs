import { SITE_URL, SITE_NAME } from './structuredData';
import { toolPath, hubPath } from './mouseTools';

const publisher = {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
};

/** FAQPage é o que habilita o rich snippet de perguntas na busca. */
export function buildFaqLd(faq) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
            },
        })),
    };
}

export function buildToolAppLd(locale, tool, content) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: content.h1,
        url: `${SITE_URL}${toolPath(locale, tool)}`,
        description: content.description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
        publisher,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };
}

export function buildHubLd(locale, hub, tools, toolLabels) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: hub.h1,
        url: `${SITE_URL}${hubPath(locale)}`,
        description: hub.description,
        inLanguage: locale === 'pt' ? 'pt-BR' : 'en',
        publisher,
        hasPart: tools.map((tool) => ({
            '@type': 'WebApplication',
            name: toolLabels[tool.id],
            url: `${SITE_URL}${toolPath(locale, tool)}`,
            applicationCategory: 'UtilitiesApplication',
        })),
    };
}
