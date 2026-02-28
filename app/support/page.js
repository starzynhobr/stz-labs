import Link from 'next/link';
import TranslatedText from '../../components/TranslatedText';
import { projects } from '../../data/projects';

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
    const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_TIPS_URL?.trim();
    const hasStripePaymentLink = Boolean(stripePaymentLink);

    return (
        <div
            className="app-shell"
            style={{
                minHeight: '100vh',
                padding: '70px 0 80px',
            }}
        >
            <section className="product-hero" style={{ padding: '120px 0 60px' }}>
                <div className="container">
                    <TranslatedText as="h1" i18nKey="support.title" />
                    <TranslatedText as="p" className="text-muted" style={{ maxWidth: '860px' }} i18nKey="support.subtitle" />
                </div>
            </section>

            <section className="products" style={{ paddingTop: 0 }}>
                <div className="container" style={{ maxWidth: '980px' }}>
                    <article className="card" style={{ marginBottom: '20px' }}>
                        <TranslatedText as="h3" style={{ marginBottom: '12px' }} i18nKey="support.scope_title" />
                        <ul
                            style={{
                                listStyle: 'disc',
                                marginLeft: '20px',
                                color: 'var(--text-muted)',
                                marginBottom: '12px',
                            }}
                        >
                            <li>
                                <TranslatedText as="span" i18nKey="support.no_crowdfunding" />
                            </li>
                            <li>
                                <TranslatedText as="span" i18nKey="support.no_goals" />
                            </li>
                            <li>
                                <TranslatedText as="span" i18nKey="support.no_rewards" />
                            </li>
                            <li>
                                <TranslatedText as="span" i18nKey="support.no_future_promises" />
                            </li>
                        </ul>
                        <TranslatedText as="p" className="text-muted" style={{ marginBottom: '8px' }} i18nKey="support.delivery" />
                        <p className="text-muted" style={{ marginBottom: '8px' }}>
                            <TranslatedText as="span" i18nKey="support.contact" />:{' '}
                            <a href="mailto:contato@stzlabs.com" style={{ textDecoration: 'underline' }}>
                                contato@stzlabs.com
                            </a>
                        </p>
                        <p className="text-muted">
                            <Link href="/terms" style={{ textDecoration: 'underline' }}>
                                <TranslatedText as="span" i18nKey="footer.terms" />
                            </Link>{' '}
                            {' | '}
                            <Link href="/privacy" style={{ textDecoration: 'underline' }}>
                                <TranslatedText as="span" i18nKey="footer.privacy" />
                            </Link>
                        </p>
                    </article>

                    <article className="card" style={{ marginBottom: '24px' }}>
                        <TranslatedText as="h3" style={{ marginBottom: '12px' }} i18nKey="support.how_to_support" />
                        <TranslatedText as="p" className="text-muted" style={{ marginBottom: '14px' }} i18nKey="support.payment_flow" />
                        {hasStripePaymentLink ? (
                            <a
                                href={stripePaymentLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ width: 'fit-content' }}
                            >
                                <TranslatedText as="span" i18nKey="support.support_with_stripe" />
                            </a>
                        ) : (
                            <span
                                className="btn btn-secondary"
                                aria-disabled="true"
                                style={{ width: 'fit-content', opacity: 0.8 }}
                            >
                                <TranslatedText as="span" i18nKey="support.stripe_coming_soon" />
                            </span>
                        )}
                    </article>

                    <div className="section-header" style={{ marginBottom: '24px' }}>
                        <TranslatedText as="h2" className="text-accent" i18nKey="support.software_available_now" />
                        <TranslatedText as="p" className="text-muted" i18nKey="support.current_products" />
                    </div>

                    <div className="product-grid">
                        {supportProjects.map((project) => {
                            const { href, hasDirectRelease } = getSupportDownload(project);
                            return (
                                <article key={project.slug} className="card">
                                    <h3 className="card-title" style={{ marginBottom: '10px' }}>
                                        <TranslatedText as="span" i18nKey={project.titleKey} />
                                    </h3>
                                    <TranslatedText
                                        as="p"
                                        className="card-desc"
                                        i18nKey={project.descriptionKey}
                                        style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            marginBottom: '12px',
                                        }}
                                    />

                                    {!hasDirectRelease && href && (
                                        <TranslatedText as="p" className="text-muted" style={{ marginBottom: '12px' }} i18nKey="support.releases_downloads" />
                                    )}

                                    <div className="card-actions">
                                        <Link href={`/projects/${project.slug}`} className="btn btn-primary btn-sm">
                                            <TranslatedText as="span" i18nKey="cards.btn_details" />
                                        </Link>
                                        {href ? (
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-secondary btn-sm"
                                            >
                                                <TranslatedText as="span" i18nKey="cards.btn_download" />
                                            </a>
                                        ) : (
                                            <span
                                                className="btn btn-secondary btn-sm"
                                                aria-disabled="true"
                                                style={{ opacity: 0.65 }}
                                            >
                                                <TranslatedText as="span" i18nKey="cards.btn_download" />
                                            </span>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
