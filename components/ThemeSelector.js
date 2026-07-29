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
        <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--surface-3)] border [border-color:var(--border-subtle)]">
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
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                            isActive
                                ? "bg-[var(--accent)] text-[var(--text-on-accent)] shadow-[0_0_15px_var(--accent-glow)] scale-110"
                                : "text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--surface-2)]"
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
