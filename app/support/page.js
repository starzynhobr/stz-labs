import Link from 'next/link';
import SupportOptionsModal from '../../components/SupportOptionsModal';
import TranslatedText from '../../components/TranslatedText';
import { projects } from '../../data/projects';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export const metadata = {
    title: 'Support / Tips | STZ LABS',
    description:
        'Voluntary tips for STZ LABS software maintenance. No crowdfunding, no goals, no rewards, and no future promises.',
};

const supportProjects = projects.filter(
    (project) => project.slug && project.titleKey && project.descriptionKey
);

const getSupportDownload = (project) => {
    const directRelease =
        typeof project.downloadHref === 'string' && /\/releases(\/|$)/i.test(project.downloadHref)
            ? project.downloadHref
            : null;
    const fallbackDownload = directRelease ? null : project.downloadHref;

    return {
        href: directRelease || fallbackDownload || null,
        hasDirectRelease: Boolean(directRelease),
    };
};

export default function SupportPage() {
    const supportUrl = 'https://ko-fi.com/starzynhobr';
    const mercadoPagoLinks = [
        { href: 'https://mpago.la/2u4kqx3', labelKey: 'support.amount_5' },
        { href: 'https://mpago.la/1ZSbnxM', labelKey: 'support.amount_10' },
        { href: 'https://link.mercadopago.com.br/urendis', labelKey: 'support.amount_free' },
    ];

    return (
        <main className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
             <section className="relative w-full max-w-4xl mx-auto px-6 mb-16 text-center">
                <TranslatedText as="h1" className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--text-heading)] mb-6" i18nKey="support.title" />
                <TranslatedText as="p" className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto" i18nKey="support.subtitle" />
            </section>

            <section className="container max-w-4xl mx-auto px-6 space-y-8">
                {/* Information Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)]">
                        <TranslatedText as="h3" className="text-lg font-bold text-[var(--text-heading)] mb-6 uppercase tracking-widest border-b [border-color:var(--border-subtle)] pb-4" i18nKey="support.scope_title" />
                        <ul className="space-y-3 mb-8">
                            {['no_crowdfunding', 'no_goals', 'no_rewards', 'no_future_promises'].map(key => (
                                <li key={key} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40 mt-1.5 shrink-0" />
                                    <TranslatedText as="span" i18nKey={`support.${key}`} />
                                </li>
                            ))}
                        </ul>
                        
                        <div className="space-y-4 pt-4 border-t [border-color:var(--border-subtle)]">
                            <TranslatedText as="p" className="text-sm text-[var(--text-muted)] leading-relaxed italic" i18nKey="support.delivery" />
                            <p className="text-sm text-[var(--text-secondary)]">
                                <TranslatedText as="span" i18nKey="support.contact" />:{' '}
                                <a href="mailto:contato@stzlabs.com" className="text-[var(--accent)] hover:opacity-80 underline underline-offset-4 decoration-[var(--accent)]/30">
                                    contato@stzlabs.com
                                </a>
                            </p>
                            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest pt-2">
                                <Link href="/terms" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                                    <TranslatedText as="span" i18nKey="footer.terms" />
                                </Link>
                                <span className="text-[var(--border-subtle)]">|</span>
                                <Link href="/privacy" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                                    <TranslatedText as="span" i18nKey="footer.privacy" />
                                </Link>
                            </div>
                        </div>
                    </article>

                    <article className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)] flex flex-col">
                        <TranslatedText as="h3" className="text-lg font-bold text-[var(--text-heading)] mb-6 uppercase tracking-widest border-b [border-color:var(--border-subtle)] pb-4" i18nKey="support.how_to_support" />
                        <TranslatedText as="p" className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed" i18nKey="support.payment_flow" />
                        <div className="mt-auto">
                            <SupportOptionsModal
                                kofiUrl={supportUrl}
                                mercadoPagoLinks={mercadoPagoLinks}
                            />
                        </div>
                    </article>
                </div>

                {/* Available Software Header */}
                <div className="pt-16 pb-8 border-b [border-color:var(--border-subtle)]">
                    <TranslatedText as="h2" className="text-2xl font-bold tracking-tight text-[var(--accent)] mb-2" i18nKey="support.software_available_now" />
                    <TranslatedText as="p" className="text-[var(--text-secondary)]" i18nKey="support.current_products" />
                </div>

                {/* Simplified Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {supportProjects.map((project) => {
                        const { href, hasDirectRelease } = getSupportDownload(project);
                        return (
                            <article key={project.slug} className="p-6 rounded-[calc(var(--radius-card)*0.7)] bg-[var(--surface-primary)]/50 border [border-color:var(--border-subtle)] hover:[border-color:var(--border-hover)] transition-all duration-300">
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <h3 className="text-lg font-bold text-[var(--text-heading)] tracking-tight">
                                        <TranslatedText as="span" i18nKey={project.titleKey} />
                                    </h3>
                                    {href && !hasDirectRelease && (
                                        <Badge variant="default" className="text-[8px] uppercase tracking-tighter">
                                            <TranslatedText as="span" i18nKey="support.releases_downloads" />
                                        </Badge>
                                    )}
                                </div>
                                
                                <TranslatedText
                                    as="p"
                                    className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-2"
                                    i18nKey={project.descriptionKey}
                                />

                                <div className="flex gap-2">
                                    <Button asChild variant="primary" size="sm" className="px-4">
                                        <Link href={`/projects/${project.slug}`}>
                                            <TranslatedText as="span" i18nKey="cards.btn_details" />
                                        </Link>
                                    </Button>
                                    
                                    {href ? (
                                        <Button asChild variant="secondary" size="sm" className="px-4">
                                            <a href={href} target="_blank" rel="noreferrer">
                                                <TranslatedText as="span" i18nKey="cards.btn_download" />
                                            </a>
                                        </Button>
                                    ) : (
                                        <Button variant="secondary" size="sm" className="px-4 opacity-50 cursor-not-allowed" disabled>
                                            <TranslatedText
                                                as="span"
                                                i18nKey={project.downloadDisabledLabelKey || 'cards.btn_download'}
                                            />
                                        </Button>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
