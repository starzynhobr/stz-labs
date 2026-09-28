"use client";

import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import Link from 'next/link';
import { downloadPath } from '../lib/downloadPath';
import { getPluginText, plugins } from '../data/suitePlugins';

const RELEASES_URL = 'https://github.com/starzynhobr/stz-suite-releases/releases';
const ISSUES_URL = 'https://github.com/starzynhobr/stz-suite-releases/issues/new/choose';
const DISCUSSIONS_URL = 'https://github.com/starzynhobr/stz-suite-releases/discussions';
const BASE_VERIFICATION_VERSION = '0.4.1';
const BASE_CHECKSUM_URL = 'https://github.com/starzynhobr/stz-suite-releases/releases/download/stz-suite-base-v0.4.1/STZ-Suite-Base-0.4.1-Setup.sha256.txt';
const BASE_VIRUSTOTAL_URL = 'https://www.virustotal.com/gui/file/cee317a554b393df93740e66952fa9dea00b58d49e3a917f3360b216298f5105/detection';

const PLUGIN_PARAM = 'plugin';

/** Mantém ?plugin=<id> na URL sem recarregar nem empilhar histórico. */
const syncPluginParam = (id) => {
    const url = new URL(window.location.href);
    if (url.searchParams.get(PLUGIN_PARAM) === id) return;

    url.searchParams.set(PLUGIN_PARAM, id);
    window.history.replaceState(null, '', url);
};

const HERO_PLUGIN_IDS = ['fetchora', 'tempoza', 'lumio', 'ordelya'];
const heroPlugins = HERO_PLUGIN_IDS.map((id) => plugins.find((plugin) => plugin.id === id));

