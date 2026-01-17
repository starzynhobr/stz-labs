"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import pt from '../dictionaries/pt.json';
import en from '../dictionaries/en.json';
import fr from '../dictionaries/fr.json';
import de from '../dictionaries/de.json';
import it from '../dictionaries/it.json';
import es from '../dictionaries/es.json';

const dictionaries = { pt, en, fr, de, it, es };
const supportedLanguages = Object.keys(dictionaries);

const LanguageContext = createContext({
    lang: 'pt',
    setLang: () => {},
    t: (key) => key,
});

const getNestedValue = (obj, key) => {
    if (!key) return null;
    return key.split('.').reduce((acc, part) => (acc ? acc[part] : null), obj);
};

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState('pt');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const savedLang = window.localStorage.getItem('lang');
        const browserLang = navigator.language.split('-')[0];
        const initialLang = savedLang || (supportedLanguages.includes(browserLang) ? browserLang : 'pt');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState(initialLang);
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
        window.localStorage.setItem('lang', lang);
    }, [lang]);

    const setLang = (value) => {
        if (!value || !supportedLanguages.includes(value)) return;
        setLangState(value);
    };

    const dictionary = dictionaries[lang] || dictionaries.pt;
    const t = (key) => getNestedValue(dictionary, key) || key;

    return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    return useContext(LanguageContext);
}
