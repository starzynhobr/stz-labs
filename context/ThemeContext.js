"use client";

import { createContext, useContext, useEffect, useRef, useState } from 'react';

/**
 * Multi-Theme Architecture for STZ LABS
 * Supports Neon Core, Forge Grid, Aurora Glass, and Light Mode.
 * Handles smooth transitions and persistence.
 */
const ThemeContext = createContext({
    theme: 'light-mode',
    setTheme: () => {},
    themeList: [],
});

export const themes = ['neon-core', 'forge-grid', 'aurora-glass', 'light-mode'];

/** Tema oculto: não aparece no seletor, só é liberado pelo código Konami. */
export const EASTER_EGG_THEME = 'ember';
const selectableThemes = [...themes, EASTER_EGG_THEME];

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState('light-mode');
    const switchTimeoutRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const savedTheme = window.localStorage.getItem('theme');
        const initialTheme = selectableThemes.includes(savedTheme) ? savedTheme : 'light-mode';
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeState(initialTheme);
    }, []);

    useEffect(() => () => window.clearTimeout(switchTimeoutRef.current), []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    /**
     * Uma troca sempre interrompe a anterior: o clique nunca é descartado,
     * apenas reinicia a janela de transição.
     */
    const setTheme = (nextTheme) => {
        if (!selectableThemes.includes(nextTheme) || nextTheme === theme) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const root = document.documentElement;
        const prevTheme = theme;

        window.clearTimeout(switchTimeoutRef.current);
        setThemeState(nextTheme);

        if (prefersReducedMotion) {
            root.dataset.theme = nextTheme;
            root.removeAttribute('data-prev-theme');
            root.classList.remove('theme-switching');
            return;
        }

        root.dataset.prevTheme = prevTheme;
        root.dataset.theme = nextTheme;
        root.classList.add('theme-switching');

        // Transition duration fallback from CSS --theme-dur-base
        const base = getComputedStyle(root).getPropertyValue('--theme-dur-base') || '600ms';
        const toMs = (value) => {
            const parsed = parseFloat(value);
            if (isNaN(parsed)) return 600;
            return value.includes('ms') ? parsed : parsed * 1000;
        };
        const timeout = Math.max(toMs(base), 0);

        switchTimeoutRef.current = window.setTimeout(() => {
            root.removeAttribute('data-prev-theme');
            root.classList.remove('theme-switching');
        }, timeout);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeList: themes }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
