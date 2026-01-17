document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLocalization();
});

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
