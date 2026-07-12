"use client";

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

const RELEASES_URL = 'https://github.com/starzynhobr/stz-suite-releases/releases';
const INSTALLER_URL = `${RELEASES_URL}/download/stz-suite-base-v0.1.0/STZ-Suite-Base-0.1.0-Setup.exe`;

const plugins = [
    {
        id: 'fetchora', name: 'Fetchora', category: { pt: 'Mídia', en: 'Media' }, image: '/images/projects/stz-suite/plugins/fetchora/home.png', images: ['/images/projects/stz-suite/plugins/fetchora/detail.png', '/images/projects/stz-suite/plugins/fetchora/home.png'],
        description: { pt: 'Baixe mídia da web e converta arquivos locais de áudio e vídeo com filas, pastas e presets.', en: 'Download media from the web and convert local audio and video files with queues, folders, and presets.' },
        features: { pt: ['Download por URL com yt-dlp', 'Conversão local e em lote', 'FFmpeg e Deno integrados'], en: ['URL downloads with yt-dlp', 'Local and batch conversion', 'Bundled FFmpeg and Deno'] },
    },
    {
        id: 'lumio', name: 'Lumio', category: { pt: 'Leitura', en: 'Reading' }, image: '/images/projects/stz-suite/plugins/lumio/home.png', images: ['/images/projects/stz-suite/plugins/lumio/detail-1.png', '/images/projects/stz-suite/plugins/lumio/detail-2.png', '/images/projects/stz-suite/plugins/lumio/detail-3.png', '/images/projects/stz-suite/plugins/lumio/home.png'],
        description: { pt: 'Organize e leia sua biblioteca local de PDF, EPUB, CBZ e CBR com progresso salvo.', en: 'Organize and read your local PDF, EPUB, CBZ, and CBR library with saved progress.' },
        features: { pt: ['PDF, EPUB, CBZ e CBR', 'Biblioteca e recentes', 'Progresso e preferências'], en: ['PDF, EPUB, CBZ, and CBR', 'Library and recents', 'Progress and preferences'] },
    },
    {
        id: 'reperto', name: 'Reperto', category: { pt: 'Catálogo', en: 'Catalog' }, image: '/images/projects/stz-suite/plugins/reperto/home.png', images: ['/images/projects/stz-suite/plugins/reperto/detail-2.png', '/images/projects/stz-suite/plugins/reperto/detail-1.png', '/images/projects/stz-suite/plugins/reperto/home.png'],
        description: { pt: 'Acompanhe livros e outras mídias que você planeja consumir, está consumindo ou já concluiu.', en: 'Track books and other media you plan to consume, are consuming, or have completed.' },
        features: { pt: ['Status, notas e avaliações', 'Capas armazenadas localmente', 'Busca online de livros'], en: ['Statuses, notes, and ratings', 'Locally stored covers', 'Online book search'] },
    },
    {
        id: 'tempoza', name: 'Tempoza', category: { pt: 'Foco', en: 'Focus' }, image: '/images/projects/stz-suite/plugins/tempoza/home.png', images: ['/images/projects/stz-suite/plugins/tempoza/detail-1.png', '/images/projects/stz-suite/plugins/tempoza/detail-2.png', '/images/projects/stz-suite/plugins/tempoza/home.png'],
        description: { pt: 'Timer de foco e pausa com presets, áudio ambiente, alarmes e preferências persistentes.', en: 'Focus and break timer with presets, background audio, alarms, and persistent preferences.' },
        features: { pt: ['Ciclos de foco e pausa', 'Áudio ambiente e alarmes', 'Presets persistentes'], en: ['Focus and break cycles', 'Background audio and alarms', 'Persistent presets'] },
    },
    {
        id: 'orbhia', name: 'Orbhia', category: { pt: 'Finanças', en: 'Finance' }, image: '/images/projects/stz-suite/plugins/orbhia/home.png', images: ['/images/projects/stz-suite/plugins/orbhia/detail-2.png', '/images/projects/stz-suite/plugins/orbhia/detail-1.png', '/images/projects/stz-suite/plugins/orbhia/detail-3.png', '/images/projects/stz-suite/plugins/orbhia/home.png'],
        description: { pt: 'Organize metas financeiras, compras, parcelas e assinaturas em um só lugar.', en: 'Organize financial goals, purchases, installments, and subscriptions in one place.' },
        features: { pt: ['Metas e compras', 'Parcelas e assinaturas', 'Sincronização opcional'], en: ['Goals and purchases', 'Installments and subscriptions', 'Optional synchronization'] },
    },
    {
        id: 'glotiva', name: 'Glotiva', category: { pt: 'Tradução', en: 'Translation' }, image: '/images/projects/stz-suite/plugins/glotiva/home.png', images: ['/images/projects/stz-suite/plugins/glotiva/home.png'],
        description: { pt: 'Traduza textos localmente, instalando apenas os modelos dos idiomas que utiliza.', en: 'Translate text locally, installing only the language models you need.' },
        features: { pt: ['Tradução totalmente local', 'Modelos sob demanda', 'Pares configuráveis'], en: ['Fully local translation', 'On-demand models', 'Configurable language pairs'] },
    },
    {
        id: 'cursorium', name: 'Cursorium', category: { pt: 'Automação', en: 'Automation' }, image: '/images/projects/stz-suite/plugins/cursorium/home.png', images: ['/images/projects/stz-suite/plugins/cursorium/detail.png', '/images/projects/stz-suite/plugins/cursorium/home.png'],
        description: { pt: 'Grave movimentos e cliques do mouse e reproduza automações com atalhos e repetição.', en: 'Record mouse movement and clicks, then replay automations with shortcuts and repetition.' },
        features: { pt: ['Gravação e reprodução', 'Atalhos globais', 'Histórico e repetição'], en: ['Record and replay', 'Global shortcuts', 'History and repetition'] },
    },
    {
        id: 'tunerium', name: 'Tunerium', category: { pt: 'Sistema', en: 'System' }, image: '/images/projects/stz-suite/plugins/tunerium/home.png', images: ['/images/projects/stz-suite/plugins/tunerium/detail.png', '/images/projects/stz-suite/plugins/tunerium/home.png'],
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
        orbhia: { category: 'Finanze', description: 'Organizza obiettivi finanziari, acquisti, rate e abbonamenti in un unico posto.', features: ['Obiettivi e acquisti', 'Rate e abbonamenti', 'Sincronizzazione facoltativa'] },
        glotiva: { category: 'Traduzione', description: 'Traduci testi localmente installando solo i modelli linguistici di cui hai bisogno.', features: ['Traduzione completamente locale', 'Modelli su richiesta', 'Coppie linguistiche configurabili'] },
        cursorium: { category: 'Automazione', description: 'Registra movimenti e clic del mouse e riproduci le automazioni con scorciatoie e ripetizioni.', features: ['Registrazione e riproduzione', 'Scorciatoie globali', 'Cronologia e ripetizioni'] },
        tunerium: { category: 'Sistema', description: 'Diagnostica la connessione e accedi a regolazioni controllate per la manutenzione di Windows.', features: ['Ping e traceroute', 'Cronologia diagnostica', 'Regolazioni del registro'] },
    },
};

