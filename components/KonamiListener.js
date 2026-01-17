"use client";

import { useEffect, useRef } from 'react';

const KONAMI_SEQUENCE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
];

const ACCESS_GRANTED_MESSAGE = 'STZ LABS: ACCESS GRANTED \n\n/// EMBER PROTOCOL INITIATED';
const SYSTEM_NORMALIZED_MESSAGE = 'STZ LABS: SYSTEM NORMALIZED.';

const toMs = (value) => {
    const parsed = Number.parseFloat(value);
    if (Number.isNaN(parsed)) return 0;
    return value.includes('ms') ? parsed : parsed * 1000;
};

const KonamiListener = () => {
    const cursorRef = useRef(0);
    const switchingRef = useRef(false);
    const timeoutRef = useRef(null);

    const applyThemeSwitch = (nextTheme, prevTheme) => {
        const root = document.documentElement;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            root.dataset.theme = nextTheme;
            root.removeAttribute('data-prev-theme');
            root.classList.remove('theme-switching');
            switchingRef.current = false;
            return;
        }

        root.dataset.prevTheme = prevTheme;
        root.dataset.theme = nextTheme;
        root.classList.add('theme-switching');

        const base = getComputedStyle(root).getPropertyValue('--theme-dur-base');
        const duration = Math.max(toMs(base), 0);

        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            root.removeAttribute('data-prev-theme');
            root.classList.remove('theme-switching');
            switchingRef.current = false;
        }, duration);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (switchingRef.current) return;

            const expectedKey = KONAMI_SEQUENCE[cursorRef.current];
            if (event.code !== expectedKey) {
                cursorRef.current = event.code === KONAMI_SEQUENCE[0] ? 1 : 0;
                return;
            }

            cursorRef.current += 1;
            if (cursorRef.current !== KONAMI_SEQUENCE.length) return;

            cursorRef.current = 0;
            switchingRef.current = true;

            const root = document.documentElement;
            const currentTheme = root.dataset.theme || 'dark';

            if (currentTheme === 'ember') {
                const savedTheme = window.localStorage.getItem('theme');
                const fallbackTheme = savedTheme && savedTheme !== 'ember' ? savedTheme : 'dark';
                applyThemeSwitch(fallbackTheme, 'ember');
                window.alert(SYSTEM_NORMALIZED_MESSAGE);
                return;
            }

            applyThemeSwitch('ember', currentTheme);
            window.alert(ACCESS_GRANTED_MESSAGE);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.clearTimeout(timeoutRef.current);
        };
    }, []);

    return null;
};

export default KonamiListener;
