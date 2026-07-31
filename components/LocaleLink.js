"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

/**
 * Link interno que carrega o idioma atual no caminho. Evita espalhar
 * `/${lang}` por dezenas de componentes.
 */
export default function LocaleLink({ href, children, ...props }) {
    const { lang } = useLanguage();
    const target = href.startsWith('/') ? `/${lang}${href === '/' ? '' : href}` : href;

    return <Link href={target} {...props}>{children}</Link>;
}
