/** Catálogo de plugins da STZ Suite — usado na página da Suite e no destaque da home. */

export const plugins = [
    {
        id: 'fetchora', version: '0.1.0', name: 'Fetchora', category: { pt: 'Mídia', en: 'Media' }, image: '/images/projects/stz-suite/plugins/fetchora/home.png', images: ['/images/projects/stz-suite/plugins/fetchora/detail.png', '/images/projects/stz-suite/plugins/fetchora/home.png'],
        description: { pt: 'Baixe mídia da web e converta arquivos locais de áudio e vídeo com filas, pastas e presets.', en: 'Download media from the web and convert local audio and video files with queues, folders, and presets.' },
        features: { pt: ['Download por URL com yt-dlp', 'Conversão local e em lote', 'FFmpeg e Deno integrados'], en: ['URL downloads with yt-dlp', 'Local and batch conversion', 'Bundled FFmpeg and Deno'] },
    },
    {
        id: 'lumio', version: '0.2.0', name: 'Lumio', category: { pt: 'Leitura', en: 'Reading' }, image: '/images/projects/stz-suite/plugins/lumio/home.png', images: ['/images/projects/stz-suite/plugins/lumio/detail-1.png', '/images/projects/stz-suite/plugins/lumio/detail-2.png', '/images/projects/stz-suite/plugins/lumio/detail-3.png', '/images/projects/stz-suite/plugins/lumio/home.png'],
        description: { pt: 'Organize e leia sua biblioteca local de PDF, EPUB, CBZ e CBR com progresso salvo.', en: 'Organize and read your local PDF, EPUB, CBZ, and CBR library with saved progress.' },
        features: { pt: ['PDF, EPUB, CBZ e CBR', 'Biblioteca e recentes', 'Progresso e preferências'], en: ['PDF, EPUB, CBZ, and CBR', 'Library and recents', 'Progress and preferences'] },
    },
    {
        id: 'reperto', version: '0.1.1', name: 'Reperto', category: { pt: 'Catálogo', en: 'Catalog' }, image: '/images/projects/stz-suite/plugins/reperto/home.png', images: ['/images/projects/stz-suite/plugins/reperto/detail-2.png', '/images/projects/stz-suite/plugins/reperto/detail-1.png', '/images/projects/stz-suite/plugins/reperto/home.png'],
        description: { pt: 'Acompanhe livros e outras mídias que você planeja consumir, está consumindo ou já concluiu.', en: 'Track books and other media you plan to consume, are consuming, or have completed.' },
        features: { pt: ['Status, notas e avaliações', 'Capas armazenadas localmente', 'Busca online de livros'], en: ['Statuses, notes, and ratings', 'Locally stored covers', 'Online book search'] },
    },
    {
        id: 'tempoza', version: '1.2.0', name: 'Tempoza', category: { pt: 'Foco', en: 'Focus' }, image: '/images/projects/stz-suite/plugins/tempoza/home.png', images: ['/images/projects/stz-suite/plugins/tempoza/detail-1.png', '/images/projects/stz-suite/plugins/tempoza/detail-2.png', '/images/projects/stz-suite/plugins/tempoza/home.png'],
        description: { pt: 'Timer de foco e pausa com presets, áudio ambiente, alarmes e preferências persistentes.', en: 'Focus and break timer with presets, background audio, alarms, and persistent preferences.' },
        features: { pt: ['Ciclos de foco e pausa', 'Áudio ambiente e alarmes', 'Presets persistentes'], en: ['Focus and break cycles', 'Background audio and alarms', 'Persistent presets'] },
    },
    {
        id: 'ordelya', version: '0.1.0', name: 'Ordelya', category: { pt: 'Produtividade', en: 'Productivity' }, image: '/images/projects/stz-suite/plugins/ordelya/home.png', images: ['/images/projects/stz-suite/plugins/ordelya/detail-1.png', '/images/projects/stz-suite/plugins/ordelya/detail-2.png', '/images/projects/stz-suite/plugins/ordelya/home.png'],
        description: { pt: 'Planeje tarefas do dia com projetos, etapas, rotinas e lembretes.', en: 'Plan your day with tasks, projects, steps, routines, and reminders.' },
        features: { pt: ['Hoje, próximos e concluídos', 'Projetos, etapas e tags', 'Rotinas e lembretes'], en: ['Today, upcoming, and completed', 'Projects, steps, and tags', 'Routines and reminders'] },
    },
    {
        id: 'orbhia', version: '0.2.0', name: 'Orbhia', category: { pt: 'Finanças', en: 'Finance' }, image: '/images/projects/stz-suite/plugins/orbhia/home.png', images: ['/images/projects/stz-suite/plugins/orbhia/detail-2.png', '/images/projects/stz-suite/plugins/orbhia/detail-1.png', '/images/projects/stz-suite/plugins/orbhia/detail-3.png', '/images/projects/stz-suite/plugins/orbhia/home.png'],
        description: { pt: 'Organize metas financeiras, compras, parcelas e assinaturas em um só lugar.', en: 'Organize financial goals, purchases, installments, and subscriptions in one place.' },
        features: { pt: ['Metas e compras', 'Parcelas e assinaturas', 'Sincronização opcional'], en: ['Goals and purchases', 'Installments and subscriptions', 'Optional synchronization'] },
    },
    {
        id: 'glotiva', version: '0.1.0', name: 'Glotiva', category: { pt: 'Tradução', en: 'Translation' }, image: '/images/projects/stz-suite/plugins/glotiva/home.png', images: ['/images/projects/stz-suite/plugins/glotiva/home.png'],
        description: { pt: 'Traduza textos localmente, instalando apenas os modelos dos idiomas que utiliza.', en: 'Translate text locally, installing only the language models you need.' },
        features: { pt: ['Tradução totalmente local', 'Modelos sob demanda', 'Pares configuráveis'], en: ['Fully local translation', 'On-demand models', 'Configurable language pairs'] },
    },
    {
        id: 'cursorium', version: '0.1.0', name: 'Cursorium', category: { pt: 'Automação', en: 'Automation' }, image: '/images/projects/stz-suite/plugins/cursorium/home.png', images: ['/images/projects/stz-suite/plugins/cursorium/detail.png', '/images/projects/stz-suite/plugins/cursorium/home.png'],
        description: { pt: 'Grave movimentos e cliques do mouse e reproduza automações com atalhos e repetição.', en: 'Record mouse movement and clicks, then replay automations with shortcuts and repetition.' },
        features: { pt: ['Gravação e reprodução', 'Atalhos globais', 'Histórico e repetição'], en: ['Record and replay', 'Global shortcuts', 'History and repetition'] },
    },
    {
        id: 'tunerium', version: '0.1.0', name: 'Tunerium', category: { pt: 'Sistema', en: 'System' }, image: '/images/projects/stz-suite/plugins/tunerium/home.png', images: ['/images/projects/stz-suite/plugins/tunerium/detail.png', '/images/projects/stz-suite/plugins/tunerium/home.png'],
        description: { pt: 'Diagnostique a conexão e acesse ajustes controlados de manutenção do Windows.', en: 'Diagnose your connection and access controlled Windows maintenance adjustments.' },
        features: { pt: ['Ping e traceroute', 'Histórico de diagnósticos', 'Ajustes de registro'], en: ['Ping and traceroute', 'Diagnostic history', 'Registry adjustments'] },
    },
];

