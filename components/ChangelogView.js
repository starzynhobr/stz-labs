"use client";

import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LocaleLink from './LocaleLink';

const copy = {
    pt: { kicker: 'Histórico', title: 'O que saiu do laboratório', summary: '{count} entregas em {projects} projetos desde {since}.', all: 'Tudo', mapHint: 'Passe o mouse numa semana', mapEmpty: 'nada publicado', mapItems: '{count} entrega(s)', notes: 'Notas da versão', project: 'Página do projeto', deliveries: '{count} entregas', showYear: 'Mostrar {year}', week: 'semana de {date}', less: 'menos', more: 'mais' },
    en: { kicker: 'History', title: 'What shipped from the lab', summary: '{count} releases across {projects} projects since {since}.', all: 'All', mapHint: 'Hover a week', mapEmpty: 'nothing shipped', mapItems: '{count} release(s)', notes: 'Release notes', project: 'Project page', deliveries: '{count} releases', showYear: 'Show {year}', week: 'week of {date}', less: 'less', more: 'more' },
    es: { kicker: 'Historial', title: 'Lo que salió del laboratorio', summary: '{count} entregas en {projects} proyectos desde {since}.', all: 'Todo', mapHint: 'Pasa el ratón por una semana', mapEmpty: 'nada publicado', mapItems: '{count} entrega(s)', notes: 'Notas de la versión', project: 'Página del proyecto', deliveries: '{count} entregas', showYear: 'Mostrar {year}', week: 'semana del {date}', less: 'menos', more: 'más' },
    fr: { kicker: 'Historique', title: 'Ce qui est sorti du labo', summary: '{count} versions sur {projects} projets depuis {since}.', all: 'Tout', mapHint: 'Survolez une semaine', mapEmpty: 'rien de publié', mapItems: '{count} version(s)', notes: 'Notes de version', project: 'Page du projet', deliveries: '{count} versions', showYear: 'Afficher {year}', week: 'semaine du {date}', less: 'moins', more: 'plus' },
    de: { kicker: 'Verlauf', title: 'Was aus dem Labor kam', summary: '{count} Veröffentlichungen in {projects} Projekten seit {since}.', all: 'Alle', mapHint: 'Über eine Woche fahren', mapEmpty: 'nichts veröffentlicht', mapItems: '{count} Veröffentlichung(en)', notes: 'Versionshinweise', project: 'Projektseite', deliveries: '{count} Veröffentlichungen', showYear: '{year} anzeigen', week: 'Woche vom {date}', less: 'weniger', more: 'mehr' },
    it: { kicker: 'Storico', title: 'Cosa è uscito dal laboratorio', summary: '{count} rilasci in {projects} progetti dal {since}.', all: 'Tutto', mapHint: 'Passa il mouse su una settimana', mapEmpty: 'niente pubblicato', mapItems: '{count} rilascio/i', notes: 'Note di rilascio', project: 'Pagina del progetto', deliveries: '{count} rilasci', showYear: 'Mostra {year}', week: 'settimana del {date}', less: 'meno', more: 'più' },
};

const fill = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
const WEEKS = 53;
const DAY = 86400000;
// Meses mais recentes que aparecem abertos; os anteriores do ano ficam recolhidos.
const OPEN_MONTHS = 2;

// Só a primeira letra: "outubro de 2026" vira "Outubro de 2026", sem mexer no "de".
const capitalize = (value) => value.charAt(0).toLocaleUpperCase() + value.slice(1);
const toUtc = (iso) => new Date(`${iso}T12:00:00Z`);
const isoDay = (date) => date.toISOString().slice(0, 10);

function entryText(entry, lang) {
    if (entry.text) return entry.text[lang] || entry.text.en;
    const list = lang === 'pt' ? entry.highlights?.pt : entry.highlights?.other;
    return list?.length ? list.join(' · ') : null;
}

