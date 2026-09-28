"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import RepoStats from './RepoStats';
import TranslatedText from './TranslatedText';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Tag } from './ui/Tag';
import { useLanguage } from '../context/LanguageContext';
import { downloadPath } from '../lib/downloadPath';
import { getPluginText, plugins } from '../data/suitePlugins';

const SLUG = 'stz-suite';
/** Imagem da visão geral: a biblioteca do Lumio é a tela mais visual da Suite. */
const OVERVIEW_IMAGE = '/images/projects/stz-suite/plugins/lumio/home.png';
const SLIDE_ANIMATION = 'motion-safe:animate-[suite-slide-in_350ms_ease-out]';

/**
 * Destaque da STZ Suite na home: o slide 0 apresenta a base e os seguintes
 * mostram cada plugin, com o download à mão para quem já decidiu.
 */
export default function SuiteShowcaseCard({ tags = [], initialRelease = null, repoStats = null }) {
    const { lang, t } = useLanguage();
    const [index, setIndex] = useState(0);
    const chipRefs = useRef([]);
    const total = plugins.length + 1;
    const plugin = index > 0 ? plugins[index - 1] : null;
    const version = initialRelease?.version ? `v${initialRelease.version}` : null;
    const detailHref = plugin ? `/${lang}/projects/${SLUG}?plugin=${plugin.id}` : `/${lang}/projects/${SLUG}`;

    const goTo = (next) => {
        const target = (next + total) % total;
        setIndex(target);
        chipRefs.current[target]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    };

    const onKeyDown = (event) => {
        if (event.key === 'ArrowRight') goTo(index + 1);
        if (event.key === 'ArrowLeft') goTo(index - 1);
    };

    const chips = [{ id: 'overview', label: t('cards.suite_overview') }, ...plugins.map((item) => ({ id: item.id, label: item.name }))];

    return (
        <article
            aria-roledescription="carousel"
            className="group relative col-span-full overflow-hidden rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] shadow-[var(--shadow)] backdrop-blur-[var(--backdrop-blur)] transition-all duration-500 hover:[border-color:var(--border-hover)] md:grid md:grid-cols-12"
        >
            <div className="pointer-events-none absolute inset-0 z-0 rounded-[var(--radius-card)] bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col p-8 md:col-span-7 md:p-12">
                <div key={index} className={`flex flex-1 flex-col ${SLIDE_ANIMATION}`}>
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
                            {plugin
                                ? `${getPluginText(plugin, lang, 'category')} · v${plugin.version}`
                                : `${t('cards.suite_kicker')} · ${t('cards.suite_plugins').replace('{count}', plugins.length)}`}
                        </p>
                        {!plugin && (
                            <div className="flex shrink-0 flex-col items-end gap-2">
                                {version && <Badge variant="stable">{version}</Badge>}
                                <RepoStats stats={repoStats} repoName="stz-suite-releases" variant="stars" />
                            </div>
                        )}
                    </div>

                    <h3 className="text-3xl font-bold leading-tight tracking-tight text-[var(--text-heading)] lg:text-4xl">
                        {plugin ? plugin.name : t('cards.suite_title')}
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--text-secondary)] md:text-lg/relaxed">
                        {plugin ? getPluginText(plugin, lang, 'description') : t('cards.suite_desc')}
                    </p>

                    {plugin ? (
                        <ul className="mt-6 flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
                            {getPluginText(plugin, lang, 'features').map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <span className="size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Tag key={tag.labelKey}>
                                    <TranslatedText as="span" i18nKey={tag.labelKey} />
                                </Tag>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button asChild variant="primary" className="px-5">
                        <Link href={detailHref}>
                            <TranslatedText as="span" i18nKey="cards.btn_details" />
                        </Link>
                    </Button>
                    <Button asChild variant="secondary" className="px-5">
                        <Link href={downloadPath(lang, SLUG)}>
                            <TranslatedText as="span" i18nKey="cards.btn_download" />
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 flex items-center gap-2" onKeyDown={onKeyDown}>
                    <button
                        type="button"
                        onClick={() => goTo(index - 1)}
                        aria-label={t('cards.slide_prev')}
                        className="grid size-8 shrink-0 place-items-center rounded-full border [border-color:var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:[border-color:var(--accent)] hover:text-[var(--accent)]"
                    >
                        <span aria-hidden="true">←</span>
                    </button>
                    <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto px-3 py-1 [scrollbar-width:none] [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)]" role="tablist">
                        {chips.map((chip, chipIndex) => {
                            const active = chipIndex === index;
                            return (
                                <button
                                    key={chip.id}
                                    ref={(node) => { chipRefs.current[chipIndex] = node; }}
                                    type="button"
                                    role="tab"
                                    aria-selected={active}
                                    tabIndex={active ? 0 : -1}
                                    onClick={() => goTo(chipIndex)}
                                    className={`shrink-0 rounded-full border px-3 py-1 text-xs transition-colors ${active
                                        ? 'border-[var(--accent)] bg-[var(--accent)]/10 font-semibold text-[var(--accent)]'
                                        : '[border-color:var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                                >
                                    {chip.label}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        type="button"
                        onClick={() => goTo(index + 1)}
                        aria-label={t('cards.slide_next')}
                        className="grid size-8 shrink-0 place-items-center rounded-full border [border-color:var(--border-subtle)] text-[var(--text-secondary)] transition-colors hover:[border-color:var(--accent)] hover:text-[var(--accent)]"
                    >
                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            </div>

            <div className="relative z-0 flex min-h-[280px] items-center justify-center overflow-hidden border-t [border-color:var(--border-subtle)] p-6 sm:p-10 md:col-span-5 md:min-h-full md:border-l md:border-t-0">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-glow)_1px,transparent_1px)] [background-size:32px_32px]" />
                <button
                    type="button"
                    onClick={() => goTo(index + 1)}
                    aria-label={t('cards.slide_next')}
                    className="relative z-10 aspect-[1.6/1] w-full max-w-[440px] overflow-hidden rounded-[calc(var(--radius-card)*0.5)] border [border-color:var(--border-subtle)] bg-[var(--surface-3)] shadow-[var(--shadow)] transition-transform duration-500 hover:-translate-y-1"
                >
                    <Image
                        key={index}
                        src={plugin ? plugin.image : OVERVIEW_IMAGE}
                        alt=""
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 90vw, 440px"
                        className={`object-cover object-left-top ${SLIDE_ANIMATION}`}
                    />
                </button>
            </div>
        </article>
    );
}
