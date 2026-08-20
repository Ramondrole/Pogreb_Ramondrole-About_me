const aboutTranslations = {
    ru: {
        title: "Обо мне",
        merch: "Мой мерч",
        bio: "Кратко обо мне",
        social: "Мои соц. сети",
        home: "На главную",
        games: "Наши игры",
        functions: "Полезные функции"
    },
    en: {
        title: "About me",
        merch: "My merch",
        bio: "Briefly about me",
        social: "My social networks",
        home: "Home",
        games: "Our games",
        functions: "Useful functions"
    },
    de: {
        title: "Über mich",
        merch: "Mein Merch",
        bio: "Kurz über mich",
        social: "Meine sozialen Netzwerke",
        home: "Startseite",
        games: "Unsere Spiele",
        functions: "Nützliche Funktionen"
    }
};

let currentLang = localStorage.getItem('about_language') || 'ru';

function t(key) {
    return aboutTranslations[currentLang]?.[key] || aboutTranslations.ru[key];
}

function updateAboutUILanguage() {
    const elements = ['title', 'merch', 'bio', 'social'];
    elements.forEach(key => {
        const el = document.querySelector(`[data-key="${key}"]`);
        if (el) {
            if (key === 'title') {
                el.textContent = t(key);
            } else {
                const card = document.querySelector(`.about-card[data-key="${key}"]`);
                if (card) {
                    const titleEl = card.querySelector('h3');
                    if (titleEl) titleEl.textContent = t(key);
                }
            }
        }
    });
    
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        const flags = { ru: '🌐 RU', en: '🌐 EN', de: '🌐 DE' };
        langBtn.innerHTML = flags[currentLang];
    }
    
    document.querySelectorAll('.nav-links a').forEach((link, idx) => {
        const keys = ['home', 'games', 'functions'];
        if (idx < keys.length) link.textContent = t(keys[idx]);
    });
    
    const cards = document.querySelectorAll('.about-card');
    const descTranslations = {
        ru: {
            merch: "Футболки, кружки и другие товары с символикой Ramondrole",
            bio: "История создания, биография и факты",
            social: "Telegram, YouTube, Discord и другие платформы"
        },
        en: {
            merch: "T-shirts, mugs and other merchandise with Ramondrole branding",
            bio: "Creation story, biography and facts",
            social: "Telegram, YouTube, Discord and other platforms"
        },
        de: {
            merch: "T-Shirts, Tassen und andere Merchandise-Artikel mit Ramondrole-Logo",
            bio: "Entstehungsgeschichte, Biografie und Fakten",
            social: "Telegram, YouTube, Discord und andere Plattformen"
        }
    };
    
    cards.forEach((card, idx) => {
        const keys = ['merch', 'bio', 'social'];
        if (idx < keys.length) {
            const descEl = card.querySelector('p');
            if (descEl) {
                descEl.textContent = descTranslations[currentLang]?.[keys[idx]] || descTranslations.ru[keys[idx]];
            }
        }
    });
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('about_language', lang);
    updateAboutUILanguage();
}

document.querySelectorAll('.lang-dropdown a').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = item.getAttribute('data-lang');
        if (lang) changeLanguage(lang);
    });
});

updateAboutUILanguage();