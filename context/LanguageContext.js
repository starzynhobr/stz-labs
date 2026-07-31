"use client";

import { createContext, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import pt from '../dictionaries/pt.json';
import en from '../dictionaries/en.json';
import fr from '../dictionaries/fr.json';
import de from '../dictionaries/de.json';
import it from '../dictionaries/it.json';
import es from '../dictionaries/es.json';
import { DEFAULT_LOCALE, isLocale, localeFromPathname } from '../lib/i18n';
import { localizePath } from '../lib/localizePath';

const dictionaries = { pt, en, fr, de, it, es };

const LanguageContext = createContext({
    lang: DEFAULT_LOCALE,
    setLang: () => {},
    t: (key) => key,
});

const getNestedValue = (obj, key) => {
    if (!key) return null;
    return key.split('.').reduce((acc, part) => (acc ? acc[part] : null), obj);
};

/**
 * O idioma vem da URL, não do armazenamento: a rota é a fonte da verdade, então
 * um link compartilhado abre no idioma certo e cada versão é indexável.
 */
export function LanguageProvider({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const lang = localeFromPathname(pathname);

    useEffect(() => {
        try {
            window.localStorage.setItem('lang', lang);
        } catch {
            // A preferência só orienta o redirecionamento da raiz; perdê-la é inofensivo.
        }
    }, [lang]);

    const setLang = (value) => {
        if (!isLocale(value) || value === lang) return;
        router.push(localizePath(pathname, value));
    };

    const dictionary = dictionaries[lang] || dictionaries[DEFAULT_LOCALE];
    const t = (key) => getNestedValue(dictionary, key) || key;

    return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    return useContext(LanguageContext);
}
