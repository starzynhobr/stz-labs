export const projects = [
    {
        slug: 'stz-xml-translator',
        layoutType: 'bento',
        priority: 2,
        maturity: 'maintenance',
        repoName: 'Game-XML-Translator',
        titleKey: 'game_xml.title',
        descriptionKey: 'cards.xml_desc',
        downloadHref: 'https://github.com/starzynhobr/Game-XML-Translator/releases/latest',
        badgeLabel: '...',
        badgeVariant: 'stable',
        badgeAttrs: {
            'data-gh-repo': 'starzynhobr/Game-XML-Translator',
        },
        tags: [
            { labelKey: 'common.tags.windows' },
            { labelKey: 'common.tags.translation' },
            { labelKey: 'common.tags.tools' },
        ],
        detailLabelKey: 'cards.btn_details',
        downloadLabelKey: 'cards.btn_download',
        detail: {
            meta: {
                title: 'STZ XML Translator | STZ LABS',
                description:
                    'Ferramenta desktop para tradução de arquivos XML de jogos com suporte a múltiplos provedores de IA, glossário inteligente e tag presets.',
                ogDescription: 'Traduza XMLs de jogos com IA, glossário e múltiplos provedores — tudo no desktop.',
            },
            hero: {
                tags: ['Python 3.11', 'CustomTkinter', 'Gemini · DeepL · Azure · Llama'],
                titleKey: 'game_xml.title',
                descriptionKey: 'game_xml.description',
                githubUrl: 'https://github.com/starzynhobr/Game-XML-Translator',
                githubLabelKey: 'game_xml.btn_github',
            },
            showcase: [
                {
                    stackImages: [
                        { src: '/images/projects/stz-xml-translator/showcase/theme-dark.png', alt: 'STZ XML Translator dark theme' },
                        { src: '/images/projects/stz-xml-translator/showcase/theme-warm.png', alt: 'STZ XML Translator warm theme' },
                        { src: '/images/projects/stz-xml-translator/showcase/theme-light.png', alt: 'STZ XML Translator light theme' },
                    ],
                    kickerKey: 'game_xml.showcase.themes_kicker',
                    titleKey: 'game_xml.showcase.themes_title',
                    descriptionKey: 'game_xml.showcase.themes_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-xml-translator/showcase/providers.png',
                    alt: 'STZ XML Translator translation providers',
                    kickerKey: 'game_xml.showcase.providers_kicker',
                    titleKey: 'game_xml.showcase.providers_title',
                    descriptionKey: 'game_xml.showcase.providers_desc',
                    align: 'image-right',
                },
                {
                    image: '/images/projects/stz-xml-translator/showcase/tagpresets.png',
                    alt: 'STZ XML Translator tag presets workflow',
                    kickerKey: 'game_xml.showcase.tagpresets_kicker',
                    titleKey: 'game_xml.showcase.tagpresets_title',
                    descriptionKey: 'game_xml.showcase.tagpresets_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-xml-translator/showcase/drawer-presets.png',
                    alt: 'STZ XML Translator settings drawer',
                    kickerKey: 'game_xml.showcase.settings_kicker',
                    titleKey: 'game_xml.showcase.settings_title',
                    descriptionKey: 'game_xml.showcase.settings_desc',
                    align: 'image-right',
                },
                {
                    image: '/images/projects/stz-xml-translator/showcase/glossary.png',
                    alt: 'STZ XML Translator glossary manager',
                    kickerKey: 'game_xml.showcase.glossary_kicker',
                    titleKey: 'game_xml.showcase.glossary_title',
                    descriptionKey: 'game_xml.showcase.glossary_desc',
                    align: 'image-left',
                },
            ],
            features: [
                {
                    titleKey: 'game_xml.features.ai_title',
                    descriptionKey: 'game_xml.features.ai_desc',
                },
                {
                    titleKey: 'game_xml.features.integrity_title',
                    descriptionKey: 'game_xml.features.integrity_desc',
                },
                {
                    titleKey: 'game_xml.features.glossary_title',
                    descriptionKey: 'game_xml.features.glossary_desc',
                },
                {
                    titleKey: 'game_xml.features.ui_title',
                    descriptionKey: 'game_xml.features.ui_desc',
                },
                {
                    titleKey: 'game_xml.features.progress_title',
                    descriptionKey: 'game_xml.features.progress_desc',
                },
                {
                    titleKey: 'game_xml.features.export_title',
                    descriptionKey: 'game_xml.features.export_desc',
                },
            ],
            specs: [
                { labelKey: 'game_xml.specs.version', repoName: 'Game-XML-Translator' },
                { labelKey: 'game_xml.specs.platform', value: 'Windows 10/11' },
                { labelKey: 'game_xml.specs.language', value: 'Python 3.11' },
                { labelKey: 'game_xml.specs.compilation', value: 'Nuitka Standalone' },
                { labelKey: 'game_xml.specs.license', value: 'GPL-3.0 License' },
                { labelKey: 'game_xml.specs.requirements', value: 'API Key opcional' },
            ],
        },
    },
    {
        slug: 'stz-lyrics',
        layoutType: 'bento',
        priority: 3,
        maturity: 'stable',
        repoName: 'stzlyrics',
        titleKey: 'lyrics.title',
        descriptionKey: 'cards.lyrics_desc',
        downloadHref: 'https://github.com/starzynhobr/stzlyrics/releases/latest',
        badgeLabel: '...',
        badgeVariant: 'stable',
        badgeAttrs: {
            'data-gh-repo': 'starzynhobr/stzlyrics',
        },
        tags: [
            { labelKey: 'common.tags.rainmeter' },
            { labelKey: 'common.tags.skin' },
            { labelKey: 'common.tags.music' },
        ],
        detailLabelKey: 'cards.btn_details',
        downloadLabelKey: 'cards.btn_download',
        detail: {
            meta: {
                title: 'STZ Lyrics | STZ LABS',
                description:
                    'Skin minimalista para Rainmeter que exibe letras de músicas sincronizadas na barra de tarefas.',
                ogDescription: 'Skin minimalista para Rainmeter que exibe letras de músicas sincronizadas.',
            },
            hero: {
                tags: ['Rainmeter', 'LRCLIB API', 'WebNowPlaying'],
                titleKey: 'lyrics.title',
                descriptionKey: 'lyrics.description',
                githubUrl: 'https://github.com/starzynhobr/stzlyrics',
                githubLabelKey: 'lyrics.btn_github',
            },
            showcase: [
                {
                    image: '/images/projects/stz-lyrics-rainmeter/hero/cover.png',
                    alt: 'STZ Lyrics Rainmeter skin cover preview',
                    kickerKey: 'lyrics.showcase.cover_kicker',
                    titleKey: 'lyrics.showcase.cover_title',
                    descriptionKey: 'lyrics.showcase.cover_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-lyrics-rainmeter/crops/screenshot_1.webp',
                    alt: 'STZ Lyrics Rainmeter screenshot 1',
                    kickerKey: 'lyrics.showcase.screenshot_1_kicker',
                    titleKey: 'lyrics.showcase.screenshot_1_title',
                    descriptionKey: 'lyrics.showcase.screenshot_1_desc',
                    align: 'image-right',
                },
                {
                    image: '/images/projects/stz-lyrics-rainmeter/crops/screenshot_2.webp',
                    alt: 'STZ Lyrics Rainmeter screenshot 2',
                    kickerKey: 'lyrics.showcase.screenshot_2_kicker',
                    titleKey: 'lyrics.showcase.screenshot_2_title',
                    descriptionKey: 'lyrics.showcase.screenshot_2_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-lyrics-rainmeter/crops/screenshot_3.webp',
                    alt: 'STZ Lyrics Rainmeter screenshot 3',
                    kickerKey: 'lyrics.showcase.screenshot_3_kicker',
                    titleKey: 'lyrics.showcase.screenshot_3_title',
                    descriptionKey: 'lyrics.showcase.screenshot_3_desc',
                    align: 'image-right',
                },
            ],
            features: [
                {
                    titleKey: 'lyrics.features.sync_title',
                    descriptionKey: 'lyrics.features.sync_desc',
                },
                {
                    titleKey: 'lyrics.features.design_title',
                    descriptionKey: 'lyrics.features.design_desc',
                },
                {
                    titleKey: 'lyrics.features.custom_title',
                    descriptionKey: 'lyrics.features.custom_desc',
                },
                {
                    titleKey: 'lyrics.features.delay_title',
                    descriptionKey: 'lyrics.features.delay_desc',
                },
                {
                    titleKey: 'lyrics.features.wnp_title',
                    descriptionKey: 'lyrics.features.wnp_desc',
                },
                {
                    titleKey: 'lyrics.features.top_title',
                    descriptionKey: 'lyrics.features.top_desc',
                },
            ],
            specs: [
                { labelKey: 'lyrics.specs.version', repoName: 'stzlyrics' },
                { labelKey: 'lyrics.specs.req', value: 'Rainmeter 4.5+' },
                { labelKey: 'lyrics.specs.plugin', value: 'WebNowPlaying' },
                { labelKey: 'lyrics.specs.api', value: 'LRCLIB' },
                { labelKey: 'lyrics.specs.license', value: 'GPL-3.0 License' },
                { labelKey: 'lyrics.specs.dep', value: 'curl.exe' },
            ],
        },
    },
    {
        slug: 'stz-lyrics-overlay',
        layoutType: 'bento',
        priority: 4,
        maturity: 'stable',
        repoName: 'stzlyrics-python',
        titleKey: 'lyrics_overlay.title',
        descriptionKey: 'cards.lyrics_overlay_desc',
        downloadHref: 'https://github.com/starzynhobr/stzlyrics-python/releases/latest',
        badgeLabel: '...',
        badgeVariant: 'stable',
        badgeAttrs: {
            'data-gh-repo': 'starzynhobr/stzlyrics-python',
        },
        tags: [
            { labelKey: 'common.tags.windows' },
            { labelKey: 'common.tags.python' },
            { labelKey: 'common.tags.music' },
        ],
        detailLabelKey: 'cards.btn_details',
        downloadLabelKey: 'cards.btn_download',
        detail: {
            meta: {
                title: 'STZ Lyrics Overlay | STZ LABS',
                description:
                    'Overlay de letras sincronizadas para Windows em Python, independente do Rainmeter, com GSMTC + LRCLIB.',
                ogDescription:
                    'Overlay de letras sincronizadas para Windows com suporte a GSMTC, LRCLIB, tray e presets.',
            },
            hero: {
                tags: ['Python 3.10+', 'GSMTC', 'LRCLIB'],
                titleKey: 'lyrics_overlay.title',
                descriptionKey: 'lyrics_overlay.description',
                githubUrl: 'https://github.com/starzynhobr/stzlyrics-python',
                githubLabelKey: 'lyrics_overlay.btn_github',
            },
            showcase: [
                {
                    image: '/images/projects/stz-lyrics-overlay/hero/cover.png',
                    alt: 'STZ Lyrics Overlay cover preview',
                    kickerKey: 'lyrics_overlay.showcase.cover_kicker',
                    titleKey: 'lyrics_overlay.showcase.cover_title',
                    descriptionKey: 'lyrics_overlay.showcase.cover_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-lyrics-overlay/crops/screenshot-1.png',
                    alt: 'STZ Lyrics Overlay screenshot 1',
                    kickerKey: 'lyrics_overlay.showcase.screenshot_1_kicker',
                    titleKey: 'lyrics_overlay.showcase.screenshot_1_title',
                    descriptionKey: 'lyrics_overlay.showcase.screenshot_1_desc',
                    align: 'image-right',
                },
                {
                    image: '/images/projects/stz-lyrics-overlay/crops/screenshot-2.png',
                    alt: 'STZ Lyrics Overlay screenshot 2',
                    kickerKey: 'lyrics_overlay.showcase.screenshot_2_kicker',
                    titleKey: 'lyrics_overlay.showcase.screenshot_2_title',
                    descriptionKey: 'lyrics_overlay.showcase.screenshot_2_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-lyrics-overlay/crops/screenshot-3.png',
                    alt: 'STZ Lyrics Overlay screenshot 3',
                    kickerKey: 'lyrics_overlay.showcase.screenshot_3_kicker',
                    titleKey: 'lyrics_overlay.showcase.screenshot_3_title',
                    descriptionKey: 'lyrics_overlay.showcase.screenshot_3_desc',
                    align: 'image-right',
                },
            ],
            features: [
                {
                    titleKey: 'lyrics_overlay.features.overlay_title',
                    descriptionKey: 'lyrics_overlay.features.overlay_desc',
                },
                {
                    titleKey: 'lyrics_overlay.features.sync_title',
                    descriptionKey: 'lyrics_overlay.features.sync_desc',
                },
                {
                    titleKey: 'lyrics_overlay.features.controls_title',
                    descriptionKey: 'lyrics_overlay.features.controls_desc',
                },
                {
                    titleKey: 'lyrics_overlay.features.presets_title',
                    descriptionKey: 'lyrics_overlay.features.presets_desc',
                },
                {
                    titleKey: 'lyrics_overlay.features.smoothing_title',
                    descriptionKey: 'lyrics_overlay.features.smoothing_desc',
                },
                {
                    titleKey: 'lyrics_overlay.features.cache_title',
                    descriptionKey: 'lyrics_overlay.features.cache_desc',
                },
            ],
            specs: [
                { labelKey: 'lyrics_overlay.specs.version', repoName: 'stzlyrics-python' },
                { labelKey: 'lyrics_overlay.specs.platform', value: 'Windows 10/11' },
                { labelKey: 'lyrics_overlay.specs.language', value: 'Python 3.10+' },
                { labelKey: 'lyrics_overlay.specs.media', value: 'GSMTC' },
                { labelKey: 'lyrics_overlay.specs.api', value: 'LRCLIB' },
                { labelKey: 'lyrics_overlay.specs.license', value: 'GPL-3.0 License' },
            ],
        },
    },
    {
        slug: 'stz-taskpulse',
        layoutType: 'bento',
        priority: 5,
        maturity: 'stable',
        repoName: 'stz-taskpulse',
        titleKey: 'taskpulse.title',
        descriptionKey: 'cards.taskpulse_desc',
        downloadHref: 'https://github.com/starzynhobr/stz-taskpulse/releases/latest',
        badgeLabel: '...',
        badgeVariant: 'stable',
        badgeAttrs: {
            'data-gh-repo': 'starzynhobr/stz-taskpulse',
        },
        tags: [
            { labelKey: 'common.tags.rainmeter' },
            { labelKey: 'common.tags.monitor' },
        ],
        detailLabelKey: 'cards.btn_details',
        downloadLabelKey: 'cards.btn_download',
        detail: {
            meta: {
                title: 'STZ TaskPulse | STZ LABS',
                description:
                    'Monitor de sistema minimalista e elegante para Rainmeter. Acompanhe CPU, GPU, RAM, Rede e Horário em tempo real.',
                ogDescription: 'Monitor de sistema minimalista para Rainmeter.',
            },
            hero: {
                tags: ['Rainmeter', 'System Monitor'],
                titleKey: 'taskpulse.title',
                descriptionKey: 'taskpulse.description',
                githubUrl: 'https://github.com/starzynhobr/stz-taskpulse',
                githubLabelKey: 'taskpulse.btn_github',
            },
            showcase: [
                {
                    image: '/images/projects/stz-taskpulse/cover/cover.webp',
                    alt: 'STZ TaskPulse cover preview',
                    kickerKey: 'taskpulse.showcase.cover_kicker',
                    titleKey: 'taskpulse.showcase.cover_title',
                    descriptionKey: 'taskpulse.showcase.cover_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-taskpulse/hero/screenshot_1.png',
                    alt: 'STZ TaskPulse resource monitor screenshot',
                    kickerKey: 'taskpulse.showcase.screenshot_1_kicker',
                    titleKey: 'taskpulse.showcase.screenshot_1_title',
                    descriptionKey: 'taskpulse.showcase.screenshot_1_desc',
                    align: 'image-right',
                },
                {
                    image: '/images/projects/stz-taskpulse/hero/screenshot_2.png',
                    alt: 'STZ TaskPulse clock and date interface screenshot',
                    kickerKey: 'taskpulse.showcase.screenshot_2_kicker',
                    titleKey: 'taskpulse.showcase.screenshot_2_title',
                    descriptionKey: 'taskpulse.showcase.screenshot_2_desc',
                    align: 'image-left',
                },
            ],
            features: [
                {
                    titleKey: 'taskpulse.features.monitor_title',
                    descriptionKey: 'taskpulse.features.monitor_desc',
                },
                {
                    titleKey: 'taskpulse.features.design_title',
                    descriptionKey: 'taskpulse.features.design_desc',
                },
                {
                    titleKey: 'taskpulse.features.clock_title',
                    descriptionKey: 'taskpulse.features.clock_desc',
                },
                {
                    titleKey: 'taskpulse.features.lightweight_title',
                    descriptionKey: 'taskpulse.features.lightweight_desc',
                },
                {
                    titleKey: 'taskpulse.features.custom_title',
                    descriptionKey: 'taskpulse.features.custom_desc',
                },
            ],
            specs: [
                { labelKey: 'taskpulse.specs.version', value: 'v1.0.0' },
                { labelKey: 'taskpulse.specs.platform', value: 'Rainmeter (Windows)' },
                { labelKey: 'taskpulse.specs.license', value: 'GPL-3.0 License' },
            ],
        },
    },
    {
        slug: 'stz-csv-converter',
        layoutType: 'bento',
        priority: 6,
        maturity: 'stable',
        repoName: 'stz-csv-converter',
        titleKey: 'csv_converter.title',
        descriptionKey: 'cards.csv_desc',
        downloadHref: 'https://github.com/starzynhobr/stz-csv-converter/releases/latest',
        badgeLabel: '...',
        badgeVariant: 'stable',
        badgeAttrs: {
            'data-gh-repo': 'starzynhobr/stz-csv-converter',
        },
        tags: [
            { labelKey: 'common.tags.python' },
            { labelKey: 'common.tags.qt_qml' },
            { labelKey: 'common.tags.tools' },
        ],
        detailLabelKey: 'cards.btn_details',
        downloadLabelKey: 'cards.btn_download',
        detail: {
            meta: {
                title: 'STZ CSV Converter | STZ LABS',
                description: 'Ferramenta avançada para limpar, normalizar e converter listas de contatos CSV.',
                ogDescription:
                    'Ferramenta avançada para limpar, normalizar e converter listas de contatos CSV.',
            },
            hero: {
                tags: ['Python', 'PySide6', 'QML'],
                titleKey: 'csv_converter.title',
                descriptionKey: 'csv_converter.description',
                githubUrl: 'https://github.com/starzynhobr/stz-csv-converter',
                githubLabelKey: 'csv_converter.btn_github',
            },
            showcase: [
                {
                    image: '/images/projects/stz-csv-converter/cover/cover.webp',
                    alt: 'STZ CSV Converter cover preview',
                    kickerKey: 'csv_converter.showcase.cover_kicker',
                    titleKey: 'csv_converter.showcase.cover_title',
                    descriptionKey: 'csv_converter.showcase.cover_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-csv-converter/hero/screenshot_1.webp',
                    alt: 'STZ CSV Converter screenshot 1',
                    kickerKey: 'csv_converter.showcase.screenshot_1_kicker',
                    titleKey: 'csv_converter.showcase.screenshot_1_title',
                    descriptionKey: 'csv_converter.showcase.screenshot_1_desc',
                    align: 'image-right',
                },
                {
                    image: '/images/projects/stz-csv-converter/hero/screenshot_2.webp',
                    alt: 'STZ CSV Converter screenshot 2',
                    kickerKey: 'csv_converter.showcase.screenshot_2_kicker',
                    titleKey: 'csv_converter.showcase.screenshot_2_title',
                    descriptionKey: 'csv_converter.showcase.screenshot_2_desc',
                    align: 'image-left',
                },
            ],
            features: [
                {
                    titleKey: 'csv_converter.features.clean_title',
                    descriptionKey: 'csv_converter.features.clean_desc',
                },
                {
                    titleKey: 'csv_converter.features.dedup_title',
                    descriptionKey: 'csv_converter.features.dedup_desc',
                },
                {
                    titleKey: 'csv_converter.features.mapping_title',
                    descriptionKey: 'csv_converter.features.mapping_desc',
                },
                {
                    titleKey: 'csv_converter.features.report_title',
                    descriptionKey: 'csv_converter.features.report_desc',
                },
                {
                    titleKey: 'csv_converter.features.ui_title',
                    descriptionKey: 'csv_converter.features.ui_desc',
                },
                {
                    titleKey: 'csv_converter.features.google_title',
                    descriptionKey: 'csv_converter.features.google_desc',
                },
            ],
            specs: [
                { labelKey: 'csv_converter.specs.version', value: 'v1.0.0' },
                { labelKey: 'csv_converter.specs.framework', value: 'Qt for Python (PySide6)' },
                { labelKey: 'csv_converter.specs.language', value: 'Python 3.11' },
                { labelKey: 'csv_converter.specs.ui', value: 'QML' },
                { labelKey: 'csv_converter.specs.license', value: 'GPL-3.0 License' },
                { labelKey: 'csv_converter.specs.input', value: 'CSV (Generic/Google)' },
            ],
        },
    },
    {
        slug: 'stz-ai-chat-optimizer',
        layoutType: 'bento',
        priority: 6,
        maturity: 'stable',
        titleKey: 'ai_chat_optimizer.title',
        descriptionKey: 'cards.ai_chat_optimizer_desc',
        downloadHref: null,
        badgeLabelKey: 'common.badges.stable',
        badgeVariant: 'stable',
        tags: [
            { labelKey: 'common.tags.javascript' },
            { labelKey: 'common.tags.browser_extension' },
            { labelKey: 'common.tags.webextension' },
        ],
        detailLabelKey: 'cards.btn_details',
        actionButtons: [
            { labelKey: 'cards.btn_details', href: '/projects/stz-ai-chat-optimizer', variant: 'primary' },
            { label: 'Chrome', href: 'https://chromewebstore.google.com/detail/stz-ai-chat-optimizer/fhfjgfncohmbapjpdbkhgaiooffmiabj?authuser=3&hl=pt-BR', variant: 'secondary' },
            { label: 'Firefox', href: 'https://addons.mozilla.org/pt-BR/firefox/addon/stz-ai-chat-optimizer/', variant: 'secondary' }
        ],
        detail: {
            meta: {
                title: 'STZ Ai Chat Optimizer | STZ LABS',
                description:
                    'Browser extension for keeping long AI chats lighter by hiding or collapsing older messages while preserving the current conversation flow.',
                ogDescription:
                    'Keep long AI chats lighter by hiding or collapsing older messages while preserving the current conversation flow.',
            },
            hero: {
                tags: ['JavaScript', 'WebExtension (MV3)', 'ChatGPT / Gemini / Claude'],
                titleKey: 'ai_chat_optimizer.title',
                descriptionKey: 'ai_chat_optimizer.description',
                actionLinks: [
                    {
                        label: 'Chrome Web Store',
                        url: 'https://chromewebstore.google.com/detail/stz-ai-chat-optimizer/fhfjgfncohmbapjpdbkhgaiooffmiabj?authuser=3&hl=pt-BR',
                        variant: 'primary',
                    },
                    {
                        label: 'Firefox Add-ons',
                        url: 'https://addons.mozilla.org/pt-BR/firefox/addon/stz-ai-chat-optimizer/',
                        variant: 'primary',
                    },
                ],
            },
            showcase: [
                {
                    image: '/images/projects/stz-ai-chat-optimizer/cover/cover.png',
                    alt: 'STZ Ai Chat Optimizer cover preview',
                    kickerKey: 'ai_chat_optimizer.showcase.cover_kicker',
                    titleKey: 'ai_chat_optimizer.showcase.cover_title',
                    descriptionKey: 'ai_chat_optimizer.showcase.cover_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-ai-chat-optimizer/crops/screenshot_1.png',
                    alt: 'STZ Ai Chat Optimizer screenshot 1',
                    kickerKey: 'ai_chat_optimizer.showcase.screenshot_1_kicker',
                    titleKey: 'ai_chat_optimizer.showcase.screenshot_1_title',
                    descriptionKey: 'ai_chat_optimizer.showcase.screenshot_1_desc',
                    align: 'image-right',
                },
            ],
            features: [
                {
                    titleKey: 'ai_chat_optimizer.features.hide_title',
                    descriptionKey: 'ai_chat_optimizer.features.hide_desc',
                },
                {
                    titleKey: 'ai_chat_optimizer.features.flow_title',
                    descriptionKey: 'ai_chat_optimizer.features.flow_desc',
                },
                {
                    titleKey: 'ai_chat_optimizer.features.sites_title',
                    descriptionKey: 'ai_chat_optimizer.features.sites_desc',
                },
                {
                    titleKey: 'ai_chat_optimizer.features.local_title',
                    descriptionKey: 'ai_chat_optimizer.features.local_desc',
                },
            ],
            specs: [
                { labelKey: 'ai_chat_optimizer.specs.version', value: 'v1.0.0' },
                { labelKey: 'ai_chat_optimizer.specs.framework', value: 'WebExtension (MV3)' },
                { labelKey: 'ai_chat_optimizer.specs.language', value: 'JavaScript' },
                { labelKey: 'ai_chat_optimizer.specs.interface', value: 'HTML / CSS' },
                { labelKey: 'ai_chat_optimizer.specs.license', value: 'Proprietary' },
                { labelKey: 'ai_chat_optimizer.specs.platform', value: 'Chrome / Edge / Firefox-compatible' },
                { labelKey: 'ai_chat_optimizer.specs.target', value: 'ChatGPT / Gemini / Claude' },
            ],
        },
    },
    {
        slug: 'stz-pdf-suite',
        layoutType: 'bento',
        priority: 6.5,
        maturity: 'stable',
        repoName: 'stz-pdf-suite',
        titleKey: 'pdf_suite.title',
        descriptionKey: 'cards.pdf_suite_desc',
        downloadHref: 'https://github.com/starzynhobr/stz-pdf-suite/releases/latest',
        badgeLabel: '...',
        badgeVariant: 'stable',
        badgeAttrs: {
            'data-gh-repo': 'starzynhobr/stz-pdf-suite',
        },
        tags: [
            { labelKey: 'common.tags.windows' },
            { labelKey: 'common.tags.python' },
            { labelKey: 'common.tags.pdf' },
        ],
        detailLabelKey: 'cards.btn_details',
        downloadLabelKey: 'cards.btn_download',
        detail: {
            meta: {
                title: 'STZ PDF Suite | STZ LABS',
                description:
                    'Aplicativo desktop para fluxos em lote de PDF e imagem, com interface Qt Quick/QML e instalador Windows.',
                ogDescription:
                    'Suite desktop para mesclar, reorganizar, converter e processar PDFs e imagens.',
            },
            hero: {
                tags: ['Python 3.12', 'PySide6/QML', 'PyMuPDF'],
                titleKey: 'pdf_suite.title',
                descriptionKey: 'pdf_suite.description',
                githubUrl: 'https://github.com/starzynhobr/stz-pdf-suite',
                githubLabelKey: 'pdf_suite.btn_github',
            },
            showcase: [
                {
                    image: '/images/projects/stz-pdf-suite/showcase/merge-pdf.png',
                    alt: 'STZ PDF Suite Merge PDF module',
                    kickerKey: 'pdf_suite.showcase.merge_kicker',
                    titleKey: 'pdf_suite.showcase.merge_title',
                    descriptionKey: 'pdf_suite.showcase.merge_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-pdf-suite/showcase/image-to-pdf.png',
                    alt: 'STZ PDF Suite Image to PDF module',
                    kickerKey: 'pdf_suite.showcase.image_pdf_kicker',
                    titleKey: 'pdf_suite.showcase.image_pdf_title',
                    descriptionKey: 'pdf_suite.showcase.image_pdf_desc',
                    align: 'image-right',
                },
                {
                    image: '/images/projects/stz-pdf-suite/showcase/pdf-to-image.png',
                    alt: 'STZ PDF Suite PDF to Image settings drawer',
                    kickerKey: 'pdf_suite.showcase.pdf_image_kicker',
                    titleKey: 'pdf_suite.showcase.pdf_image_title',
                    descriptionKey: 'pdf_suite.showcase.pdf_image_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-pdf-suite/showcase/image-convert.png',
                    alt: 'STZ PDF Suite Image Convert module',
                    kickerKey: 'pdf_suite.showcase.image_convert_kicker',
                    titleKey: 'pdf_suite.showcase.image_convert_title',
                    descriptionKey: 'pdf_suite.showcase.image_convert_desc',
                    align: 'image-right',
                },
                {
                    image: '/images/projects/stz-pdf-suite/showcase/pdf-insert.png',
                    alt: 'STZ PDF Suite PDF Insert module',
                    kickerKey: 'pdf_suite.showcase.pdf_insert_kicker',
                    titleKey: 'pdf_suite.showcase.pdf_insert_title',
                    descriptionKey: 'pdf_suite.showcase.pdf_insert_desc',
                    align: 'image-left',
                },
                {
                    image: '/images/projects/stz-pdf-suite/showcase/post-process.png',
                    alt: 'STZ PDF Suite Post Process settings drawer',
                    kickerKey: 'pdf_suite.showcase.post_process_kicker',
                    titleKey: 'pdf_suite.showcase.post_process_title',
                    descriptionKey: 'pdf_suite.showcase.post_process_desc',
                    align: 'image-right',
                },
                {
                    image: '/images/projects/stz-pdf-suite/showcase/reorder.png',
                    alt: 'STZ PDF Suite Reorder module',
                    kickerKey: 'pdf_suite.showcase.reorder_kicker',
                    titleKey: 'pdf_suite.showcase.reorder_title',
                    descriptionKey: 'pdf_suite.showcase.reorder_desc',
                    align: 'image-left',
                },
            ],
            features: [
                {
                    titleKey: 'pdf_suite.features.merge_title',
                    descriptionKey: 'pdf_suite.features.merge_desc',
                },
                {
                    titleKey: 'pdf_suite.features.reorder_title',
                    descriptionKey: 'pdf_suite.features.reorder_desc',
                },
                {
                    titleKey: 'pdf_suite.features.convert_title',
                    descriptionKey: 'pdf_suite.features.convert_desc',
                },
                {
                    titleKey: 'pdf_suite.features.insert_title',
                    descriptionKey: 'pdf_suite.features.insert_desc',
                },
                {
                    titleKey: 'pdf_suite.features.batch_title',
                    descriptionKey: 'pdf_suite.features.batch_desc',
                },
                {
                    titleKey: 'pdf_suite.features.ui_title',
                    descriptionKey: 'pdf_suite.features.ui_desc',
                },
            ],
            specs: [
                { labelKey: 'pdf_suite.specs.version', repoName: 'stz-pdf-suite' },
                { labelKey: 'pdf_suite.specs.platform', value: 'Windows 11 recommended' },
                { labelKey: 'pdf_suite.specs.language', value: 'Python 3.12' },
                { labelKey: 'pdf_suite.specs.interface', value: 'PySide6 + QML' },
                { labelKey: 'pdf_suite.specs.packaging', value: 'Nuitka + Inno Setup' },
                { labelKey: 'pdf_suite.specs.license', value: 'GPL-3.0 / Commercial' },
            ],
        },
    },
    {
        slug: 'mouse-click',
        layoutType: 'list',
        priority: 7,
        maturity: 'stable',
        repoName: 'mouse-click',
        titleKey: 'mouse_click.title',
        descriptionKey: 'cards.mouse_click_desc',
        downloadHref: 'https://github.com/starzynhobr/mouse-click/releases/latest',
        badgeLabel: '...',
        badgeVariant: 'stable',
        badgeAttrs: {
            'data-gh-repo': 'starzynhobr/mouse-click',
        },
        tags: [
            { labelKey: 'common.tags.windows' },
            { labelKey: 'common.tags.tools' },
            { labelKey: 'common.tags.python' },
        ],
        detailLabelKey: 'cards.btn_details',
        downloadLabelKey: 'cards.btn_download',
        detail: {
            meta: {
                title: 'AutoClicker Pro | STZ LABS',
                description:
                    'Auto-clicker leve e moderno para Windows com modo hold-to-click e controle de CPS.',
                ogDescription:
                    'Auto-clicker leve para Windows com modo hold-to-click, CPS ajustável e hook preciso.',
            },
            hero: {
                tags: ['Python 3.12', 'CustomTkinter', 'Low-level Hook'],
                titleKey: 'mouse_click.title',
                descriptionKey: 'mouse_click.description',
                githubUrl: 'https://github.com/starzynhobr/mouse-click',
                githubLabelKey: 'mouse_click.btn_github',
            },
            gallery: [
                {
                    src: '/images/projects/mouse-click/cover/cover.png',
                    alt: 'AutoClicker Pro cover preview',
                    variant: 'hero',
                },
            ],
            features: [
                {
                    titleKey: 'mouse_click.features.ui_title',
                    descriptionKey: 'mouse_click.features.ui_desc',
                },
                {
                    titleKey: 'mouse_click.features.cps_title',
                    descriptionKey: 'mouse_click.features.cps_desc',
                },
                {
                    titleKey: 'mouse_click.features.hold_title',
                    descriptionKey: 'mouse_click.features.hold_desc',
                },
                {
                    titleKey: 'mouse_click.features.hook_title',
                    descriptionKey: 'mouse_click.features.hook_desc',
                },
                {
                    titleKey: 'mouse_click.features.hotkey_title',
                    descriptionKey: 'mouse_click.features.hotkey_desc',
                },
                {
                    titleKey: 'mouse_click.features.tray_title',
                    descriptionKey: 'mouse_click.features.tray_desc',
                },
            ],
            specs: [
                { labelKey: 'mouse_click.specs.version', value: 'Latest' },
                { labelKey: 'mouse_click.specs.platform', value: 'Windows 10/11' },
                { labelKey: 'mouse_click.specs.language', value: 'Python 3.12' },
                { labelKey: 'mouse_click.specs.activation', value: 'Middle Click / Hotkey' },
                { labelKey: 'mouse_click.specs.license', value: 'GPL-3.0 License' },
            ],
        },
    },
    {
        slug: 'stz-suite',
        layoutType: 'featured',
        priority: 1,
        maturity: 'stable',
        repoName: 'stz-suite-releases',
        titleKey: 'cards.suite_title',
        descriptionKey: 'cards.suite_desc',
        downloadHref: 'https://github.com/starzynhobr/stz-suite-releases/releases/download/stz-suite-base-v0.1.0/STZ-Suite-Base-0.1.0-Setup.exe',
        badgeLabel: 'v0.1.0',
        badgeVariant: 'stable',
        coverImage: '/images/projects/stz-suite/plugins/fetchora/home.png',
        tags: [
            { labelKey: 'common.tags.windows' },
            { labelKey: 'common.tags.plugins' },
            { labelKey: 'common.tags.offline' },
        ],
        detailLabelKey: 'cards.btn_details',
        downloadLabelKey: 'cards.btn_download',
        detail: {
            customPage: 'suite',
            meta: {
                title: 'STZ Suite | STZ LABS',
                description: 'Ecossistema modular de ferramentas para Windows com plugins instalados sob demanda.',
                ogDescription: 'Uma base leve e oito ferramentas modulares para produtividade, mídia e automação.',
            },
        },
    },
];
