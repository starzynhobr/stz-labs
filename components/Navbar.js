"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeSelector from './ThemeSelector';
import { cn } from '../lib/utils';

const navLinks = [
    { href: '/', dataI18n: 'nav.products', back: true },
    { href: '/mouse-tester', dataI18n: 'nav.mouse_tester' },
    { href: '/support', dataI18n: 'nav.support' },
];

export default function Navbar() {
    const pathname = usePathname();
    const {} = useTheme();
    const { t, lang, setLang } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const langRef = useRef(null);
    const showBackArrow = pathname !== '/';
 
    // Close language menu on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setLangMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleNavClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="fixed top-4 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-[1000] bg-[var(--bg)]/40 backdrop-blur-xl border border-[var(--border-strong)] shadow-[var(--shadow)] rounded-[var(--radius-card)] transition-all duration-300">
            <div className="flex items-center justify-between px-8 md:px-12 h-[60px]">
                {/* Logo */}
                <Link 
                    href="/" 
                    className="font-bold tracking-tight flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md group text-[var(--nav-link)] hover:text-[var(--nav-link-hover)]"
                >
                    <span className="text-base tracking-tighter">STZ LABS</span>
                    <span className="w-1 h-1 rounded-full transition-colors bg-[var(--accent)]/30 group-hover:bg-[var(--accent)]" />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                    aria-label={t('nav.menu')}
                    onClick={handleMenuToggle}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
                    </svg>
                </button>

                {/* Main Links (Desktop center, Mobile dropdown) */}
                <ul className={cn(
                    "absolute md:static top-full left-0 right-0 mt-2 md:mt-0 p-4 md:p-6 bg-[var(--surface-3)] md:bg-transparent backdrop-blur-[var(--backdrop-blur)] md:backdrop-blur-none border border-[var(--border-subtle)] md:border-none rounded-2xl md:rounded-none shadow-[var(--shadow)] md:shadow-none flex-col md:flex-row items-center gap-6 md:flex transition-all duration-200",
                    menuOpen ? 'flex' : 'hidden md:flex'
                )}>
                    {navLinks
                        .filter(link => !(link.href === '/' && pathname === '/'))
                        .map((link) => {
                        const label = t(link.dataI18n);
                        return (
                            <li key={link.href} className="w-full md:w-auto">
                                <Link
                                    href={link.href}
                                    className="block text-center md:inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors py-2 md:py-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] text-[var(--nav-link)] hover:text-[var(--nav-link-hover)]"
                                    data-i18n={link.dataI18n}
                                    onClick={handleNavClick}
                                >
                                    {link.back && showBackArrow && (
                                        <span aria-hidden="true" className="text-[var(--accent)]">
                                            ←
                                        </span>
                                    )}
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
 
                    {/* Mobile Controls */}
                    <li className="w-full pt-4 mt-2 border-t border-[var(--border-subtle)] flex flex-col gap-4 md:hidden">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">{t('nav.language')}</span>
                            <div className="flex flex-wrap gap-2 justify-end max-w-[160px]">
                                {['pt', 'en', 'fr', 'de', 'it', 'es'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLang(l)}
                                        className={cn(
                                            "px-2 py-1 text-[10px] font-bold rounded-md transition-all uppercase",
                                            lang === l 
                                                ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20" 
                                                : "text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
                                        )}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">{t('nav.theme')}</span>
                            <div className="flex justify-end">
                                <ThemeSelector />
                            </div>
                        </div>
                    </li>
                </ul>

                {/* Controls */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Custom Language Selector */}
                    <div className="relative" ref={langRef}>
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-md text-[11px] font-bold w-[45px] h-8 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] uppercase"
                            aria-label={t('nav.language')}
                        >
                            {lang}
                            <svg 
                                className={`ml-1 w-2.5 h-2.5 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} 
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
 
                        {/* Dropdown Menu */}
                        {langMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-16 bg-[var(--surface-3)] backdrop-blur-[var(--backdrop-blur)] border border-[var(--border-subtle)] rounded-xl shadow-[var(--shadow)] overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                                {['pt', 'en', 'fr', 'de', 'it', 'es'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => {
                                            setLang(l);
                                            setLangMenuOpen(false);
                                        }}
                                        className={cn(
                                            "w-full px-3 py-2 text-[11px] font-bold text-center transition-colors uppercase",
                                            lang === l 
                                                ? "bg-[var(--accent)]/10 text-[var(--accent)]" 
                                                : "text-[var(--text-secondary)] hover:bg-[var(--accent)]/5 hover:text-[var(--text-primary)]"
                                        )}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
 
                    <ThemeSelector />
                </div>
            </div>
        </nav>
    );
}