const copy = {
    pt: {
        eyebrow: 'Ecossistema modular para Windows', title: 'Uma base. Suas ferramentas.',
        description: 'A STZ Suite reúne utilitários independentes em uma única experiência. Instale somente os plugins que precisa e mantenha tudo organizado, atualizado e sob seu controle.',
        download: 'Baixar STZ Suite', releases: 'Ver todos os releases', verification: 'Verificação:', flowTitle: 'Comece com uma base leve',
        flow: [['01', 'Instale a base', 'A Suite começa como um shell limpo, sem plugins desnecessários.'], ['02', 'Escolha os plugins', 'Abra Configurações → Plugins e monte sua própria coleção.'], ['03', 'Atualize com segurança', 'O catálogo oficial entrega versões verificadas diretamente pelo GitHub.']],
        catalogEyebrow: 'Catálogo oficial', catalogTitle: 'Nove ferramentas. Uma experiência.', catalogDescription: 'Veja tudo de uma vez e escolha um plugin para explorar os detalhes.',
        explore: 'Explorar plugins', included: 'Destaques', version: 'Versão 0.1.0', installNote: 'Instalado pela própria STZ Suite',
        architectureTitle: 'Modular por escolha. Local por princípio.', architectureDescription: 'A base permanece leve e cada ferramenta vive em seu próprio pacote. Arquivos e preferências ficam na sua máquina; dependências e modelos são baixados somente quando necessários.',
        architecture: ['Base sem plugins pré-instalados', 'Pacotes verificados por SHA-256', 'Processamento e dados locais', 'Atualizações pelo catálogo oficial'], planned: 'Em breve', cloudSyncTitle: 'Cloud sync planejado', cloudSyncDescription: 'Uma futura integração de sincronização em nuvem está nos planos para salvar dados e preferências dos plugins e facilitar o uso da Suite em diferentes dispositivos.', finalTitle: 'Monte a Suite do seu jeito.', finalDescription: 'Baixe a base para Windows e instale os plugins diretamente pela tela de configurações.', feedbackPrompt: 'Encontrou um problema ou tem uma sugestão?', reportBug: 'Reportar um bug', askQuestion: 'Fazer uma pergunta ou sugestão', previousImage: 'Imagem anterior', nextImage: 'Próxima imagem', expandImage: 'Ampliar imagem', closeImage: 'Fechar imagem',
    },
    en: {
        eyebrow: 'Modular ecosystem for Windows', title: 'One base. Your tools.',
        description: 'STZ Suite brings independent utilities into one experience. Install only the plugins you need and keep everything organized, updated, and under your control.',
        download: 'Download STZ Suite', releases: 'View all releases', verification: 'Verification:', flowTitle: 'Start with a lightweight base',
        flow: [['01', 'Install the base', 'The Suite starts as a clean shell without unnecessary plugins.'], ['02', 'Choose your plugins', 'Open Settings → Plugins and build your own collection.'], ['03', 'Update safely', 'The official catalog delivers verified versions directly from GitHub.']],
        catalogEyebrow: 'Official catalog', catalogTitle: 'Nine tools. One experience.', catalogDescription: 'See everything at a glance and choose a plugin to explore the details.',
        explore: 'Explore plugins', included: 'Highlights', version: 'Version 0.1.0', installNote: 'Installed from inside STZ Suite',
        architectureTitle: 'Modular by choice. Local by principle.', architectureDescription: 'The base stays lightweight and each tool lives in its own package. Files and preferences remain on your computer; dependencies and models are downloaded only when needed.',
        architecture: ['No plugins preinstalled', 'SHA-256 verified packages', 'Local processing and data', 'Official catalog updates'], planned: 'Coming soon', cloudSyncTitle: 'Cloud sync planned', cloudSyncDescription: 'A future cloud synchronization integration is planned to save plugin data and preferences and make the Suite easier to use across different devices.', finalTitle: 'Build the Suite your way.', finalDescription: 'Download the Windows base and install plugins directly from Settings.', feedbackPrompt: 'Found a problem or have a suggestion?', reportBug: 'Report a bug', askQuestion: 'Ask a question or share an idea', previousImage: 'Previous image', nextImage: 'Next image', expandImage: 'Enlarge image', closeImage: 'Close image',
    },
    es: {
        eyebrow: 'Ecosistema modular para Windows', title: 'Una base. Tus herramientas.',
        description: 'STZ Suite reúne utilidades independientes en una sola experiencia. Instala únicamente los plugins que necesitas y mantén todo organizado, actualizado y bajo tu control.',
        download: 'Descargar STZ Suite', releases: 'Ver todos los lanzamientos', verification: 'Verificación:', flowTitle: 'Empieza con una base ligera',
        flow: [['01', 'Instala la base', 'La Suite empieza como una estructura limpia, sin plugins innecesarios.'], ['02', 'Elige tus plugins', 'Abre Configuración → Plugins y crea tu propia colección.'], ['03', 'Actualiza con seguridad', 'El catálogo oficial distribuye versiones verificadas directamente desde GitHub.']],
        catalogEyebrow: 'Catálogo oficial', catalogTitle: 'Nueve herramientas. Una experiencia.', catalogDescription: 'Descubre todo de un vistazo y elige un plugin para ver sus detalles.',
        explore: 'Explorar plugins', included: 'Características', version: 'Versión 0.1.0', installNote: 'Instalado desde la propia STZ Suite',
        architectureTitle: 'Modular por elección. Local por principio.', architectureDescription: 'La base se mantiene ligera y cada herramienta vive en su propio paquete. Los archivos y preferencias permanecen en tu equipo; las dependencias y los modelos se descargan solo cuando son necesarios.',
        architecture: ['Sin plugins preinstalados', 'Paquetes verificados con SHA-256', 'Procesamiento y datos locales', 'Actualizaciones mediante el catálogo oficial'], planned: 'Próximamente', cloudSyncTitle: 'Cloud sync planificado', cloudSyncDescription: 'Está prevista una futura integración de sincronización en la nube para guardar datos y preferencias de los plugins y facilitar el uso de la Suite en distintos dispositivos.', finalTitle: 'Crea la Suite a tu manera.', finalDescription: 'Descarga la base para Windows e instala los plugins directamente desde Configuración.', feedbackPrompt: '¿Encontraste un problema o tienes una sugerencia?', reportBug: 'Reportar un error', askQuestion: 'Hacer una pregunta o sugerencia', previousImage: 'Imagen anterior', nextImage: 'Imagen siguiente', expandImage: 'Ampliar imagen', closeImage: 'Cerrar imagen',
    },
    fr: {
        eyebrow: 'Écosystème modulaire pour Windows', title: 'Une base. Vos outils.',
        description: 'STZ Suite rassemble des utilitaires indépendants dans une expérience unique. Installez uniquement les plugins nécessaires et gardez le tout organisé, à jour et sous votre contrôle.',
        download: 'Télécharger STZ Suite', releases: 'Voir toutes les versions', verification: 'Vérification :', flowTitle: 'Commencez avec une base légère',
        flow: [['01', 'Installez la base', 'La Suite démarre comme une structure épurée, sans plugins superflus.'], ['02', 'Choisissez vos plugins', 'Ouvrez Paramètres → Plugins et composez votre propre collection.'], ['03', 'Mettez à jour en toute sécurité', 'Le catalogue officiel fournit des versions vérifiées directement depuis GitHub.']],
        catalogEyebrow: 'Catalogue officiel', catalogTitle: 'Neuf outils. Une expérience.', catalogDescription: 'Découvrez tout en un coup d’œil et choisissez un plugin pour en explorer les détails.',
        explore: 'Explorer les plugins', included: 'Points forts', version: 'Version 0.1.0', installNote: 'Installé directement depuis STZ Suite',
        architectureTitle: 'Modulaire par choix. Local par principe.', architectureDescription: 'La base reste légère et chaque outil dispose de son propre paquet. Les fichiers et préférences restent sur votre ordinateur ; les dépendances et modèles ne sont téléchargés qu’en cas de besoin.',
        architecture: ['Aucun plugin préinstallé', 'Paquets vérifiés par SHA-256', 'Traitement et données en local', 'Mises à jour via le catalogue officiel'], planned: 'Bientôt', cloudSyncTitle: 'Cloud sync prévu', cloudSyncDescription: 'Une future intégration de synchronisation dans le cloud est prévue afin de sauvegarder les données et préférences des plugins et de faciliter l’utilisation de la Suite sur plusieurs appareils.', finalTitle: 'Composez la Suite à votre façon.', finalDescription: 'Téléchargez la base Windows et installez les plugins directement depuis les paramètres.', feedbackPrompt: 'Vous avez trouvé un problème ou avez une suggestion ?', reportBug: 'Signaler un bug', askQuestion: 'Poser une question ou proposer une idée', previousImage: 'Image précédente', nextImage: 'Image suivante', expandImage: 'Agrandir l’image', closeImage: 'Fermer l’image',
    },
    de: {
        eyebrow: 'Modulares Ökosystem für Windows', title: 'Eine Basis. Deine Werkzeuge.',
        description: 'STZ Suite vereint unabhängige Programme in einer zentralen Oberfläche. Installiere nur die Plugins, die du benötigst, und behalte alles organisiert, aktuell und unter deiner Kontrolle.',
        download: 'STZ Suite herunterladen', releases: 'Alle Versionen anzeigen', verification: 'Überprüfung:', flowTitle: 'Starte mit einer schlanken Basis',
        flow: [['01', 'Basis installieren', 'Die Suite startet als saubere Oberfläche ohne unnötige Plugins.'], ['02', 'Plugins auswählen', 'Öffne Einstellungen → Plugins und stelle deine eigene Sammlung zusammen.'], ['03', 'Sicher aktualisieren', 'Der offizielle Katalog liefert geprüfte Versionen direkt über GitHub.']],
        catalogEyebrow: 'Offizieller Katalog', catalogTitle: 'Neun Werkzeuge. Eine Oberfläche.', catalogDescription: 'Sieh dir alles auf einen Blick an und wähle ein Plugin aus, um mehr zu erfahren.',
        explore: 'Plugins entdecken', included: 'Highlights', version: 'Version 0.1.0', installNote: 'Direkt über STZ Suite installiert',
        architectureTitle: 'Bewusst modular. Konsequent lokal.', architectureDescription: 'Die Basis bleibt schlank und jedes Werkzeug befindet sich in einem eigenen Paket. Dateien und Einstellungen bleiben auf deinem Computer; Abhängigkeiten und Modelle werden nur bei Bedarf heruntergeladen.',
        architecture: ['Keine vorinstallierten Plugins', 'Mit SHA-256 geprüfte Pakete', 'Lokale Verarbeitung und Daten', 'Updates über den offiziellen Katalog'], planned: 'Demnächst', cloudSyncTitle: 'Cloud-Synchronisierung geplant', cloudSyncDescription: 'Eine zukünftige Cloud-Synchronisierung ist geplant, um Plugin-Daten und Einstellungen zu sichern und die Nutzung der Suite auf mehreren Geräten zu erleichtern.', finalTitle: 'Stelle deine Suite selbst zusammen.', finalDescription: 'Lade die Windows-Basis herunter und installiere Plugins direkt über die Einstellungen.', feedbackPrompt: 'Ein Problem gefunden oder einen Vorschlag?', reportBug: 'Fehler melden', askQuestion: 'Frage stellen oder Idee teilen', previousImage: 'Vorheriges Bild', nextImage: 'Nächstes Bild', expandImage: 'Bild vergrößern', closeImage: 'Bild schließen',
    },
    it: {
        eyebrow: 'Ecosistema modulare per Windows', title: 'Una base. I tuoi strumenti.',
        description: 'STZ Suite riunisce utility indipendenti in un’unica esperienza. Installa solo i plugin che ti servono e mantieni tutto organizzato, aggiornato e sotto il tuo controllo.',
        download: 'Scarica STZ Suite', releases: 'Vedi tutte le versioni', verification: 'Verifica:', flowTitle: 'Inizia con una base leggera',
        flow: [['01', 'Installa la base', 'La Suite parte come una struttura pulita, senza plugin superflui.'], ['02', 'Scegli i plugin', 'Apri Impostazioni → Plugin e crea la tua raccolta personale.'], ['03', 'Aggiorna in sicurezza', 'Il catalogo ufficiale distribuisce versioni verificate direttamente da GitHub.']],
        catalogEyebrow: 'Catalogo ufficiale', catalogTitle: 'Nove strumenti. Un’unica esperienza.', catalogDescription: 'Scopri tutto a colpo d’occhio e scegli un plugin per esplorarne i dettagli.',
        explore: 'Esplora i plugin', included: 'Funzionalità principali', version: 'Versione 0.1.0', installNote: 'Installato direttamente da STZ Suite',
        architectureTitle: 'Modulare per scelta. Locale per principio.', architectureDescription: 'La base rimane leggera e ogni strumento vive nel proprio pacchetto. File e preferenze restano sul tuo computer; dipendenze e modelli vengono scaricati solo quando servono.',
        architecture: ['Nessun plugin preinstallato', 'Pacchetti verificati con SHA-256', 'Elaborazione e dati locali', 'Aggiornamenti dal catalogo ufficiale'], planned: 'Prossimamente', cloudSyncTitle: 'Cloud sync pianificato', cloudSyncDescription: 'È prevista una futura integrazione di sincronizzazione cloud per salvare dati e preferenze dei plugin e semplificare l’uso della Suite su dispositivi diversi.', finalTitle: 'Crea la Suite a modo tuo.', finalDescription: 'Scarica la base per Windows e installa i plugin direttamente dalle Impostazioni.', feedbackPrompt: 'Hai trovato un problema o hai un suggerimento?', reportBug: 'Segnala un bug', askQuestion: 'Fai una domanda o proponi un’idea', previousImage: 'Immagine precedente', nextImage: 'Immagine successiva', expandImage: 'Ingrandisci immagine', closeImage: 'Chiudi immagine',
    },
};

