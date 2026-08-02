import Link from 'next/link';
import { notFound } from 'next/navigation';
import LocaleLink from '../../../components/LocaleLink';
import SupportOptionsModal from '../../../components/SupportOptionsModal';
import TranslatedText from '../../../components/TranslatedText';
import { projects } from '../../../data/projects';
import { Button } from '../../../components/ui/Button';
import { buildPageMetadata } from '../../../lib/pageMetadata';
import { isLocale, localeParams } from '../../../lib/i18n';
import { KOFI_URL, MERCADO_PAGO_LINKS } from '../../../lib/support';
import { downloadPath } from '../../../lib/downloadPath';

export const dynamicParams = false;

export function generateStaticParams() {
    return localeParams();
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    return buildPageMetadata('support', locale, '/support');
}

const supportProjects = projects.filter(
    (project) => project.slug && project.titleKey && project.descriptionKey
);

export default async function SupportPage({ params }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    return (
        <main className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
            <section className="relative w-full max-w-3xl mx-auto px-6 mb-12 text-center">
                <TranslatedText
                    as="h1"
                    className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--text-heading)] mb-6"
                    i18nKey="support.title"
                />
                <TranslatedText
                    as="p"
                    className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto"
                    i18nKey="support.subtitle"
                />
            </section>

            {/* O convite vem antes de qualquer explicação: era o que ficava enterrado. */}
            <section className="container max-w-3xl mx-auto px-6">
                <div className="p-8 md:p-10 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)] text-center">
                    <TranslatedText
                        as="h2"
                        className="text-lg font-bold text-[var(--text-heading)] tracking-tight mb-3"
                        i18nKey="support.how_to_support"
                    />
                    <TranslatedText
                        as="p"
                        className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md mx-auto"
                        i18nKey="support.payment_flow"
                    />
                    <SupportOptionsModal kofiUrl={KOFI_URL} mercadoPagoLinks={MERCADO_PAGO_LINKS} />
                </div>

                <div className="mt-6 p-6 rounded-[var(--radius-card)] bg-[var(--surface-3)] border [border-color:var(--border-subtle)] border-l-4 [border-left-color:var(--accent)]">
                    <TranslatedText
                        as="h3"
                        className="text-sm font-bold text-[var(--text-heading)] mb-2"
                        i18nKey="support.impact_title"
                    />
                    <TranslatedText
                        as="p"
                        className="text-sm text-[var(--text-secondary)] leading-relaxed"
                        i18nKey="support.impact_text"
                    />
                </div>

                <p className="mt-6 text-sm text-[var(--text-muted)] text-center">
                    <TranslatedText as="span" i18nKey="support.contact" />:{' '}
                    <a
                        href="mailto:contato@stzlabs.com"
                        className="text-[var(--accent)] hover:opacity-80 underline underline-offset-4"
                    >
                        contato@stzlabs.com
                    </a>
                    <span className="mx-3 text-[var(--border-subtle)]">|</span>
                    <LocaleLink href="/terms" className="hover:text-[var(--accent)] transition-colors">
                        <TranslatedText as="span" i18nKey="footer.terms" />
                    </LocaleLink>
                    <span className="mx-3 text-[var(--border-subtle)]">|</span>
                    <LocaleLink href="/privacy" className="hover:text-[var(--accent)] transition-colors">
                        <TranslatedText as="span" i18nKey="footer.privacy" />
                    </LocaleLink>
                </p>
            </section>

            <section className="container max-w-4xl mx-auto px-6 mt-20">
                <div className="pb-6 mb-8 border-b [border-color:var(--border-subtle)]">
                    <TranslatedText
                        as="h2"
                        className="text-2xl font-bold tracking-tight text-[var(--text-heading)] mb-2"
                        i18nKey="support.software_available_now"
                    />
                    <TranslatedText
                        as="p"
                        className="text-[var(--text-secondary)]"
                        i18nKey="support.current_products"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {supportProjects.map((project) => (
                        <article
                            key={project.slug}
                            className="p-6 rounded-[calc(var(--radius-card)*0.7)] bg-[var(--surface-primary)]/50 border [border-color:var(--border-subtle)] hover:[border-color:var(--border-hover)] transition-all duration-300"
                        >
                            <h3 className="text-lg font-bold text-[var(--text-heading)] tracking-tight mb-3">
                                <TranslatedText as="span" i18nKey={project.titleKey} />
                            </h3>

                            <TranslatedText
                                as="p"
                                className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-2"
                                i18nKey={project.descriptionKey}
                            />

                            <div className="flex gap-2">
                                <Button asChild variant="primary" size="sm" className="px-4">
                                    <Link href={`/${locale}/projects/${project.slug}`}>
                                        <TranslatedText as="span" i18nKey="cards.btn_details" />
                                    </Link>
                                </Button>

                                {project.downloadHref ? (
                                    <Button asChild variant="secondary" size="sm" className="px-4">
                                        <Link href={downloadPath(locale, project.slug)}>
                                            <TranslatedText as="span" i18nKey="cards.btn_download" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="px-4 opacity-50 cursor-not-allowed"
                                        disabled
                                    >
                                        <TranslatedText
                                            as="span"
                                            i18nKey={project.downloadDisabledLabelKey || 'cards.btn_download'}
                                        />
                                    </Button>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
