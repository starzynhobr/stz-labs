import Link from 'next/link';
import { GYM_CONTACT_EMAIL, getGymLegal, gymLegalPath } from '../../data/stzGymLegal';
import { GYM_SLUG } from '../../data/stzGym';

const cardClass = 'rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] p-8 shadow-[var(--shadow)]';

/** Splits "... {email} ..." so the address renders as a mailto link. */
function WithEmail({ text }) {
    const [before, after] = text.split('{email}');
    if (after === undefined) return text;
    return (
        <>
            {before}
            <a className="text-[var(--accent)] underline-offset-4 hover:underline" href={`mailto:${GYM_CONTACT_EMAIL}`}>
                {GYM_CONTACT_EMAIL}
            </a>
            {after}
        </>
    );
}

/**
 * Server-rendered legal page of STZ Gym (privacy or account deletion), so the
 * Play Console and crawlers read the full text without running JavaScript.
 */
export default function GymLegalPage({ locale, page }) {
    const legal = getGymLegal(locale);
    const content = legal[page];
    const other = page === 'privacy' ? 'deleteAccount' : 'privacy';

    return (
        <main className="relative min-h-screen overflow-hidden bg-transparent pb-24 pt-32">
            <section className="relative mx-auto mb-12 w-full max-w-3xl px-6 text-center">
                <h1 className="mb-6 text-4xl font-bold tracking-tighter text-[var(--text-heading)] md:text-5xl">{content.title}</h1>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">{content.intro}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {legal.updatedLabel} {legal.updated}
                </p>
            </section>

            <section className="container mx-auto max-w-3xl space-y-6 px-6">
                {content.sections.map((section) => {
                    const List = section.ordered ? 'ol' : 'ul';
                    return (
                        <article key={section.title} className={cardClass}>
                            <h2 className="mb-4 text-lg font-bold tracking-tight text-[var(--text-heading)]">{section.title}</h2>
                            {section.paragraphs?.map((paragraph) => (
                                <p key={paragraph} className="mb-4 text-[15px] leading-relaxed text-[var(--text-secondary)] last:mb-0">
                                    <WithEmail text={paragraph} />
                                </p>
                            ))}
                            {section.items && (
                                <List className={`ml-5 space-y-3 text-sm text-[var(--text-secondary)] ${section.ordered ? 'list-decimal' : 'list-disc'} marker:text-[var(--accent)]`}>
                                    {section.items.map((item) => (
                                        <li key={item} className="pl-1 leading-relaxed">{item}</li>
                                    ))}
                                </List>
                            )}
                            {section.link && (
                                <Link className="mt-4 inline-block text-sm text-[var(--accent)] underline-offset-4 hover:underline" href={gymLegalPath(locale, section.link)}>
                                    {legal.nav[section.link]} →
                                </Link>
                            )}
                        </article>
                    );
                })}

                <nav className="flex flex-wrap justify-center gap-6 pt-4 text-sm">
                    <Link className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]" href={`/${locale}/projects/${GYM_SLUG}`}>
                        STZ Gym
                    </Link>
                    <Link className="text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]" href={gymLegalPath(locale, other)}>
                        {legal.nav[other]}
                    </Link>
                </nav>
            </section>
        </main>
    );
}