function PluginImage({ plugin, locale, className = '', priority = false }) {
    return (
        <div className={`relative overflow-hidden rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-3)] ${className}`}>
            <Image src={plugin.image} alt={`${plugin.name} — ${getPluginText(plugin, locale, 'category')}`} fill priority={priority} className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
    );
}


export default function SuiteProjectPage({ initialRelease = null, initialPluginVersions = null }) {
    const { lang } = useLanguage();
    const locale = copy[lang] ? lang : 'en';
    const text = copy[locale];
    const [activeId, setActiveId] = useState(plugins[0].id);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const tabRefs = useRef([]);
    const activePlugin = plugins.find((plugin) => plugin.id === activeId) || plugins[0];
    const hasMultipleImages = activePlugin.images.length > 1;
    const suiteVersion = initialRelease?.version || null;
    const suiteLabel = suiteVersion ? `STZ Suite ${suiteVersion}` : 'STZ Suite';
    const downloadLabel = suiteVersion ? `${text.download} ${suiteVersion} · Windows · ~55 MB` : text.download;
    const hasBaseVerification = suiteVersion === BASE_VERIFICATION_VERSION;
    // O download passa pela página de agradecimento, como nos demais projetos.
    const downloadHref = downloadPath(lang, 'stz-suite');
    const activePluginVersion = initialPluginVersions?.[activePlugin.id]?.version || activePlugin.version;
    const localizedVersion = text.version.replace(/\d+\.\d+\.\d+/, activePluginVersion);

    const changeImage = useCallback((direction) => {
        setGalleryIndex((current) => (current + direction + activePlugin.images.length) % activePlugin.images.length);
    }, [activePlugin.images.length]);

    const selectPlugin = (id, shouldScroll = false) => {
        setActiveId(id);
        setGalleryIndex(0);
        syncPluginParam(id);
        if (shouldScroll) document.getElementById('suite-explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    /**
     * Abre o plugin indicado em ?plugin=<id> para que cada um tenha um link
     * próprio. O parâmetro é lido do window para não exigir um limite de
     * Suspense em torno desta página estática.
     */
    useEffect(() => {
        const requested = new URLSearchParams(window.location.search).get(PLUGIN_PARAM);
        if (!requested) return;

        const target = plugins.find((plugin) => plugin.id === requested.toLowerCase());
        if (!target) return;

        // O parâmetro só existe no cliente; ler no render causaria divergência
        // de hidratação com o HTML estático.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveId(target.id);
        setGalleryIndex(0);
        document.getElementById('suite-explorer')?.scrollIntoView({ block: 'start' });
    }, []);

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
                    <Badge variant="stable" className="mb-6">{suiteLabel}</Badge>
                    <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">{text.eyebrow}</p>
                    <h1 className="mb-6 text-5xl font-bold tracking-[-0.05em] text-[var(--text-heading)] md:text-7xl">{text.title}</h1>
                    <p className="mb-9 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">{text.description}</p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild variant="primary" size="default"><Link href={downloadHref}>{downloadLabel}</Link></Button>
                        <Button asChild variant="secondary" size="default"><a href={RELEASES_URL} target="_blank" rel="noreferrer">{text.releases}</a></Button>
                    </div>
                    {hasBaseVerification ? (
                        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--text-muted)]">
                            <span>{text.verification}</span>
                            <a href={BASE_CHECKSUM_URL} target="_blank" rel="noreferrer" className="font-semibold text-[var(--accent)] underline decoration-[var(--border-strong)] underline-offset-4 transition hover:opacity-80">SHA-256</a>
                            <span aria-hidden="true">·</span>
                            <a href={BASE_VIRUSTOTAL_URL} target="_blank" rel="noreferrer" className="font-semibold text-[var(--accent)] underline decoration-[var(--border-strong)] underline-offset-4 transition hover:opacity-80">VirusTotal</a>
                        </p>
                    ) : null}
                </div>
                <div className="relative grid h-[430px] grid-cols-2 gap-3 lg:col-span-6">
                    <div className="grid gap-3 pt-10">
                        <PluginImage plugin={heroPlugins[0]} locale={locale} priority />
                        <PluginImage plugin={heroPlugins[1]} locale={locale} priority />
                    </div>
                    <div className="grid gap-3 pb-10">
                        <PluginImage plugin={heroPlugins[2]} locale={locale} priority />
                        <PluginImage plugin={heroPlugins[3]} locale={locale} priority />
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
                        <div className="mb-5 flex items-center justify-between gap-4"><Badge variant="stable">{localizedVersion}</Badge><span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">{getPluginText(activePlugin, locale, 'category')}</span></div>
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
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">{suiteLabel}</p>
                <h2 className="mb-4 text-4xl font-bold tracking-tight text-[var(--text-heading)] md:text-5xl">{text.finalTitle}</h2>
                <p className="mx-auto mb-8 max-w-xl text-[var(--text-secondary)]">{text.finalDescription}</p>
                <Button asChild variant="primary" size="default"><Link href={downloadHref}>{text.download}</Link></Button>
                <div className="mx-auto mt-10 max-w-2xl border-t pt-7 [border-color:var(--border-subtle)]">
                    <p className="mb-4 text-sm text-[var(--text-secondary)]">{text.feedbackPrompt}</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button asChild variant="secondary" size="sm"><a href={ISSUES_URL} target="_blank" rel="noreferrer">{text.reportBug}</a></Button>
                        <Button asChild variant="secondary" size="sm"><a href={DISCUSSIONS_URL} target="_blank" rel="noreferrer">{text.askQuestion}</a></Button>
                    </div>
                </div>
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
