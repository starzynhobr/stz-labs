"use client";

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LocaleLink from './LocaleLink';

const copy = {
    pt: { title: 'Em movimento.', subtitle: 'As entregas mais recentes do laboratório.', all: 'Ver histórico completo' },
    en: { title: 'Moving forward.', subtitle: 'The latest releases from the lab.', all: 'See the full history' },
    es: { title: 'En movimiento.', subtitle: 'Las entregas más recientes del laboratorio.', all: 'Ver el historial completo' },
    fr: { title: 'En mouvement.', subtitle: 'Les dernières sorties du labo.', all: "Voir tout l'historique" },
    de: { title: 'Es geht weiter.', subtitle: 'Die neuesten Veröffentlichungen aus dem Labor.', all: 'Gesamten Verlauf ansehen' },
    it: { title: 'In movimento.', subtitle: 'Gli ultimi rilasci del laboratorio.', all: 'Vedi tutto lo storico' },
};

// Ponto da tela em que a linha "chega": um pouco abaixo do meio, para o item
// acender quando já está bem visível, e não assim que aparece na borda.
const ANCHOR = 0.62;

const entryText = (entry, lang) => {
    if (entry.text) return entry.text[lang] || entry.text.en;
    const list = lang === 'pt' ? entry.highlights?.pt : entry.highlights?.other;
    return list?.length ? list.join(' · ') : null;
};

/** Últimas entregas, da mais antiga para a atual: a linha cresce até o "agora". */
export default function StatusTimeline({ entries = [] }) {
    const { lang } = useLanguage();
    const text = copy[lang] || copy.en;
    const listRef = useRef(null);
    const items = [...entries].reverse();
    // No servidor (e sem JS) tudo aparece completo; o progresso só existe no cliente.
    const [reached, setReached] = useState(items.length);

    useEffect(() => {
        const list = listRef.current;
        if (!list) return undefined;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            list.style.setProperty('--progress', '1');
            return undefined;
        }

        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = list.getBoundingClientRect();
            const anchor = window.innerHeight * ANCHOR;
            const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
            list.style.setProperty('--progress', progress.toFixed(4));
            // Um item acende quando a ponta da linha passa pelo marcador dele.
            const tip = rect.top + rect.height * progress;
            let count = 0;
            for (const dot of list.querySelectorAll('[data-dot]')) {
                if (dot.getBoundingClientRect().top + 8 <= tip + 1) count += 1;
            }
            setReached(count);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    if (!items.length) return null;

    const dayFormat = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
    const monthFormat = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' });
    const lastIndex = items.length - 1;

    return (
        <section id="roadmap" aria-labelledby="progress-title" className="mb-12 mt-24 scroll-mt-24 px-6 md:mt-32">
            <div className="mx-auto max-w-4xl">
                <header className="mb-12 text-center">
                    <h2 id="progress-title" className="text-2xl font-semibold tracking-tight text-[var(--text-heading)] sm:text-3xl">{text.title}</h2>
                    <p className="mt-3 text-xs text-[var(--text-muted)] sm:text-sm">{text.subtitle}</p>
                </header>
                <ol ref={listRef} style={{ '--progress': 1 }} className="relative">
                    {/* Trilho apagado e, por cima, a parte já percorrida, que cresce com a rolagem. */}
                    <span aria-hidden="true" className="absolute bottom-2 left-2 top-2 w-px -translate-x-1/2 bg-[var(--border)] md:left-1/2" />
                    <span
                        aria-hidden="true"
                        className="absolute left-2 top-2 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[var(--accent)]/40 to-[var(--accent)] md:left-1/2"
                        style={{ height: 'calc((100% - 1rem) * var(--progress))' }}
                    />
                    {items.map((entry, index) => {
                        const isReached = index < reached;
                        const isNow = index === lastIndex;
                        const body = entryText(entry, lang);
                        const date = new Date(`${entry.date}T12:00:00Z`);
                        return (
                            <li
                                key={entry.id}
                                className="relative grid grid-cols-[16px_1fr] gap-x-5 pb-12 last:pb-2 md:grid-cols-[1fr_32px_1fr] md:gap-x-8"
                            >
                                <span
                                    data-dot
                                    aria-hidden="true"
                                    className={`relative z-10 col-start-1 row-start-1 mt-1 size-4 rounded-full border transition-[background-color,border-color,box-shadow] duration-500 md:col-start-2 md:justify-self-center ${isReached ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border-strong)] bg-[var(--bg)]'} ${isReached && isNow ? 'shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_18%,transparent)] after:absolute after:inset-[-6px] after:animate-ping after:rounded-full after:border after:border-[var(--accent)]/40 motion-reduce:after:animate-none' : ''}`}
                                />
                                <div
                                    className={`col-start-2 row-start-1 min-w-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${index % 2 === 0 ? 'md:col-start-3' : 'md:col-start-1 md:text-right'} ${isReached ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-35'}`}
                                >
                                    <time dateTime={entry.date} className={`text-xs tabular-nums ${isReached && isNow ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                                        {entry.precision === 'day' ? dayFormat.format(date) : monthFormat.format(date)} · {entry.project}
                                    </time>
                                    {entry.title && (
                                        <p className={`mt-2 text-sm font-semibold sm:text-base ${isNow ? 'text-[var(--text-heading)]' : 'text-[var(--text-secondary)]'}`}>{entry.title}</p>
                                    )}
                                    {body && (
                                        <p className={`mt-1 text-sm leading-relaxed ${entry.title ? 'text-[var(--text-muted)]' : isNow ? 'text-[var(--text-heading)] sm:text-base' : 'text-[var(--text-secondary)] sm:text-base'}`}>{body}</p>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ol>
                <p className="mt-6 text-center">
                    <LocaleLink href="/changelog" className="text-sm font-semibold text-[var(--accent)] hover:opacity-80">
                        {text.all} →
                    </LocaleLink>
                </p>
            </div>
        </section>
    );
}