const pluginLocales = {
    es: {
        fetchora: { category: 'Multimedia', description: 'Descarga contenido multimedia de la web y convierte archivos locales de audio y vídeo con colas, carpetas y presets.', features: ['Descargas por URL con yt-dlp', 'Conversión local y por lotes', 'FFmpeg y Deno incluidos'] },
        lumio: { category: 'Lectura', description: 'Organiza y lee tu biblioteca local de PDF, EPUB, CBZ y CBR con el progreso guardado.', features: ['PDF, EPUB, CBZ y CBR', 'Biblioteca y recientes', 'Progreso y preferencias'] },
        reperto: { category: 'Catálogo', description: 'Lleva un registro de los libros y otros contenidos que planeas consumir, estás consumiendo o ya terminaste.', features: ['Estados, notas y valoraciones', 'Portadas almacenadas localmente', 'Búsqueda de libros en línea'] },
        tempoza: { category: 'Concentración', description: 'Temporizador de concentración y descanso con presets, audio ambiental, alarmas y preferencias persistentes.', features: ['Ciclos de concentración y descanso', 'Audio ambiental y alarmas', 'Presets persistentes'] },
        ordelya: { category: 'Productividad', description: 'Planifica tus tareas del día con proyectos, pasos, rutinas y recordatorios.', features: ['Hoy, próximos y completados', 'Proyectos, pasos y etiquetas', 'Rutinas y recordatorios'] },
        orbhia: { category: 'Finanzas', description: 'Organiza objetivos financieros, compras, cuotas y suscripciones en un solo lugar.', features: ['Objetivos y compras', 'Cuotas y suscripciones', 'Sincronización opcional'] },
        glotiva: { category: 'Traducción', description: 'Traduce textos localmente e instala únicamente los modelos de idioma que necesitas.', features: ['Traducción completamente local', 'Modelos bajo demanda', 'Pares de idiomas configurables'] },
        cursorium: { category: 'Automatización', description: 'Graba movimientos y clics del ratón y reproduce automatizaciones con atajos y repeticiones.', features: ['Grabación y reproducción', 'Atajos globales', 'Historial y repeticiones'] },
        tunerium: { category: 'Sistema', description: 'Diagnostica tu conexión y accede a ajustes controlados de mantenimiento de Windows.', features: ['Ping y traceroute', 'Historial de diagnósticos', 'Ajustes del registro'] },
    },
    fr: {
        fetchora: { category: 'Médias', description: 'Téléchargez des médias depuis le Web et convertissez des fichiers audio et vidéo locaux avec des files d’attente, des dossiers et des préréglages.', features: ['Téléchargement par URL avec yt-dlp', 'Conversion locale et par lots', 'FFmpeg et Deno inclus'] },
        lumio: { category: 'Lecture', description: 'Organisez et lisez votre bibliothèque locale de PDF, EPUB, CBZ et CBR avec progression enregistrée.', features: ['PDF, EPUB, CBZ et CBR', 'Bibliothèque et éléments récents', 'Progression et préférences'] },
        reperto: { category: 'Catalogue', description: 'Suivez les livres et autres médias que vous prévoyez de consulter, que vous consultez ou que vous avez terminés.', features: ['Statuts, notes et évaluations', 'Couvertures stockées localement', 'Recherche de livres en ligne'] },
        tempoza: { category: 'Concentration', description: 'Minuteur de concentration et de pause avec préréglages, ambiance sonore, alarmes et préférences persistantes.', features: ['Cycles de concentration et de pause', 'Ambiance sonore et alarmes', 'Préréglages persistants'] },
        ordelya: { category: 'Productivité', description: 'Planifiez vos tâches quotidiennes avec des projets, des étapes, des routines et des rappels.', features: ['Aujourd’hui, à venir et terminées', 'Projets, étapes et étiquettes', 'Routines et rappels'] },
        orbhia: { category: 'Finances', description: 'Organisez vos objectifs financiers, achats, paiements échelonnés et abonnements au même endroit.', features: ['Objectifs et achats', 'Paiements et abonnements', 'Synchronisation facultative'] },
        glotiva: { category: 'Traduction', description: 'Traduisez vos textes localement en installant uniquement les modèles linguistiques nécessaires.', features: ['Traduction entièrement locale', 'Modèles à la demande', 'Paires de langues configurables'] },
        cursorium: { category: 'Automatisation', description: 'Enregistrez les mouvements et clics de la souris, puis rejouez les automatisations avec des raccourcis et des répétitions.', features: ['Enregistrement et lecture', 'Raccourcis globaux', 'Historique et répétitions'] },
        tunerium: { category: 'Système', description: 'Diagnostiquez votre connexion et accédez à des réglages contrôlés de maintenance Windows.', features: ['Ping et traceroute', 'Historique des diagnostics', 'Réglages du registre'] },
    },
    de: {
        fetchora: { category: 'Medien', description: 'Lade Medien aus dem Web herunter und konvertiere lokale Audio- und Videodateien mit Warteschlangen, Ordnern und Voreinstellungen.', features: ['URL-Downloads mit yt-dlp', 'Lokale und Stapelkonvertierung', 'FFmpeg und Deno enthalten'] },
        lumio: { category: 'Lesen', description: 'Organisiere und lies deine lokale PDF-, EPUB-, CBZ- und CBR-Bibliothek mit gespeichertem Fortschritt.', features: ['PDF, EPUB, CBZ und CBR', 'Bibliothek und zuletzt geöffnet', 'Fortschritt und Einstellungen'] },
        reperto: { category: 'Katalog', description: 'Verfolge Bücher und andere Medien, die du noch nutzen möchtest, gerade nutzt oder bereits abgeschlossen hast.', features: ['Status, Notizen und Bewertungen', 'Lokal gespeicherte Cover', 'Online-Buchsuche'] },
        tempoza: { category: 'Fokus', description: 'Fokus- und Pausentimer mit Voreinstellungen, Hintergrundklängen, Alarmen und dauerhaften Einstellungen.', features: ['Fokus- und Pausenzyklen', 'Hintergrundklänge und Alarme', 'Dauerhafte Voreinstellungen'] },
        ordelya: { category: 'Produktivität', description: 'Plane deine täglichen Aufgaben mit Projekten, Schritten, Routinen und Erinnerungen.', features: ['Heute, demnächst und erledigt', 'Projekte, Schritte und Tags', 'Routinen und Erinnerungen'] },
        orbhia: { category: 'Finanzen', description: 'Organisiere finanzielle Ziele, Einkäufe, Ratenzahlungen und Abonnements an einem Ort.', features: ['Ziele und Einkäufe', 'Raten und Abonnements', 'Optionale Synchronisierung'] },
        glotiva: { category: 'Übersetzung', description: 'Übersetze Texte lokal und installiere nur die Sprachmodelle, die du wirklich benötigst.', features: ['Vollständig lokale Übersetzung', 'Modelle bei Bedarf', 'Konfigurierbare Sprachpaare'] },
        cursorium: { category: 'Automatisierung', description: 'Zeichne Mausbewegungen und Klicks auf und spiele Automatisierungen mit Tastenkürzeln und Wiederholungen ab.', features: ['Aufzeichnen und Wiedergeben', 'Globale Tastenkürzel', 'Verlauf und Wiederholungen'] },
        tunerium: { category: 'System', description: 'Diagnostiziere deine Verbindung und greife auf kontrollierte Windows-Wartungseinstellungen zu.', features: ['Ping und Traceroute', 'Diagnoseverlauf', 'Registrierungseinstellungen'] },
    },
    it: {
        fetchora: { category: 'Media', description: 'Scarica contenuti multimediali dal Web e converti file audio e video locali con code, cartelle e preset.', features: ['Download tramite URL con yt-dlp', 'Conversione locale e in batch', 'FFmpeg e Deno inclusi'] },
        lumio: { category: 'Lettura', description: 'Organizza e leggi la tua libreria locale di PDF, EPUB, CBZ e CBR con avanzamento salvato.', features: ['PDF, EPUB, CBZ e CBR', 'Libreria e file recenti', 'Avanzamento e preferenze'] },
        reperto: { category: 'Catalogo', description: 'Tieni traccia dei libri e degli altri media che vuoi consultare, stai consultando o hai già completato.', features: ['Stati, note e valutazioni', 'Copertine archiviate localmente', 'Ricerca online di libri'] },
        tempoza: { category: 'Concentrazione', description: 'Timer per concentrazione e pausa con preset, audio di sottofondo, allarmi e preferenze persistenti.', features: ['Cicli di concentrazione e pausa', 'Audio di sottofondo e allarmi', 'Preset persistenti'] },
        ordelya: { category: 'Produttività', description: 'Pianifica le attività della giornata con progetti, passaggi, routine e promemoria.', features: ['Oggi, in arrivo e completate', 'Progetti, passaggi e tag', 'Routine e promemoria'] },
        orbhia: { category: 'Finanze', description: 'Organizza obiettivi finanziari, acquisti, rate e abbonamenti in un unico posto.', features: ['Obiettivi e acquisti', 'Rate e abbonamenti', 'Sincronizzazione facoltativa'] },
        glotiva: { category: 'Traduzione', description: 'Traduci testi localmente installando solo i modelli linguistici di cui hai bisogno.', features: ['Traduzione completamente locale', 'Modelli su richiesta', 'Coppie linguistiche configurabili'] },
        cursorium: { category: 'Automazione', description: 'Registra movimenti e clic del mouse e riproduci le automazioni con scorciatoie e ripetizioni.', features: ['Registrazione e riproduzione', 'Scorciatoie globali', 'Cronologia e ripetizioni'] },
        tunerium: { category: 'Sistema', description: 'Diagnostica la connessione e accedi a regolazioni controllate per la manutenzione di Windows.', features: ['Ping e traceroute', 'Cronologia diagnostica', 'Regolazioni del registro'] },
    },
};

/** Texto do plugin no idioma pedido; PT e EN ficam no próprio plugin, os demais em pluginLocales. */
export function getPluginText(plugin, locale, field) {
    return plugin[field][locale] || pluginLocales[locale]?.[plugin.id]?.[field] || plugin[field].en;
}
