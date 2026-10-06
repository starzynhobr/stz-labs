"use client";

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const copy = {
    pt: { title: 'Em movimento.', subtitle: 'Pequenas entregas. Evolução contínua.', more: 'Ver registros anteriores', less: 'Recolher registros', entries: ['Extensões do Downloader e páginas dos projetos renovadas.', 'Prévia do Gym, Downloader e ferramentas para Grand Fantasia.', 'Novos plugins e melhorias na STZ Suite.', 'STZ Suite publicada para Windows.', 'PDF Suite no catálogo e nova apresentação do XML Translator.', 'Melhorias nos temas e na tradução do portal.', 'Lyrics ganha uma versão independente do Rainmeter.', 'STZ Labs no ar, com CSV Converter, Lyrics e TaskPulse.', 'Primeiras releases registradas de Clicker e XML Translator.'] },
    en: { title: 'Moving forward.', subtitle: 'Small releases. Steady progress.', more: 'Show earlier entries', less: 'Hide earlier entries', entries: ['Downloader extensions and refreshed project pages.', 'Gym preview, Downloader and tools for Grand Fantasia.', 'New plugins and improvements to STZ Suite.', 'STZ Suite released for Windows.', 'PDF Suite joins the catalog; XML Translator gets a new presentation.', 'Improvements to portal themes and translations.', 'Lyrics gets a standalone version without Rainmeter.', 'STZ Labs goes live with CSV Converter, Lyrics and TaskPulse.', 'First recorded releases of Clicker and XML Translator.'] },
    es: { title: 'En movimiento.', subtitle: 'Pequeñas entregas. Evolución continua.', more: 'Ver registros anteriores', less: 'Ocultar registros', entries: ['Extensiones de Downloader y páginas de proyectos renovadas.', 'Vista previa de Gym, Downloader y herramientas para Grand Fantasia.', 'Nuevos plugins y mejoras en STZ Suite.', 'STZ Suite publicada para Windows.', 'PDF Suite llega al catálogo y XML Translator renueva su presentación.', 'Mejoras en los temas y la traducción del portal.', 'Lyrics obtiene una versión independiente de Rainmeter.', 'STZ Labs en línea con CSV Converter, Lyrics y TaskPulse.', 'Primeras versiones registradas de Clicker y XML Translator.'] },
    fr: { title: 'En mouvement.', subtitle: 'Petites avancées. Progrès continus.', more: 'Voir les entrées précédentes', less: 'Masquer les entrées', entries: ['Extensions Downloader et pages des projets renouvelées.', 'Aperçu de Gym, Downloader et outils pour Grand Fantasia.', 'Nouveaux plugins et améliorations de STZ Suite.', 'STZ Suite publiée pour Windows.', 'PDF Suite rejoint le catalogue et XML Translator renouvelle sa présentation.', 'Améliorations des thèmes et des traductions du portail.', 'Lyrics devient disponible sans Rainmeter.', 'STZ Labs ouvre avec CSV Converter, Lyrics et TaskPulse.', 'Premières versions enregistrées de Clicker et XML Translator.'] },
    de: { title: 'Es geht weiter.', subtitle: 'Kleine Schritte. Stetiger Fortschritt.', more: 'Frühere Einträge anzeigen', less: 'Einträge einklappen', entries: ['Downloader-Erweiterungen und überarbeitete Projektseiten.', 'Gym-Vorschau, Downloader und Werkzeuge für Grand Fantasia.', 'Neue Plugins und Verbesserungen für STZ Suite.', 'STZ Suite für Windows veröffentlicht.', 'PDF Suite im Katalog und neue Präsentation für XML Translator.', 'Verbesserungen an den Themes und Übersetzungen des Portals.', 'Lyrics erhält eine eigenständige Version ohne Rainmeter.', 'STZ Labs startet mit CSV Converter, Lyrics und TaskPulse.', 'Erste dokumentierte Releases von Clicker und XML Translator.'] },
    it: { title: 'In movimento.', subtitle: 'Piccoli rilasci. Progressi continui.', more: 'Mostra i registri precedenti', less: 'Nascondi i registri', entries: ['Estensioni Downloader e pagine dei progetti rinnovate.', 'Anteprima di Gym, Downloader e strumenti per Grand Fantasia.', 'Nuovi plugin e miglioramenti di STZ Suite.', 'STZ Suite pubblicata per Windows.', 'PDF Suite nel catalogo e nuova presentazione di XML Translator.', 'Miglioramenti ai temi e alle traduzioni del portale.', 'Lyrics ottiene una versione indipendente da Rainmeter.', 'STZ Labs online con CSV Converter, Lyrics e TaskPulse.', 'Prime versioni registrate di Clicker e XML Translator.'] },
};

