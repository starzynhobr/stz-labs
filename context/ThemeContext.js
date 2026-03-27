"use client";

import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Multi-Theme Architecture for STZ LABS
 * Supports Neon Core, Forge Grid, Aurora Glass, and Light Mode.
 * Handles smooth transitions and persistence.
 */
const ThemeContext = createContext({
    theme: 'neon-core',
    setTheme: () => {},
    themeList: [],
});

export const themes = ['neon-core', 'forge-grid', 'aurora-glass', 'light-mode'];

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState('neon-core');
    const [isSwitching, setIsSwitching] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const savedTheme = window.localStorage.getItem('theme');
        const initialTheme = themes.includes(savedTheme) ? savedTheme : 'neon-core';
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeState(initialTheme);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const setTheme = (nextTheme) => {
        if (!themes.includes(nextTheme) || nextTheme === theme || isSwitching) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const root = document.documentElement;
        const prevTheme = theme;

        if (prefersReducedMotion) {
            root.dataset.theme = nextTheme;
            root.removeAttribute('data-prev-theme');
            root.classList.remove('theme-switching');
            setThemeState(nextTheme);
            return;
        }

        setIsSwitching(true);
        root.dataset.prevTheme = prevTheme;
        root.dataset.theme = nextTheme;
        root.classList.add('theme-switching');
        setThemeState(nextTheme);

        // Transition duration fallback from CSS --theme-dur-base
        const base = getComputedStyle(root).getPropertyValue('--theme-dur-base') || '600ms';
        const toMs = (value) => {
            const parsed = parseFloat(value);
            if (isNaN(parsed)) return 600;
            return value.includes('ms') ? parsed : parsed * 1000;
        };
        const timeout = Math.max(toMs(base), 0);

        window.setTimeout(() => {
            root.removeAttribute('data-prev-theme');
            root.classList.remove('theme-switching');
            setIsSwitching(false);
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
