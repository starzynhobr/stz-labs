"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
    { href: '/', dataI18n: 'nav.products', back: true },
    { href: '/mouse-tester', dataI18n: 'nav.mouse_tester' },
    { href: '/support', dataI18n: 'nav.support' },
];

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { t, lang, setLang } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
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
        <nav className="fixed top-4 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl z-[1000] bg-[#080A0E]/40 backdrop-blur-xl border border-purple-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-[24px] transition-all duration-300">
            <div className="flex items-center justify-between px-8 md:px-12 h-[60px]">
                {/* Logo */}
                <Link 
                    href="/" 
                    onMouseEnter={() => setHoveredLink('logo')}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{ color: hoveredLink === 'logo' ? '#fff' : '#71717a' }}
                    className="font-bold tracking-tight flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-md group"
                >
                    <span className="text-base tracking-tighter">STZ LABS</span>
                    <span 
                        className="w-1 h-1 rounded-full transition-colors" 
                        style={{ backgroundColor: hoveredLink === 'logo' ? '#a855f7' : 'rgba(168, 85, 247, 0.3)' }} 
                    />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-zinc-300 hover:text-white p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    aria-label={t('nav.menu')}
                    onClick={handleMenuToggle}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
                    </svg>
                </button>

                {/* Main Links (Desktop center, Mobile dropdown) */}
                <ul className={`absolute md:static top-full left-0 right-0 mt-2 md:mt-0 p-4 md:p-6 bg-black/60 md:bg-transparent backdrop-blur-3xl md:backdrop-blur-none border border-white/5 md:border-none rounded-2xl md:rounded-none shadow-xl md:shadow-none flex-col md:flex-row items-center gap-6 md:flex transition-all duration-200 ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
                    {navLinks
                        .filter(link => !(link.href === '/' && pathname === '/'))
                        .map((link) => {
                        const label = t(link.dataI18n);
                        const isHovered = hoveredLink === link.href;
                        return (
                            <li key={link.href} className="w-full md:w-auto">
                                <Link
                                    href={link.href}
                                    onMouseEnter={() => setHoveredLink(link.href)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    style={{ color: isHovered ? '#fff' : '#71717a' }}
                                    className="block text-center md:inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors py-2 md:py-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                                    data-i18n={link.dataI18n}
                                    onClick={handleNavClick}
                                >
                                    {link.back && showBackArrow && (
                                        <span aria-hidden="true" className="text-purple-500">
                                            ←
                                        </span>
                                    )}
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
 
                    {/* Mobile Controls */}
                    <li className="w-full pt-4 mt-2 border-t border-white/5 flex flex-col gap-4 md:hidden">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('nav.language')}</span>
                            <div className="flex flex-wrap gap-2 justify-end max-w-[160px]">
                                {['pt', 'en', 'fr', 'de', 'it', 'es'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLang(l)}
                                        className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all uppercase ${
                                            lang === l 
                                                ? 'bg-purple-500/20 text-white border border-purple-500/30' 
                                                : 'text-zinc-500 border border-white/5 hover:text-white'
                                        }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{t('nav.theme')}</span>
                            <button
                                onClick={toggleTheme}
                                className="text-zinc-500 hover:text-white bg-white/[0.03] border border-white/5 rounded-md px-3 py-1 text-[10px] font-bold transition-all flex items-center gap-2"
                            >
                                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                                {theme === 'dark' ? 'DARK' : 'LIGHT'}
                            </button>
                        </div>
                    </li>
                </ul>

                {/* Controls */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Custom Language Selector */}
                    <div className="relative" ref={langRef}>
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            onMouseEnter={() => setHoveredLink('lang')}
                            onMouseLeave={() => setHoveredLink(null)}
                            className="bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 border border-white/10 rounded-md text-[11px] font-bold w-[45px] h-8 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                            style={{ color: hoveredLink === 'lang' || langMenuOpen ? '#fff' : '#71717a' }}
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
                            <div className="absolute top-full right-0 mt-2 w-16 bg-[#080A0E]/90 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                                {['pt', 'en', 'fr', 'de', 'it', 'es'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => {
                                            setLang(l);
                                            setLangMenuOpen(false);
                                        }}
                                        className={`w-full px-3 py-2 text-[11px] font-bold text-center transition-colors uppercase ${
                                            lang === l 
                                                ? 'bg-purple-500/20 text-white' 
                                                : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
 
                    <button
                        id="themeToggle"
                        className="text-zinc-500 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-md w-8 h-8 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                        aria-label={t('nav.theme')}
                        onMouseEnter={() => setHoveredLink('theme')}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{ color: hoveredLink === 'theme' ? '#fff' : '#71717a' }}
                        onClick={toggleTheme}
                    >
                        <svg
                            className="w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