// Publication and site-update milestones verified against GitHub releases and commits.
const periods = ['2025-10', '2026-01', '2026-02', '2026-03', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10'];

export default function StatusTimeline() {
    const { lang } = useLanguage();
    const text = copy[lang] || copy.en;
    const listRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(2);

    useEffect(() => {
        if (visibleCount >= periods.length) return;
        if (!('IntersectionObserver' in window)) {
            queueMicrotask(() => setVisibleCount(periods.length));
            return;
        }
        const last = listRef.current?.lastElementChild;
        if (!last) return;
        const observer = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            observer.disconnect();
            setVisibleCount(count => Math.min(count + 1, periods.length));
        }, { rootMargin: '0px 0px -35% 0px', threshold: 0.5 });
        observer.observe(last);
        return () => observer.disconnect();
    }, [visibleCount]);
    const format = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' });

    return (
        <section id="roadmap" aria-labelledby="progress-title" className="mb-12 mt-24 scroll-mt-24 px-6 md:mt-32">
            <div className="mx-auto max-w-4xl">
                <header className="mb-10 text-center">
                    <h2 id="progress-title" className="text-2xl font-semibold tracking-tight text-[var(--text-heading)] sm:text-3xl">{text.title}</h2>
                    <p className="mt-3 text-xs text-[var(--text-muted)] sm:text-sm">{text.subtitle}</p>
                </header>
                <ol ref={listRef} id="progress-entries" className="relative before:absolute before:bottom-6 before:left-2 before:top-2 before:w-px before:bg-gradient-to-b before:from-[var(--accent)] before:via-[var(--border-strong)] before:to-transparent md:before:left-1/2">
                    {periods.slice(0, visibleCount).map((period, index) => (
                        <li key={period} data-record className="relative grid transition-[opacity,transform] duration-500 ease-out starting:translate-y-5 starting:opacity-0 motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none grid-cols-[16px_1fr] gap-x-5 pb-10 md:grid-cols-[1fr_32px_1fr] md:gap-x-8">
                            <span aria-hidden="true" className={`relative z-10 col-start-1 row-start-1 mt-1 size-4 rounded-full border bg-[var(--bg)] md:col-start-2 md:justify-self-center ${index === periods.length - 1 ? 'border-[var(--accent)] ring-4 ring-[var(--accent)]/10 after:absolute after:inset-1 after:rounded-full after:bg-[var(--accent)]' : 'border-[var(--border-strong)] after:absolute after:inset-[5px] after:rounded-full after:bg-[var(--text-muted)]'}`} />
                            <div className={`col-start-2 row-start-1 min-w-0 ${index % 2 === 0 ? 'md:col-start-3' : 'md:col-start-1 md:text-right'}`}>
                                <time dateTime={period} className={`text-xs tabular-nums ${index === periods.length - 1 ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>{format.format(new Date(`${period}-01T12:00:00Z`))}</time>
                                <p className={`mt-2 text-sm leading-relaxed sm:text-base ${index === periods.length - 1 ? 'text-[var(--text-heading)]' : 'text-[var(--text-secondary)]'}`}>{text.entries[periods.length - 1 - index]}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
