export const LOCALES = ['pt', 'en', 'es', 'fr', 'de', 'it'];
export const DEFAULT_LOCALE = 'pt';

/** Códigos usados em hreflang e no atributo lang do documento. */
export const HTML_LANG = {
    pt: 'pt-BR',
    en: 'en',
    es: 'es',
    fr: 'fr',
    de: 'de',
    it: 'it',
};

export const OG_LOCALE = {
    pt: 'pt_BR',
    en: 'en_US',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    it: 'it_IT',
};

export const isLocale = (value) => LOCALES.includes(value);

export const localeParams = () => LOCALES.map((locale) => ({ locale }));

/** Primeiro segmento da URL, quando for um idioma conhecido. */
export const localeFromPathname = (pathname) => {
    const segment = (pathname || '').split('/')[1];
    return isLocale(segment) ? segment : DEFAULT_LOCALE;
};

/** Caminho sem o prefixo de idioma — '/pt/support' vira '/support'. */
export const stripLocale = (pathname) => {
    const segments = (pathname || '/').split('/');
    if (isLocale(segments[1])) {
        segments.splice(1, 1);
    }
    const rest = segments.join('/');
    return rest === '' ? '/' : rest;
};
