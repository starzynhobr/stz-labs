"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import TranslatedText from './TranslatedText';

const PHRASES = [
    "core ecosystem", "local-first tools", "active builds", "utility systems", 
    "open source flow", "project index online", "independent tooling", 
    "focused utilities", "creator utilities", "dev tools online", 
    "practical software", "modular tools", "live toolchain", 
    "production mindset", "useful systems", "desktop and web", 
    "tools in motion", "crafted for utility", "independent systems", 
    "clean tool design", "real workflow tools", "creator workflow", 
    "lightweight systems", "purpose-built tools", "ecosystem online", 
    "active modules", "focused development", "useful by design", 
    "sharp utility layer", "stable core tools", "indexing projects", 
    "loading toolchain", "syncing modules", "scanning builds", 
    "activating systems", "booting ecosystem", "checking modules", 
    "rendering tools", "parsing workflow", "utilities online", 
    "built for real use", "software with purpose", "less noise more utility", 
    "independent by design", "crafted with intention", "systems that solve", 
    "small studio big intent", "practical over flashy", "function with identity", 
    "tools that feel alive"
];

export default function Hero() {
    const { t } = useLanguage();
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Typewriter effect
    useEffect(() => {
        if (isPaused) {
            const timeout = setTimeout(() => setIsPaused(false), 3000);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && subIndex === 0) {
            // Pequeno delay para a transição soar natural
            const timeout = setTimeout(() => {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % PHRASES.length);
            }, 100);
            return () => clearTimeout(timeout);
        }

        if (!isDeleting && subIndex === PHRASES[index].length) {
            const timeout = setTimeout(() => {
                setIsPaused(true);
                setIsDeleting(true);
            }, 100);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [subIndex, isDeleting, index, isPaused]);

    const dotColor = isPaused ? 'bg-purple-500' : isDeleting ? 'bg-red-500' : 'bg-green-500';

    return (
        <section className="relative w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] transition-all duration-500">
            {/* Ambient Atmosphere Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--accent-glow)] rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse duration-[4000ms] opacity-[var(--glow-opacity)]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-[var(--accent-glow)] rounded-full blur-[100px] -z-10 pointer-events-none opacity-[var(--glow-opacity)]" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

            <div className="relative z-10 flex flex-col items-center px-8 py-10 md:px-12 md:py-16 max-w-4xl mx-auto text-center">
                {/* Linha de Status Viva (Typing Effect) */}
                <div className="flex items-center gap-3 mb-10 h-6">
                    <span className={`w-1 h-1 rounded-full ${dotColor} opacity-70 transition-colors duration-500`} aria-hidden="true" />
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent)]/60 uppercase">
                        {PHRASES[index].substring(0, subIndex)}
                        <span className="inline-block w-[1px] h-3 ml-0.5 bg-[var(--accent)]/40 animate-pulse" />
                    </span>
                </div>
                
                <TranslatedText as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[var(--text-primary)] mb-6 leading-tight" i18nKey="sections.projects_title" />
                
                <TranslatedText as="p" className="text-base md:text-lg text-[var(--text-secondary)] mb-12 leading-relaxed max-w-2xl mx-auto" i18nKey="sections.projects_subtitle" />
                
                <div className="flex flex-wrap gap-4 items-center justify-center">
                    <div className="flex flex-col items-center">
                        <Link href="/support" 
                              className="text-sm font-semibold text-[var(--accent)] hover:opacity-80 transition-all inline-flex items-center gap-2"
                              aria-label={t('sections.projects_support_aria')}>
                            <TranslatedText as="span" i18nKey="sections.projects_support_cta" />
                            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                        <TranslatedText
                            as="span"
                            className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1.5"
                            i18nKey="sections.projects_support_note"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
