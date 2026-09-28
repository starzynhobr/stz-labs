"use client";

import { useLanguage } from '../../context/LanguageContext';
import { getGymPageCopy } from '../../data/stzGym';
import GymDemo from './GymDemo';
import GymFeedback from './GymFeedback';
import ComingSoonBadge from './ComingSoonBadge';

export default function GymProjectPage() {
    const { lang } = useLanguage();
    const text = getGymPageCopy(lang);

    return (
        <main className="relative min-h-screen overflow-hidden bg-transparent pb-24 pt-32">
            <section className="container mx-auto mb-24 grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1fr_auto]">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <ComingSoonBadge label={text.badge} status={text.status} />
                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.kicker}</p>
                    <h1 className="mt-3 text-5xl font-bold tracking-tighter text-[var(--text-heading)] md:text-7xl">{text.title}</h1>
                    <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg lg:mx-0">{text.tagline}</p>
                    <p className="mt-8 text-sm text-[var(--accent)]">
                        <span aria-hidden="true" className="mr-2 lg:hidden">↓</span>
                        {text.tryIt}
                        <span aria-hidden="true" className="ml-2 hidden lg:inline">→</span>
                    </p>
                </div>

                <GymDemo locale={lang} text={text} />
            </section>

            <section className="container mx-auto mb-24 max-w-6xl px-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {text.features.map((feature) => (
                        <article
                            key={feature.title}
                            className="rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] p-6 backdrop-blur-[var(--backdrop-blur)] transition-colors hover:[border-color:var(--border-hover)]"
                        >
                            <h2 className="mb-2 font-bold tracking-tight text-[var(--text-heading)]">{feature.title}</h2>
                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{feature.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="container mx-auto max-w-4xl px-6">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--text-heading)] md:text-3xl">{text.feedbackTitle}</h2>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">{text.feedbackText}</p>
                </div>
                <GymFeedback text={text} />
            </section>
        </main>
    );
}
