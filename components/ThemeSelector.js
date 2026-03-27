"use client";

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

/**
 * ThemeSelector Component
 * Minimalist atmosphere switcher for the Navbar.
 * Icons change style based on the active atmosphere.
 */
export default function ThemeSelector() {
    const { theme, setTheme, themeList } = useTheme();
    const { t } = useLanguage();

    const getThemeIcon = (tName) => {
        switch (tName) {
            case 'neon-core': return "✦";
            case 'forge-grid': return "⬢";
            case 'aurora-glass': return "◎";
            case 'light-mode': return "☼";
            default: return "●";
        }
    };

    return (
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5">
            {themeList.map((tName) => {
                const isActive = theme === tName;
                
                return (
                    <button
                        key={tName}
                        onClick={() => setTheme(tName)}
                        title={t(`nav.themes.${tName.replace('-', '_')}`)}
                        className={cn(
                            "w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300",
                            "text-sm font-bold",
                            isActive 
                                ? "bg-[var(--accent)] text-[var(--bg)] shadow-[0_0_15px_var(--accent-glow)] scale-110" 
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        )}
                        aria-label={t(`nav.themes.${tName.replace('-', '_')}`)}
                    >
                        {getThemeIcon(tName)}
                    </button>
                );
            })}
        </div>
    );
}