export default function ChangelogView({ entries }) {
    const { lang } = useLanguage();
    const text = copy[lang] || copy.en;
    const [filter, setFilter] = useState(null);
    const [hover, setHover] = useState(null);
    // Os meses mais recentes do ano começam abertos; o resto, recolhido.
    const [openKeys, setOpenKeys] = useState(() => {
        const year = String(new Date().getUTCFullYear());
        const recent = [...new Set(entries.map((entry) => entry.date.slice(0, 7)))].filter((key) => key.startsWith(year));
        return new Set(recent.slice(0, OPEN_MONTHS));
    });

    const visible = useMemo(
        () => (filter ? entries.filter((entry) => entry.project === filter) : entries),
        [entries, filter],
    );

    const projectsByCount = useMemo(() => {
        const counts = new Map();
        entries.forEach((entry) => counts.set(entry.project, (counts.get(entry.project) || 0) + 1));
        return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name);
    }, [entries]);

    // Mapa de entregas: 53 semanas até a semana atual, uma coluna por semana.
    const weeks = useMemo(() => {
        const today = new Date();
        const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        const start = new Date(end.getTime() - ((WEEKS - 1) * 7 + end.getUTCDay()) * DAY);
        const byDay = new Map();
        visible.forEach((entry) => {
            const list = byDay.get(entry.date) || [];
            list.push(entry);
            byDay.set(entry.date, list);
        });
        return Array.from({ length: WEEKS }, (_, week) => Array.from({ length: 7 }, (_, weekday) => {
            const date = new Date(start.getTime() + (week * 7 + weekday) * DAY);
            const day = isoDay(date);
            return { day, future: date > end, items: byDay.get(day) || [] };
        }));
    }, [visible]);

    const groups = useMemo(() => {
        const months = new Map();
        visible.forEach((entry) => {
            const key = entry.date.slice(0, 7);
            if (!months.has(key)) months.set(key, []);
            months.get(key).push(entry);
        });
        return [...months.entries()];
    }, [visible]);

    const monthFormat = new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric', timeZone: 'UTC' });
    const dayFormat = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', timeZone: 'UTC' });
    const shortMonth = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric', timeZone: 'UTC' });
    const currentYear = String(new Date().getUTCFullYear());
    const since = entries.length ? shortMonth.format(toUtc(entries[entries.length - 1].date)) : '';

    const toggle = (key) => setOpenKeys((current) => {
        const next = new Set(current);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
    });

    const jumpTo = (day) => {
        const month = day.slice(0, 7);
        setOpenKeys((current) => new Set([...current, month, month.slice(0, 4)]));
        requestAnimationFrame(() => document.getElementById(`month-${month}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    };

    const level = (count) => (count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count <= 4 ? 3 : 4);
    const shades = ['var(--border-subtle)', 'color-mix(in srgb, var(--accent) 30%, transparent)', 'color-mix(in srgb, var(--accent) 55%, transparent)', 'color-mix(in srgb, var(--accent) 80%, transparent)', 'var(--accent)'];

    const renderMonth = (key, items, open) => {
        const names = [...new Set(items.map((item) => item.project))];
        return (
            <section key={key} id={`month-${key}`} className="scroll-mt-28">
                <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-expanded={open}
                    className="flex w-full items-baseline justify-between gap-4 border-b [border-color:var(--border-subtle)] py-3 text-left"
                >
                    <span className="text-sm font-semibold text-[var(--text-heading)]">{capitalize(monthFormat.format(toUtc(`${key}-01`)))}</span>
                    <span className="truncate text-xs text-[var(--text-muted)]">
                        {open ? fill(text.deliveries, { count: items.length }) : `${fill(text.deliveries, { count: items.length })} · ${names.slice(0, 3).join(', ')}${names.length > 3 ? '…' : ''}`}
                        <span aria-hidden="true" className={`ml-2 inline-block transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
                    </span>
                </button>
                {open && (
                    <ol className="divide-y [border-color:var(--border-subtle)] divide-[var(--border-subtle)]">
                        {items.map((entry) => {
                            const body = entryText(entry, lang);
                            return (
                                <li key={entry.id} className="grid grid-cols-[64px_1fr] gap-4 py-4 sm:grid-cols-[84px_1fr]">
                                    <time dateTime={entry.date} className="pt-0.5 text-xs tabular-nums text-[var(--text-muted)]">
                                        {entry.precision === 'day' ? dayFormat.format(toUtc(entry.date)) : shortMonth.format(toUtc(entry.date))}
                                    </time>
                                    <div className="min-w-0">
                                        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <span className="rounded-full border [border-color:var(--border-subtle)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">{entry.project}</span>
                                            {entry.title && <span className="text-sm font-semibold text-[var(--text-heading)]">{entry.title}</span>}
                                        </p>
                                        {body && <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>}
                                        {(entry.url || entry.slug) && (
                                            <p className="mt-2 flex gap-4 text-xs">
                                                {entry.url && <a href={entry.url} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:opacity-80">{text.notes} ↗</a>}
                                                {entry.slug && <LocaleLink href={`/projects/${entry.slug}`} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">{text.project}</LocaleLink>}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </section>
        );
    };

    // Ano atual: os meses mais recentes abertos. Anos anteriores: um bloco por ano.
    const currentGroups = groups.filter(([key]) => key.startsWith(currentYear));
    const olderYears = [...new Set(groups.filter(([key]) => !key.startsWith(currentYear)).map(([key]) => key.slice(0, 4)))];

    return (
        <div className="mx-auto max-w-4xl px-6">
            <header className="mb-10 text-center">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)]">{text.kicker}</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tighter text-[var(--text-heading)] md:text-5xl">{text.title}</h1>
                <p className="mt-4 text-sm text-[var(--text-secondary)]">
                    {fill(text.summary, { count: entries.length, projects: projectsByCount.length, since })}
                </p>
            </header>

            <div className="mb-6 rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] p-4 shadow-[var(--shadow)] sm:p-5">
                <div className="overflow-hidden">
                    <div className="ml-auto grid w-max grid-flow-col gap-[3px]" style={{ gridTemplateRows: 'repeat(7, 10px)', gridAutoColumns: '10px' }}>
                        {weeks.flat().map((cell) => (
                            <button
                                key={cell.day}
                                type="button"
                                disabled={cell.future}
                                aria-label={`${dayFormat.format(toUtc(cell.day))}: ${cell.items.length ? fill(text.mapItems, { count: cell.items.length }) : text.mapEmpty}`}
                                onMouseEnter={() => setHover(cell)}
                                onFocus={() => setHover(cell)}
                                onClick={() => cell.items.length && jumpTo(cell.day)}
                                className={`size-[10px] rounded-[2px] ${cell.future ? 'invisible' : ''} ${cell.items.length ? 'cursor-pointer' : 'cursor-default'}`}
                                style={{ background: shades[level(cell.items.length)] }}
                            />
                        ))}
                    </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                    <span className="min-h-4 truncate">
                        {hover
                            ? `${dayFormat.format(toUtc(hover.day))} · ${hover.items.length ? `${fill(text.mapItems, { count: hover.items.length })} · ${[...new Set(hover.items.map((item) => item.project))].join(', ')}` : text.mapEmpty}`
                            : text.mapHint}
                    </span>
                    <span className="flex items-center gap-1">
                        {text.less}
                        {shades.map((shade) => <span key={shade} className="size-[10px] rounded-[2px]" style={{ background: shade }} />)}
                        {text.more}
                    </span>
                </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
                {[null, ...projectsByCount].map((name) => (
                    <button
                        key={name || 'all'}
                        type="button"
                        onClick={() => setFilter(name)}
                        aria-pressed={filter === name}
                        className={`rounded-full border px-3 py-1 text-xs transition-colors ${filter === name ? 'border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]' : '[border-color:var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                    >
                        {name || text.all}
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                {currentGroups.map(([key, items]) => renderMonth(key, items, openKeys.has(key)))}
                {olderYears.map((year) => {
                    const yearGroups = groups.filter(([key]) => key.startsWith(year));
                    const count = yearGroups.reduce((total, [, items]) => total + items.length, 0);
                    const open = openKeys.has(year);
                    return (
                        <section key={year}>
                            <button
                                type="button"
                                onClick={() => toggle(year)}
                                aria-expanded={open}
                                className="flex w-full items-baseline justify-between border-b [border-color:var(--border-subtle)] py-3 text-left"
                            >
                                <span className="text-sm font-semibold text-[var(--text-heading)]">{year}</span>
                                <span className="text-xs text-[var(--text-muted)]">
                                    {fill(text.deliveries, { count })}
                                    <span aria-hidden="true" className={`ml-2 inline-block transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
                                </span>
                            </button>
                            {open && <div className="pl-3">{yearGroups.map(([key, items]) => renderMonth(key, items, openKeys.has(key)))}</div>}
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