const copy = {
    pt: {
        eyebrow: 'Ecossistema modular para Windows', title: 'Uma base. Suas ferramentas.',
        description: 'A STZ Suite reúne utilitários independentes em uma única experiência. Instale somente os plugins que precisa e mantenha tudo organizado, atualizado e sob seu controle.',
        download: 'Baixar STZ Suite', releases: 'Ver todos os releases', flowTitle: 'Comece com uma base leve',
        flow: [['01', 'Instale a base', 'A Suite começa como um shell limpo, sem plugins desnecessários.'], ['02', 'Escolha os plugins', 'Abra Configurações → Plugins e monte sua própria coleção.'], ['03', 'Atualize com segurança', 'O catálogo oficial entrega versões verificadas diretamente pelo GitHub.']],
        catalogEyebrow: 'Catálogo oficial', catalogTitle: 'Oito ferramentas. Uma experiência.', catalogDescription: 'Veja tudo de uma vez e escolha um plugin para explorar os detalhes.',
        explore: 'Explorar plugins', included: 'Destaques', version: 'Versão 0.1.0', installNote: 'Instalado pela própria STZ Suite',
        architectureTitle: 'Modular por escolha. Local por princípio.', architectureDescription: 'A base permanece leve e cada ferramenta vive em seu próprio pacote. Arquivos e preferências ficam na sua máquina; dependências e modelos são baixados somente quando necessários.',
        architecture: ['Base sem plugins pré-instalados', 'Pacotes verificados por SHA-256', 'Processamento e dados locais', 'Atualizações pelo catálogo oficial'], planned: 'Em breve', cloudSyncTitle: 'Cloud sync planejado', cloudSyncDescription: 'Uma futura integração de sincronização em nuvem está nos planos para salvar dados e preferências dos plugins e facilitar o uso da Suite em diferentes dispositivos.', finalTitle: 'Monte a Suite do seu jeito.', finalDescription: 'Baixe a base para Windows e instale os plugins diretamente pela tela de configurações.', previousImage: 'Imagem anterior', nextImage: 'Próxima imagem', expandImage: 'Ampliar imagem', closeImage: 'Fechar imagem',
    },
    en: {
        eyebrow: 'Modular ecosystem for Windows', title: 'One base. Your tools.',
        description: 'STZ Suite brings independent utilities into one experience. Install only the plugins you need and keep everything organized, updated, and under your control.',
        download: 'Download STZ Suite', releases: 'View all releases', flowTitle: 'Start with a lightweight base',
        flow: [['01', 'Install the base', 'The Suite starts as a clean shell without unnecessary plugins.'], ['02', 'Choose your plugins', 'Open Settings → Plugins and build your own collection.'], ['03', 'Update safely', 'The official catalog delivers verified versions directly from GitHub.']],
        catalogEyebrow: 'Official catalog', catalogTitle: 'Eight tools. One experience.', catalogDescription: 'See everything at a glance and choose a plugin to explore the details.',
        explore: 'Explore plugins', included: 'Highlights', version: 'Version 0.1.0', installNote: 'Installed from inside STZ Suite',
        architectureTitle: 'Modular by choice. Local by principle.', architectureDescription: 'The base stays lightweight and each tool lives in its own package. Files and preferences remain on your computer; dependencies and models are downloaded only when needed.',
        architecture: ['No plugins preinstalled', 'SHA-256 verified packages', 'Local processing and data', 'Official catalog updates'], planned: 'Coming soon', cloudSyncTitle: 'Cloud sync planned', cloudSyncDescription: 'A future cloud synchronization integration is planned to save plugin data and preferences and make the Suite easier to use across different devices.', finalTitle: 'Build the Suite your way.', finalDescription: 'Download the Windows base and install plugins directly from Settings.', previousImage: 'Previous image', nextImage: 'Next image', expandImage: 'Enlarge image', closeImage: 'Close image',
    },
    es: {
        eyebrow: 'Ecosistema modular para Windows', title: 'Una base. Tus herramientas.',
        description: 'STZ Suite reúne utilidades independientes en una sola experiencia. Instala únicamente los plugins que necesitas y mantén todo organizado, actualizado y bajo tu control.',
        download: 'Descargar STZ Suite', releases: 'Ver todos los lanzamientos', flowTitle: 'Empieza con una base ligera',
        flow: [['01', 'Instala la base', 'La Suite empieza como una estructura limpia, sin plugins innecesarios.'], ['02', 'Elige tus plugins', 'Abre Configuración → Plugins y crea tu propia colección.'], ['03', 'Actualiza con seguridad', 'El catálogo oficial distribuye versiones verificadas directamente desde GitHub.']],
        catalogEyebrow: 'Catálogo oficial', catalogTitle: 'Ocho herramientas. Una experiencia.', catalogDescription: 'Descubre todo de un vistazo y elige un plugin para ver sus detalles.',
        explore: 'Explorar plugins', included: 'Características', version: 'Versión 0.1.0', installNote: 'Instalado desde la propia STZ Suite',
        architectureTitle: 'Modular por elección. Local por principio.', architectureDescription: 'La base se mantiene ligera y cada herramienta vive en su propio paquete. Los archivos y preferencias permanecen en tu equipo; las dependencias y los modelos se descargan solo cuando son necesarios.',
        architecture: ['Sin plugins preinstalados', 'Paquetes verificados con SHA-256', 'Procesamiento y datos locales', 'Actualizaciones mediante el catálogo oficial'], planned: 'Próximamente', cloudSyncTitle: 'Cloud sync planificado', cloudSyncDescription: 'Está prevista una futura integración de sincronización en la nube para guardar datos y preferencias de los plugins y facilitar el uso de la Suite en distintos dispositivos.', finalTitle: 'Crea la Suite a tu manera.', finalDescription: 'Descarga la base para Windows e instala los plugins directamente desde Configuración.', previousImage: 'Imagen anterior', nextImage: 'Imagen siguiente', expandImage: 'Ampliar imagen', closeImage: 'Cerrar imagen',
    },
    fr: {
        eyebrow: 'Écosystème modulaire pour Windows', title: 'Une base. Vos outils.',
        description: 'STZ Suite rassemble des utilitaires indépendants dans une expérience unique. Installez uniquement les plugins nécessaires et gardez le tout organisé, à jour et sous votre contrôle.',
        download: 'Télécharger STZ Suite', releases: 'Voir toutes les versions', flowTitle: 'Commencez avec une base légère',
        flow: [['01', 'Installez la base', 'La Suite démarre comme une structure épurée, sans plugins superflus.'], ['02', 'Choisissez vos plugins', 'Ouvrez Paramètres → Plugins et composez votre propre collection.'], ['03', 'Mettez à jour en toute sécurité', 'Le catalogue officiel fournit des versions vérifiées directement depuis GitHub.']],
        catalogEyebrow: 'Catalogue officiel', catalogTitle: 'Huit outils. Une expérience.', catalogDescription: 'Découvrez tout en un coup d’œil et choisissez un plugin pour en explorer les détails.',
        explore: 'Explorer les plugins', included: 'Points forts', version: 'Version 0.1.0', installNote: 'Installé directement depuis STZ Suite',
        architectureTitle: 'Modulaire par choix. Local par principe.', architectureDescription: 'La base reste légère et chaque outil dispose de son propre paquet. Les fichiers et préférences restent sur votre ordinateur ; les dépendances et modèles ne sont téléchargés qu’en cas de besoin.',
        architecture: ['Aucun plugin préinstallé', 'Paquets vérifiés par SHA-256', 'Traitement et données en local', 'Mises à jour via le catalogue officiel'], planned: 'Bientôt', cloudSyncTitle: 'Cloud sync prévu', cloudSyncDescription: 'Une future intégration de synchronisation dans le cloud est prévue afin de sauvegarder les données et préférences des plugins et de faciliter l’utilisation de la Suite sur plusieurs appareils.', finalTitle: 'Composez la Suite à votre façon.', finalDescription: 'Téléchargez la base Windows et installez les plugins directement depuis les paramètres.', previousImage: 'Image précédente', nextImage: 'Image suivante', expandImage: 'Agrandir l’image', closeImage: 'Fermer l’image',
    },
    de: {
        eyebrow: 'Modulares Ökosystem für Windows', title: 'Eine Basis. Deine Werkzeuge.',
        description: 'STZ Suite vereint unabhängige Programme in einer zentralen Oberfläche. Installiere nur die Plugins, die du benötigst, und behalte alles organisiert, aktuell und unter deiner Kontrolle.',
        download: 'STZ Suite herunterladen', releases: 'Alle Versionen anzeigen', flowTitle: 'Starte mit einer schlanken Basis',
        flow: [['01', 'Basis installieren', 'Die Suite startet als saubere Oberfläche ohne unnötige Plugins.'], ['02', 'Plugins auswählen', 'Öffne Einstellungen → Plugins und stelle deine eigene Sammlung zusammen.'], ['03', 'Sicher aktualisieren', 'Der offizielle Katalog liefert geprüfte Versionen direkt über GitHub.']],
        catalogEyebrow: 'Offizieller Katalog', catalogTitle: 'Acht Werkzeuge. Eine Oberfläche.', catalogDescription: 'Sieh dir alles auf einen Blick an und wähle ein Plugin aus, um mehr zu erfahren.',
        explore: 'Plugins entdecken', included: 'Highlights', version: 'Version 0.1.0', installNote: 'Direkt über STZ Suite installiert',
        architectureTitle: 'Bewusst modular. Konsequent lokal.', architectureDescription: 'Die Basis bleibt schlank und jedes Werkzeug befindet sich in einem eigenen Paket. Dateien und Einstellungen bleiben auf deinem Computer; Abhängigkeiten und Modelle werden nur bei Bedarf heruntergeladen.',
        architecture: ['Keine vorinstallierten Plugins', 'Mit SHA-256 geprüfte Pakete', 'Lokale Verarbeitung und Daten', 'Updates über den offiziellen Katalog'], planned: 'Demnächst', cloudSyncTitle: 'Cloud-Synchronisierung geplant', cloudSyncDescription: 'Eine zukünftige Cloud-Synchronisierung ist geplant, um Plugin-Daten und Einstellungen zu sichern und die Nutzung der Suite auf mehreren Geräten zu erleichtern.', finalTitle: 'Stelle deine Suite selbst zusammen.', finalDescription: 'Lade die Windows-Basis herunter und installiere Plugins direkt über die Einstellungen.', previousImage: 'Vorheriges Bild', nextImage: 'Nächstes Bild', expandImage: 'Bild vergrößern', closeImage: 'Bild schließen',
    },
    it: {
        eyebrow: 'Ecosistema modulare per Windows', title: 'Una base. I tuoi strumenti.',
        description: 'STZ Suite riunisce utility indipendenti in un’unica esperienza. Installa solo i plugin che ti servono e mantieni tutto organizzato, aggiornato e sotto il tuo controllo.',
        download: 'Scarica STZ Suite', releases: 'Vedi tutte le versioni', flowTitle: 'Inizia con una base leggera',
        flow: [['01', 'Installa la base', 'La Suite parte come una struttura pulita, senza plugin superflui.'], ['02', 'Scegli i plugin', 'Apri Impostazioni → Plugin e crea la tua raccolta personale.'], ['03', 'Aggiorna in sicurezza', 'Il catalogo ufficiale distribuisce versioni verificate direttamente da GitHub.']],
        catalogEyebrow: 'Catalogo ufficiale', catalogTitle: 'Otto strumenti. Un’unica esperienza.', catalogDescription: 'Scopri tutto a colpo d’occhio e scegli un plugin per esplorarne i dettagli.',
        explore: 'Esplora i plugin', included: 'Funzionalità principali', version: 'Versione 0.1.0', installNote: 'Installato direttamente da STZ Suite',
        architectureTitle: 'Modulare per scelta. Locale per principio.', architectureDescription: 'La base rimane leggera e ogni strumento vive nel proprio pacchetto. File e preferenze restano sul tuo computer; dipendenze e modelli vengono scaricati solo quando servono.',
        architecture: ['Nessun plugin preinstallato', 'Pacchetti verificati con SHA-256', 'Elaborazione e dati locali', 'Aggiornamenti dal catalogo ufficiale'], planned: 'Prossimamente', cloudSyncTitle: 'Cloud sync pianificato', cloudSyncDescription: 'È prevista una futura integrazione di sincronizzazione cloud per salvare dati e preferenze dei plugin e semplificare l’uso della Suite su dispositivi diversi.', finalTitle: 'Crea la Suite a modo tuo.', finalDescription: 'Scarica la base per Windows e installa i plugin direttamente dalle Impostazioni.', previousImage: 'Immagine precedente', nextImage: 'Immagine successiva', expandImage: 'Ingrandisci immagine', closeImage: 'Chiudi immagine',
    },
};

