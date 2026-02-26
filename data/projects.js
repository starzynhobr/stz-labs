export const projects = [
    {
        slug: 'game-xml-translator',
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
                title: 'Game XML Translator | STZ LABS',
                description:
                    'Ferramenta automatizada para tradução de arquivos XML de jogos usando Python e a API do Gemini.',
                ogDescription: 'Ferramenta automatizada para tradução de arquivos XML de jogos.',
            },
            hero: {
                tags: ['Python 3.11', 'CustomTkinter', 'Gemini API'],
                titleKey: 'game_xml.title',
                descriptionKey: 'game_xml.description',
                githubUrl: 'https://github.com/starzynhobr/Game-XML-Translator',
                githubLabelKey: 'game_xml.btn_github',
            },
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
                { labelKey: 'game_xml.specs.version', value: 'v1.2 (Maintenance)' },
                { labelKey: 'game_xml.specs.platform', value: 'Windows 10/11' },
                { labelKey: 'game_xml.specs.language', value: 'Python 3.11' },
                { labelKey: 'game_xml.specs.compilation', value: 'Nuitka Standalone' },
                { labelKey: 'game_xml.specs.license', value: 'GPL-3.0 License' },
                { labelKey: 'game_xml.specs.requirements', value: 'API Key (Google AI)' },
            ],
        },
    },
    {
        slug: 'stz-lyrics',
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
            gallery: [
                {
                    src: '/images/projects/stz-lyrics-overlay/hero/cover.png',
                    alt: 'STZ Lyrics Overlay cover preview',
                    variant: 'hero',
                },
                {
                    src: '/images/projects/stz-lyrics-overlay/crops/screenshot-1.png',
                    alt: 'STZ Lyrics Overlay screenshot 1',
                },
                {
                    src: '/images/projects/stz-lyrics-overlay/crops/screenshot-2.png',
                    alt: 'STZ Lyrics Overlay screenshot 2',
                },
                {
                    src: '/images/projects/stz-lyrics-overlay/crops/screenshot-3.png',
                    alt: 'STZ Lyrics Overlay screenshot 3',
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
        slug: 'mouse-click',
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
        titleKey: 'cards.suite_title',
        descriptionKey: 'cards.suite_desc',
        versionKey: 'cards.version_dev',
        downloadHref: null,
        badgeLabelKey: 'common.badges.soon',
        badgeVariant: 'beta',
        tags: [
            { labelKey: 'common.tags.windows' },
            { labelKey: 'common.tags.plugins' },
            { labelKey: 'common.tags.offline' },
        ],
        actionButtons: [
            {
                labelKey: 'cards.btn_soon',
                variant: 'primary',
                style: {
                    pointerEvents: 'none',
                    opacity: 0.5,
                    filter: 'grayscale(1)',
                },
            },
            {
                labelKey: 'cards.btn_changelog',
                variant: 'secondary',
                style: {
                    pointerEvents: 'none',
                    opacity: 0.3,
                },
            },
        ],
        style: { opacity: 0.8 },
    },
];
