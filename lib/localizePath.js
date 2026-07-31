import { DEFAULT_LOCALE, isLocale, stripLocale } from './i18n';
import {
    HUB_PATH,
    MOUSE_LOCALES,
    getToolBySlug,
    hubPath,
    toolPath,
} from './mouseTools';

/**
 * Traduz o caminho atual para outro idioma.
 *
 * Slugs de projeto são iguais em todos os idiomas, então basta trocar o
 * prefixo. As ferramentas de mouse têm slug localizado — trocar só o prefixo
 * daria 404 —, então o par vem do registro de rotas. Como o cluster existe
 * apenas em PT e EN, os demais idiomas caem no EN.
 */
export function localizePath(pathname, targetLocale) {
    if (!isLocale(targetLocale)) return pathname;

    const segments = (pathname || '/').split('/').filter(Boolean);
    const currentLocale = isLocale(segments[0]) ? segments[0] : DEFAULT_LOCALE;

    if (segments[1] === HUB_PATH) {
        const mouseLocale = MOUSE_LOCALES.includes(targetLocale) ? targetLocale : 'en';
        const slug = segments[2];

        if (!slug) return hubPath(mouseLocale);

        const tool = getToolBySlug(currentLocale, slug);
        return tool ? toolPath(mouseLocale, tool) : hubPath(mouseLocale);
    }

    const rest = stripLocale(pathname);
    return rest === '/' ? `/${targetLocale}` : `/${targetLocale}${rest}`;
}
