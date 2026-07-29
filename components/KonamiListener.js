"use client";

import { useEffect, useRef } from 'react';
import { EASTER_EGG_THEME, useTheme } from '../context/ThemeContext';

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

const isTypingTarget = (target) => (
    target instanceof HTMLElement
    && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
);

const KonamiListener = () => {
    const { theme, setTheme } = useTheme();
    const cursorRef = useRef(0);
    const previousThemeRef = useRef('light-mode');
    const themeRef = useRef(theme);

    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isTypingTarget(event.target)) return;

            const expectedKey = KONAMI_SEQUENCE[cursorRef.current];
            if (event.code !== expectedKey) {
                cursorRef.current = event.code === KONAMI_SEQUENCE[0] ? 1 : 0;
                return;
            }

            cursorRef.current += 1;
            if (cursorRef.current !== KONAMI_SEQUENCE.length) return;

            cursorRef.current = 0;

            if (themeRef.current === EASTER_EGG_THEME) {
                setTheme(previousThemeRef.current);
                return;
            }

            previousThemeRef.current = themeRef.current;
            setTheme(EASTER_EGG_THEME);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setTheme]);

    return null;
};

export default KonamiListener;
