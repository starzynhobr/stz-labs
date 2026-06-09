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

    // Close language menu on click outside (desktop)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen) return; // Ignora no mobile para não conflitar com o botão do acordeão
            if (langRef.current && !langRef.current.contains(event.target)) {
                setLangMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);

    // Close mobile menu with Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && menuOpen) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [menuOpen]);

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
        // Reset lang menu when opening mobile menu
        if (!menuOpen) setLangMenuOpen(false);
    };

    const handleNavClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="fixed top-4 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-[1000] bg-[var(--bg)]/40 backdrop-blur-xl border border-[var(--border-strong)] shadow-[var(--shadow)] rounded-[var(--radius-card)] transition-all duration-300">
            <div className="relative grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center px-6 md:px-12 h-[60px]">
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
                    className="md:hidden text-[var(--text-main)] hover:text-[var(--accent)] p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] w-10 h-10 flex items-center justify-center"
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    onClick={handleMenuToggle}
                >
                    <div className="relative w-5 h-5 flex items-center justify-center">
                        <span className={cn("absolute block w-5 h-[2px] rounded-full bg-current transition-all duration-300 ease-in-out origin-center", menuOpen ? "rotate-45" : "-translate-y-1.5")} />
                        <span className={cn("absolute block w-5 h-[2px] rounded-full bg-current transition-all duration-300 ease-in-out", menuOpen ? "opacity-0 scale-x-0" : "opacity-100")} />
                        <span className={cn("absolute block w-5 h-[2px] rounded-full bg-current transition-all duration-300 ease-in-out origin-center", menuOpen ? "-rotate-45" : "translate-y-1.5")} />
                    </div>
                </button>

                {/* Dropdown Mobile / Desktop Links */}
                <div 
                    id="mobile-menu"
                    className={cn(
                        "absolute md:contents top-[calc(100%+12px)] left-0 right-0 p-5 md:p-0 bg-[var(--bg)] md:bg-transparent border border-[var(--border-strong)] md:border-none rounded-[var(--radius-card)] md:rounded-none shadow-2xl md:shadow-none flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-6 transition-all duration-300 z-50 origin-top",
                        menuOpen ? "flex opacity-100 translate-y-0 visible" : "flex opacity-0 -translate-y-4 invisible md:visible md:opacity-100 md:translate-y-0 pointer-events-none md:pointer-events-auto"
                    )}
                >
                    {/* Mobile Header */}
                    <div className="md:hidden flex items-center mb-1 pb-3 border-b border-[var(--border-subtle)]">
                        <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">STZLABS · Menu</span>
                    </div>

                    {/* Section: Navegação (Mobile) */}
                    <div className="md:hidden flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest px-1 mb-1">Navegação</span>
                        
                        {navLinks.filter(l => !(l.href === '/' && pathname === '/')).map(link => {
                            const isMouse = link.href === '/mouse-tester';
                            const isSupport = link.href === '/support';
                            const title = t(link.dataI18n);
                            const desc = isMouse ? 'Teste cliques, scroll e botões do mouse.' : 
                                         isSupport ? 'Contribua voluntariamente com o projeto.' : 
                                         'Acesse a página inicial.';
                            
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={handleNavClick}
                                    className="group flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)] hover:bg-[var(--surface)] hover:border-[var(--accent)]/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex-shrink-0 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                                            {isMouse ? (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/></svg>
                                            ) : isSupport ? (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                                            ) : (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                            )}
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-[13px] font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">{title}</span>
                                            <span className="text-[11px] text-[var(--text-secondary)] leading-tight mt-0.5">{desc}</span>
                                        </div>
                                    </div>
                                    <div className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Section: Preferências (Mobile) */}
                    <div className="md:hidden flex flex-col gap-2 mt-2">
                        <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest px-1 mb-1">Preferências</span>
                        
                        {/* Accordion Idioma */}
                        <div className="flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)] overflow-hidden">
                            <button 
                                onClick={() => setLangMenuOpen((prev) => !prev)}
                                aria-expanded={langMenuOpen}
                                className="flex items-center justify-between p-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] hover:bg-[var(--surface)] transition-colors"
                            >
                                <div className="flex items-center gap-3.5">
                                    <svg width="18" height="18" className="text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                                    <span className="text-[13px] font-bold text-[var(--text-main)] uppercase">{t('nav.language')} · <span className="text-[var(--accent)]">{lang}</span></span>
                                </div>
                                <svg className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className={cn(
                                "transition-all duration-300 ease-in-out",
                                langMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <div className="grid grid-cols-3 gap-2 px-3 pb-3 pt-1">
                                    {['pt', 'en', 'fr', 'de', 'it', 'es'].map((l) => (
                                        <button
                                            key={l}
                                            onClick={() => { setLang(l); setLangMenuOpen(false); }}
                                            className={cn(
                                                "px-2 py-2 text-[11px] font-bold rounded-lg transition-all uppercase flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                                                lang === l 
                                                    ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/50 shadow-[0_0_10px_var(--accent-glow)]" 
                                                    : "text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--surface)] hover:text-[var(--text-main)]"
                                            )}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Theme Selector Mobile */}
                        <div className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-2)]">
                            <div className="flex items-center gap-3.5">
                                <svg width="18" height="18" className="text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42 1.42"/></svg>
                                <span className="text-[13px] font-bold text-[var(--text-main)] uppercase">{t('nav.theme')}</span>
                            </div>
                            <ThemeSelector />
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <ul className="hidden md:flex md:col-start-2 md:row-start-1 items-center justify-center gap-8">
                        {navLinks.filter(l => !(l.href === '/' && pathname === '/')).map(link => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] text-[var(--nav-link)] hover:text-[var(--accent)]"
                                    data-i18n={link.dataI18n}
                                >
                                    {link.back && showBackArrow && <span aria-hidden="true" className="text-[var(--accent)]">←</span>}
                                    {t(link.dataI18n)}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Controls Desktop */}
                    <div className="hidden md:flex md:col-start-3 md:row-start-1 md:justify-self-end items-center gap-3">
                        {/* Custom Language Selector Desktop */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setLangMenuOpen((prev) => !prev)}
                                className="bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-md text-[11px] font-bold w-[45px] h-8 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] uppercase"
                                aria-label={t('nav.language')}
                                aria-expanded={langMenuOpen}
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
                            <div className={cn(
                                "absolute top-full right-0 mt-2 w-16 bg-[var(--surface-3)] backdrop-blur-[var(--backdrop-blur)] border border-[var(--border-subtle)] rounded-xl shadow-[var(--shadow)] overflow-hidden z-50 origin-top-right transition-all duration-200",
                                langMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                            )}>
                                {['pt', 'en', 'fr', 'de', 'it', 'es'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => {
                                            setLang(l);
                                            setLangMenuOpen(false);
                                        }}
                                        className={cn(
                                            "w-full px-3 py-2 text-[11px] font-bold text-center transition-colors uppercase focus-visible:outline-none focus-visible:bg-[var(--accent)]/10",
                                            lang === l 
                                                ? "bg-[var(--accent)]/10 text-[var(--accent)]" 
                                                : "text-[var(--text-secondary)] hover:bg-[var(--accent)]/5 hover:text-[var(--text-primary)]"
                                        )}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
     
                        <ThemeSelector />
                    </div>
                </div>
            </div>
        </nav>
    );
}
