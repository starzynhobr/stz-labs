"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const navLinks = [
    { href: '/#produtos', dataI18n: 'nav.products', back: true },
];

export default function Navbar() {
    const pathname = usePathname();
    const { toggleTheme } = useTheme();
    const { lang, setLang, t } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);
    const showBackArrow = pathname !== '/';

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleNavClick = () => {
        setMenuOpen(false);
    };

    const handleProjectsClick = (event) => {
        handleNavClick();
        if (typeof window === 'undefined') return;
        if (event?.defaultPrevented) return;
        if (event?.currentTarget?.getAttribute('href') !== '/#produtos') return;

        const { pathname, hash } = window.location;
        if (pathname === '/' && hash === '#produtos') {
            event.preventDefault();
            const target = document.getElementById('produtos');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link href="/" className="logo">
                    STZ LABS
                </Link>
                <div
                    className="menu-toggle"
                    aria-label={t('nav.menu')}
                    onClick={handleMenuToggle}
                >
                    ☰
                </div>
                <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
                    {navLinks.map((link) => {
                        const label = t(link.dataI18n);
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`nav-link${link.back && showBackArrow ? ' nav-back-link' : ''}`}
                                    data-i18n={link.dataI18n}
                                    onClick={link.href === '/#produtos' ? handleProjectsClick : handleNavClick}
                                >
                                    {link.back && showBackArrow && (
                                        <span className="back-link-arrow" aria-hidden="true">
                                            ←
                                        </span>
                                    )}
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="nav-controls">
                    <select
                        id="langSelect"
                        className="lang-select"
                        aria-label={t('nav.language')}
                        value={lang}
                        onChange={(event) => setLang(event.target.value)}
                    >
                        <option value="pt">PT</option>
                        <option value="en">EN</option>
                        <option value="fr">FR</option>
                        <option value="de">DE</option>
                        <option value="it">IT</option>
                        <option value="es">ES</option>
                    </select>
                    <button
                        id="themeToggle"
                        className="icon-btn"
                        aria-label={t('nav.theme')}
                        onClick={toggleTheme}
                    >
                        <svg
                            className="theme-icon-moon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                        <svg
                            className="theme-icon-sun"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}
