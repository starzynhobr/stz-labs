import { NextResponse } from 'next/server';
import { DEFAULT_LOCALE, isLocale } from './lib/i18n';

/** Caminhos que existiam antes do prefixo de idioma. */
const LEGACY_PREFIXES = ['/privacy', '/terms', '/support', '/projects'];
const LEGACY_EXACT = { '/mouse-tester': '/pt/mouse/teste-de-clique' };

/** Projetos renomeados: o endereço antigo continua indexado e precisa apontar para o novo. */
const PROJECT_SLUG_ALIASES = { 'mouse-click': 'stz-clicker' };
const PROJECT_PATH = /^(?:\/([a-z]{2}))?\/projects\/([^/]+)\/?$/;

const pickLocale = (header) => {
    const accepted = (header || '')
        .split(',')
        .map((part) => {
            const [tag, quality] = part.trim().split(';q=');
            return { tag: tag.split('-')[0].toLowerCase(), q: Number(quality ?? 1) };
        })
        .sort((a, b) => b.q - a.q);

    return accepted.find((item) => isLocale(item.tag))?.tag || DEFAULT_LOCALE;
};

export function proxy(request) {
    const { pathname } = request.nextUrl;

    const projectMatch = PROJECT_PATH.exec(pathname);
    if (projectMatch) {
        const [, maybeLocale, slug] = projectMatch;
        const alias = PROJECT_SLUG_ALIASES[slug];

        if (alias) {
            const locale = isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;
            return NextResponse.redirect(
                new URL(`/${locale}/projects/${alias}`, request.url),
                308
            );
        }
    }

    const exact = LEGACY_EXACT[pathname];
    if (exact) {
        return NextResponse.redirect(new URL(exact, request.url), 308);
    }

    // A raiz segue a preferência do navegador; as demais rotas antigas vão para
    // o idioma padrão, que é o canônico e mantém o redirecionamento cacheável.
    if (pathname === '/') {
        const locale = pickLocale(request.headers.get('accept-language'));
        return NextResponse.redirect(new URL(`/${locale}`, request.url), 307);
    }

    const isLegacy = LEGACY_PREFIXES.some(
        (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    );

    if (isLegacy) {
        return NextResponse.redirect(
            new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url),
            308
        );
    }

    // Qualquer outro caminho segue adiante: um idioma inexistente deve dar 404,
    // não virar um redirecionamento que só adia o 404.
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
