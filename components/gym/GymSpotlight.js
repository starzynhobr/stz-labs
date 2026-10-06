"use client";

import LocaleLink from '../LocaleLink';
import { useLanguage } from '../../context/LanguageContext';
import { GYM_DEMO_START, GYM_SLUG, GYM_THEMES, getGymAppCopy, getGymPageCopy } from '../../data/stzGym';
import GymPhone from './GymPhone';
import ComingSoonBadge from './ComingSoonBadge';

/** Vitrine do STZ Gym na home: celular estático + chamada para a prévia. */
export default function GymSpotlight() {
    const { lang } = useLanguage();
    const text = getGymPageCopy(lang);
    const href = `/projects/${GYM_SLUG}`;

    return (
        <section className="relative w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-strong)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)]">
            <div className="pointer-events-none absolute -right-20 top-1/2 -z-10 size-[480px] -translate-y-1/2 rounded-full bg-[#00D9FF] opacity-20 blur-[120px]" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

            <div className="grid items-center gap-10 px-8 pt-10 md:grid-cols-[1fr_auto] md:gap-6 md:px-14 md:pt-12">
                <div className="pb-6 text-center md:text-left">
                    <ComingSoonBadge label={text.badge} status={text.status} />
                    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{text.kicker}</p>
                    <h2 className="mt-2 text-4xl font-bold tracking-tighter text-[var(--text-heading)] md:text-6xl">{text.title}</h2>
                    <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[var(--text-secondary)] md:mx-0">{text.tagline}</p>
                    <div className="mt-8 flex flex-col items-center gap-2 md:items-start">
                        <LocaleLink
                            href={href}
                            className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                            {text.cta}
                            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                        </LocaleLink>
                        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{text.spotlightNote}</span>
                    </div>
                </div>

                {/* Só metade do celular aparece, "saindo" do card. */}
                <LocaleLink href={href} tabIndex={-1} aria-hidden="true" className="relative -mb-[250px] w-[260px] self-end justify-self-center transition-transform duration-500 hover:-translate-y-3 md:-mb-[270px] md:w-[280px]">
                    <GymPhone
                        state={GYM_DEMO_START}
                        theme={GYM_THEMES[0]}
                        copy={getGymAppCopy(lang)}
                        label={text.phoneLabel}
                        className="rotate-[4deg]"
                    />
                </LocaleLink>
            </div>
        </section>
    );
}