function PluginImage({ plugin, locale, className = '' }) {
    return (
        <div className={`relative overflow-hidden rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-3)] ${className}`}>
            <Image src={plugin.image} alt={`${plugin.name} — ${getPluginText(plugin, locale, 'category')}`} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
    );
}

function getPluginText(plugin, locale, field) {
    return plugin[field][locale] || pluginLocales[locale]?.[plugin.id]?.[field] || plugin[field].en;
}

export default function SuiteProjectPage() {
    const { lang } = useLanguage();
    const locale = copy[lang] ? lang : 'en';
    const text = copy[locale];
    const [activeId, setActiveId] = useState(plugins[0].id);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const tabRefs = useRef([]);
    const activePlugin = plugins.find((plugin) => plugin.id === activeId) || plugins[0];
    const hasMultipleImages = activePlugin.images.length > 1;

    const changeImage = useCallback((direction) => {
        setGalleryIndex((current) => (current + direction + activePlugin.images.length) % activePlugin.images.length);
    }, [activePlugin.images.length]);

    const selectPlugin = (id, shouldScroll = false) => {
        setActiveId(id);
        setGalleryIndex(0);
        if (shouldScroll) document.getElementById('suite-explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        if (!lightboxOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setLightboxOpen(false);
            if (event.key === 'ArrowLeft') changeImage(-1);
            if (event.key === 'ArrowRight') changeImage(1);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxOpen, changeImage]);

    const handleTabKeyDown = (event, index) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % plugins.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + plugins.length) % plugins.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = plugins.length - 1;
        selectPlugin(plugins[nextIndex].id);
        tabRefs.current[nextIndex]?.focus();
    };

    return (
        <main className="min-h-screen bg-transparent pb-24 pt-28 text-[var(--text-primary)]">
            <section className="container mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-6">
                    <Badge variant="stable" className="mb-6">STZ Suite 0.1.0</Badge>
                    <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">{text.eyebrow}</p>
                    <h1 className="mb-6 text-5xl font-bold tracking-[-0.05em] text-[var(--text-heading)] md:text-7xl">{text.title}</h1>
                    <p className="mb-9 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">{text.description}</p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="primary" size="default"><a href={INSTALLER_URL}>{text.download}</a></Button>
                        <Button asChild variant="secondary" size="default"><a href={RELEASES_URL} target="_blank" rel="noreferrer">{text.releases}</a></Button>
                    </div>
                </div>
                <div className="relative grid h-[430px] grid-cols-2 gap-3 lg:col-span-6">
                    <div className="grid gap-3 pt-10">
                        <PluginImage plugin={plugins[0]} locale={locale} />
                        <PluginImage plugin={plugins[3]} locale={locale} />
                    </div>
                    <div className="grid gap-3 pb-10">
                        <PluginImage plugin={plugins[1]} locale={locale} />
                        <PluginImage plugin={plugins[4]} locale={locale} />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
                </div>
            </section>

            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <div className="rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] p-6 shadow-[var(--shadow)] md:p-10">
                    <h2 className="mb-8 text-2xl font-bold text-[var(--text-heading)]">{text.flowTitle}</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {text.flow.map(([number, title, description]) => (
                            <article key={number} className="border-l-2 border-[var(--accent)]/30 pl-5">
                                <span className="font-mono text-xs font-bold text-[var(--accent)]">{number}</span>
                                <h3 className="mb-2 mt-3 font-bold text-[var(--text-heading)]">{title}</h3>
                                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <div className="mb-10 max-w-2xl">
                    <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">{text.catalogEyebrow}</p>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-[var(--text-heading)] md:text-5xl">{text.catalogTitle}</h2>
                    <p className="text-[var(--text-secondary)]">{text.catalogDescription}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {plugins.map((plugin) => (
                        <button key={plugin.id} type="button" onClick={() => selectPlugin(plugin.id, true)} className="group cursor-pointer overflow-hidden rounded-[var(--radius-card)] border text-left [border-color:var(--border-subtle)] bg-[var(--surface-primary)] shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:[border-color:var(--border-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                            <PluginImage plugin={plugin} locale={locale} className="aspect-[1.22/1] rounded-none border-0 border-b" />
                            <span className="block p-5">
                                <span className="mb-2 flex items-center justify-between gap-3"><strong className="text-lg text-[var(--text-heading)]">{plugin.name}</strong><span className="font-mono text-[9px] uppercase tracking-wider text-[var(--accent)]">{getPluginText(plugin, locale, 'category')}</span></span>
                                <span className="block text-sm leading-relaxed text-[var(--text-secondary)]">{getPluginText(plugin, locale, 'description')}</span>
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            <section id="suite-explorer" className="container mx-auto max-w-6xl scroll-mt-28 px-6 pb-24">
                <h2 className="mb-7 text-2xl font-bold text-[var(--text-heading)]">{text.explore}</h2>
                <div role="tablist" aria-label={text.explore} className="mb-5 flex gap-2 overflow-x-auto rounded-[var(--radius-card)] border p-2 [border-color:var(--border-subtle)] bg-[var(--surface-primary)]">
                    {plugins.map((plugin, index) => (
                        <button key={plugin.id} ref={(node) => { tabRefs.current[index] = node; }} id={`tab-${plugin.id}`} role="tab" aria-selected={activeId === plugin.id} aria-controls={`panel-${plugin.id}`} tabIndex={activeId === plugin.id ? 0 : -1} onClick={() => selectPlugin(plugin.id)} onKeyDown={(event) => handleTabKeyDown(event, index)} className={`min-w-max cursor-pointer rounded-[calc(var(--radius-card)*0.55)] px-5 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${activeId === plugin.id ? 'bg-[var(--accent)] text-white shadow-[0_0_24px_var(--accent-glow)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-heading)]'}`}>{plugin.name}</button>
                    ))}
                </div>
                <article id={`panel-${activePlugin.id}`} role="tabpanel" aria-labelledby={`tab-${activePlugin.id}`} className="grid overflow-hidden rounded-[var(--radius-card)] border [border-color:var(--border-strong)] bg-[var(--surface-primary)] shadow-[var(--shadow)] lg:grid-cols-12">
                    <div className="relative min-h-[330px] overflow-hidden lg:col-span-7 lg:min-h-[520px]">
                        <button type="button" onClick={() => setLightboxOpen(true)} aria-label={`${text.expandImage}: ${activePlugin.name}`} className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--accent)]">
                            <Image src={activePlugin.images[galleryIndex]} alt={`${activePlugin.name} — ${galleryIndex + 1} / ${activePlugin.images.length}`} fill className="object-contain p-4" sizes="(max-width: 1024px) 100vw, 58vw" priority />
                        </button>
                        {hasMultipleImages && (
                            <>
                                <button type="button" aria-label={text.previousImage} onClick={(event) => { event.stopPropagation(); changeImage(-1); }} className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                                <button type="button" aria-label={text.nextImage} onClick={(event) => { event.stopPropagation(); changeImage(1); }} className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                                    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
                                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-md">
                                    {activePlugin.images.map((image, index) => <button key={image} type="button" aria-label={`${index + 1} / ${activePlugin.images.length}`} aria-current={index === galleryIndex ? 'true' : undefined} onClick={() => setGalleryIndex(index)} className={`h-1.5 cursor-pointer rounded-full transition-all ${index === galleryIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70'}`} />)}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="border-t p-8 [border-color:var(--border-subtle)] lg:col-span-5 lg:border-l lg:border-t-0 lg:p-10">
                        <div className="mb-5 flex items-center justify-between gap-4"><Badge variant="stable">{text.version}</Badge><span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">{getPluginText(activePlugin, locale, 'category')}</span></div>
                        <h3 className="mb-4 text-4xl font-bold tracking-tight text-[var(--text-heading)]">{activePlugin.name}</h3>
                        <p className="mb-8 leading-relaxed text-[var(--text-secondary)]">{getPluginText(activePlugin, locale, 'description')}</p>
                        <h4 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--text-muted)]">{text.included}</h4>
                        <ul className="mb-9 space-y-3">
                            {getPluginText(activePlugin, locale, 'features').map((feature) => <li key={feature} className="flex items-center gap-3 text-sm text-[var(--text-primary)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />{feature}</li>)}
                        </ul>
                        <p className="border-t pt-5 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] [border-color:var(--border-subtle)]">{text.installNote}</p>
                    </div>
                </article>
            </section>

            <section className="container mx-auto max-w-6xl px-6 pb-24">
                <div className="grid gap-10 rounded-[var(--radius-card)] border p-8 [border-color:var(--border-subtle)] bg-[var(--surface-3)] md:grid-cols-2 md:p-12">
                    <div><h2 className="mb-4 text-3xl font-bold text-[var(--text-heading)]">{text.architectureTitle}</h2><p className="leading-relaxed text-[var(--text-secondary)]">{text.architectureDescription}</p></div>
                    <div className="grid gap-3 sm:grid-cols-2">{text.architecture.map((item) => <div key={item} className="rounded-xl border p-4 text-sm font-medium [border-color:var(--border-subtle)] bg-[var(--surface-primary)]">{item}</div>)}</div>
                    <article className="flex flex-col gap-4 rounded-2xl border p-5 [border-color:var(--border-strong)] bg-[var(--surface-primary)] shadow-[var(--shadow-card)] sm:flex-row sm:items-center md:col-span-2">
                        <span className="w-fit shrink-0 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{text.planned}</span>
                        <div>
                            <h3 className="mb-1 font-bold text-[var(--text-heading)]">{text.cloudSyncTitle}</h3>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{text.cloudSyncDescription}</p>
                        </div>
                    </article>
                </div>
            </section>

            <section className="container mx-auto max-w-4xl px-6 text-center">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">STZ Suite 0.1.0</p>
                <h2 className="mb-4 text-4xl font-bold tracking-tight text-[var(--text-heading)] md:text-5xl">{text.finalTitle}</h2>
                <p className="mx-auto mb-8 max-w-xl text-[var(--text-secondary)]">{text.finalDescription}</p>
                <Button asChild variant="primary" size="default"><a href={INSTALLER_URL}>{text.download}</a></Button>
            </section>

            {lightboxOpen && typeof document !== 'undefined' ? createPortal(
                <div role="dialog" aria-modal="true" aria-label={`${activePlugin.name} — ${text.explore}`} onClick={() => setLightboxOpen(false)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl md:p-10">
                    <button type="button" aria-label={text.closeImage} onClick={() => setLightboxOpen(false)} className="absolute right-5 top-5 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                    </button>
                    <div className="relative h-[82vh] w-full max-w-7xl" onClick={(event) => event.stopPropagation()}>
                        <Image src={activePlugin.images[galleryIndex]} alt={`${activePlugin.name} — ${galleryIndex + 1} / ${activePlugin.images.length}`} fill className="object-contain" sizes="95vw" priority />
                        {hasMultipleImages && (
                            <>
                                <button type="button" aria-label={text.previousImage} onClick={() => changeImage(-1)} className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:-left-4">
                                    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                                <button type="button" aria-label={text.nextImage} onClick={() => changeImage(1)} className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:-right-4">
                                    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
                            </>
                        )}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-xs text-white/80 backdrop-blur-md">{galleryIndex + 1} / {activePlugin.images.length}</div>
                    </div>
                </div>,
                document.body
            ) : null}
        </main>
    );
}
