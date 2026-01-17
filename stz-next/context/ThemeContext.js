"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'dark',
    setTheme: () => {},
    toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState('dark');
    const [isSwitching, setIsSwitching] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const savedTheme = window.localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeState(initialTheme);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const setTheme = (value) => {
        if (!value) return;
        setThemeState(value);
    };

    const toggleTheme = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const root = document.documentElement;
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        const prevTheme = theme;

        if (isSwitching) return;

        if (prefersReducedMotion) {
            root.dataset.theme = nextTheme;
            root.removeAttribute('data-prev-theme');
            root.classList.remove('theme-switching');
            setThemeState(nextTheme);
            return;
        }

        setIsSwitching(true);
        root.removeAttribute('data-next-theme');
        root.dataset.prevTheme = prevTheme;
        root.dataset.theme = nextTheme;
        root.classList.add('theme-switching');
        setThemeState(nextTheme);

        const base = getComputedStyle(root).getPropertyValue('--theme-dur-base');
        const toMs = (value) => {
            const parsed = Number.parseFloat(value);
            if (Number.isNaN(parsed)) return 0;
            return value.includes('ms') ? parsed : parsed * 1000;
        };
        const timeout = Math.max(toMs(base), 0);

        window.setTimeout(() => {
            root.removeAttribute('data-prev-theme');
            root.classList.remove('theme-switching');
            setIsSwitching(false);
        }, timeout);
    };

    return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}
