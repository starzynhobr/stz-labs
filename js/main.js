document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLocalization();
    initMobileMenu();
    initGitHubData();
    initSTZCode();
});

/* --- STZ HACKER MODE (Konami Code) --- */
function initSTZCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'KeyB', 'KeyA'
    ];
    let cursor = 0;

    document.addEventListener('keydown', (e) => {
        // Reset se a tecla não for a esperada
        if (e.code !== konamiCode[cursor]) {
            cursor = 0;
            // Permite reiniciar imediatamente se a tecla for a primeira da sequência (Up)
            if (e.code === konamiCode[0]) cursor = 1;
            return;
        }

        cursor++;

        // Sequência completa
        if (cursor === konamiCode.length) {
            toggleHackerMode();
            cursor = 0;
        }
    });
}

function toggleHackerMode() {
    const html = document.documentElement;
    const isEmber = html.getAttribute('data-theme') === 'ember';
    
    if (isEmber) {
        // Volta para o tema salvo ou dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        alert('STZ LABS: SYSTEM NORMALIZED.');
    } else {
        // Ativa o modo Hacker
        html.setAttribute('data-theme', 'ember');
        alert('STZ LABS: ACCESS GRANTED \n\n/// EMBER PROTOCOL INITIATED');
        
        // Efeito sonoro opcional (comentado por padrão)
        // new Audio('assets/access_granted.mp3').play().catch(() => {});
    }
}

/* --- GITHUB DATA (Versions & Stars) --- */
async function initGitHubData() {
    // 1. Versions (Releases)
    const versionBadges = document.querySelectorAll('[data-gh-repo]');
    versionBadges.forEach(async (badge) => {
        const repo = badge.getAttribute('data-gh-repo');
        const cached = getCachedData(`version_${repo}`);

        if (cached) {
            badge.textContent = cached;
        } else {
            try {
                const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
                if (response.ok) {
                    const data = await response.json();
                    const version = data.tag_name;
                    badge.textContent = version;
                    setCachedData(`version_${repo}`, version);
                }
            } catch (error) {
                console.warn(`Failed to fetch version for ${repo}`, error);
            }
        }
    });

    // 2. Stars (Repository Info)
    const starBadges = document.querySelectorAll('[data-gh-stars]');
    starBadges.forEach(async (badge) => {
        const repo = badge.getAttribute('data-gh-stars');
        const countSpan = badge.querySelector('.count');
        
        // Se não tiver o span .count, ignora (segurança)
        if (!countSpan) return;

        const cached = getCachedData(`stars_${repo}`);

        if (cached !== null) { // !== null pois 0 é um valor válido
            countSpan.textContent = cached;
            badge.style.display = 'inline-flex';
        } else {
            try {
                const response = await fetch(`https://api.github.com/repos/${repo}`);
                if (response.ok) {
                    const data = await response.json();
                    const stars = data.stargazers_count;
                    countSpan.textContent = stars;
                    badge.style.display = 'inline-flex';
                    setCachedData(`stars_${repo}`, stars);
                }
            } catch (error) {
                console.warn(`Failed to fetch stars for ${repo}`, error);
            }
        }
    });
}

// Generic Cache Helper
function getCachedData(key) {
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    const { value, timestamp } = JSON.parse(data);
    const ONE_HOUR = 3600 * 1000;
    
    if (Date.now() - timestamp > ONE_HOUR) {
        localStorage.removeItem(key);
        return null;
    }
    
    return value;
}

function setCachedData(key, value) {
    const data = {
        value: value,
        timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(data));
}

/* --- MOBILE MENU --- */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

/* --- THEME MANAGER --- */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = document.querySelector('.theme-icon-moon');
    const sunIcon = document.querySelector('.theme-icon-sun');
    const html = document.documentElement;

    // Check saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply initial theme
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    }
}

/* --- LOCALIZATION MANAGER --- */
async function initLocalization() {
    const langSelect = document.getElementById('langSelect');
    if (!langSelect) return; // Se não houver seletor na página (ex: paginas simples)

    // Detect browser language or saved preference
    const savedLang = localStorage.getItem('lang');
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['pt', 'en', 'fr', 'de', 'it', 'es'];
    
    let currentLang = savedLang || (supportedLangs.includes(browserLang) ? browserLang : 'pt');
    
    // Set selector value
    langSelect.value = currentLang;
    
    // Load initial translations
    await loadTranslations(currentLang);

    langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('lang', currentLang);
        loadTranslations(currentLang);
    });
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`Could not load ${lang} translations`);
        
        const translations = await response.json();
        applyTranslations(translations);
        
        // Update document language attribute
        document.documentElement.lang = lang;
    } catch (error) {
        console.error('Localization Error:', error);
    }
}

function applyTranslations(translations) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        // Support nested keys (e.g. "nav.home")
        const value = key.split('.').reduce((obj, k) => obj && obj[k], translations);
        
        if (value) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = value;
            } else {
                el.textContent = value;
            }
        }
    });
}