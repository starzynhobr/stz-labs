import { SITE_URL } from './site';
import { DEFAULT_LOCALE, HTML_LANG, LOCALES } from './i18n';

export const MOUSE_LOCALES = LOCALES;
export const DEFAULT_MOUSE_LOCALE = DEFAULT_LOCALE;

/**
 * Registro único das ferramentas. Os slugs são fixos por idioma — traduzir em
 * runtime mudaria a URL indexada a cada render.
 */
export const MOUSE_TOOLS = [
    {
        id: 'click',
        component: 'ClickTest',
        slugs: {
            pt: 'teste-de-clique',
            en: 'click-test',
            es: 'prueba-de-clic',
            fr: 'test-de-clic',
            de: 'klick-test',
            it: 'test-di-clic',
        },
        related: ['double-click', 'cps'],
        product: 'mouse-click',
    },
    {
        id: 'double-click',
        component: 'DoubleClickTest',
        slugs: {
            pt: 'double-click',
            en: 'double-click-test',
            es: 'doble-clic',
            fr: 'double-clic',
            de: 'doppelklick',
            it: 'doppio-clic',
        },
        related: ['click', 'cps'],
    },
    {
        id: 'cps',
        component: 'CpsTest',
        slugs: { pt: 'cps', en: 'cps', es: 'cps', fr: 'cps', de: 'cps', it: 'cps' },
        related: ['click', 'double-click'],
        product: 'mouse-click',
    },
    {
        id: 'scroll',
        component: 'ScrollTest',
        slugs: {
            pt: 'scroll',
            en: 'scroll-test',
            es: 'prueba-de-scroll',
            fr: 'test-de-defilement',
            de: 'scrolltest',
            it: 'test-di-scorrimento',
        },
        related: ['click', 'polling-rate'],
    },
    {
        id: 'polling-rate',
        component: 'PollingRateTest',
        slugs: {
            pt: 'taxa-de-atualizacao',
            en: 'polling-rate',
            es: 'tasa-de-sondeo',
            fr: 'frequence-interrogation',
            de: 'abtastrate',
            it: 'frequenza-di-polling',
        },
        related: ['scroll', 'cps'],
        product: 'stz-taskpulse',
    },
];

export const HUB_PATH = 'mouse';

export const getToolById = (id) => MOUSE_TOOLS.find((tool) => tool.id === id) || null;

export const getToolBySlug = (locale, slug) => (
    MOUSE_TOOLS.find((tool) => tool.slugs[locale] === slug) || null
);

export const toolPath = (locale, tool) => `/${locale}/${HUB_PATH}/${tool.slugs[locale]}`;

export const hubPath = (locale) => `/${locale}/${HUB_PATH}`;

/**
 * hreflang das duas versões da mesma ferramenta, mais o x-default. O Google
 * precisa dos pares para tratar as páginas como traduções, e não duplicatas.
 */
export const buildAlternates = (canonicalPath, pathByLocale) => ({
    canonical: `${SITE_URL}${canonicalPath}`,
    languages: {
        ...Object.fromEntries(
            MOUSE_LOCALES.map((locale) => [
                HTML_LANG[locale],
                `${SITE_URL}${pathByLocale[locale]}`,
            ])
        ),
        'x-default': `${SITE_URL}${pathByLocale[DEFAULT_MOUSE_LOCALE]}`,
    },
});

export const toolAlternates = (locale, tool) => buildAlternates(
    toolPath(locale, tool),
    Object.fromEntries(MOUSE_LOCALES.map((item) => [item, toolPath(item, tool)]))
);

export const hubAlternates = (locale) => buildAlternates(
    hubPath(locale),
    Object.fromEntries(MOUSE_LOCALES.map((item) => [item, hubPath(item)]))
);
