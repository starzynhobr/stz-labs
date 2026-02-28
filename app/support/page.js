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
    const stripePaymentLink = process.env.STRIPE_PAYMENT_LINK?.trim();
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
                    <h1>Support / Tips</h1>
                    <p className="text-muted" style={{ maxWidth: '860px' }}>
                        Tips are voluntary contributions to support maintenance of existing software.
                        This is not a crowdfunding campaign. No goals, no rewards, and no future
                        promises. Software is available now and delivered digitally via official
                        download links (GitHub Releases).
                    </p>
                </div>
            </section>

            <section className="products" style={{ paddingTop: 0 }}>
                <div className="container" style={{ maxWidth: '980px' }}>
                    <article className="card" style={{ marginBottom: '20px' }}>
                        <h3 style={{ marginBottom: '12px' }}>Support scope</h3>
                        <ul
                            style={{
                                listStyle: 'disc',
                                marginLeft: '20px',
                                color: 'var(--text-muted)',
                                marginBottom: '12px',
                            }}
                        >
                            <li>No crowdfunding</li>
                            <li>No goals</li>
                            <li>No rewards</li>
                            <li>No future promises</li>
                        </ul>
                        <p className="text-muted" style={{ marginBottom: '8px' }}>
                            Delivery: immediate digital download via official links (GitHub
                            Releases).
                        </p>
                        <p className="text-muted" style={{ marginBottom: '8px' }}>
                            Contact:{' '}
                            <a href="mailto:contato@stzlabs.com" style={{ textDecoration: 'underline' }}>
                                contato@stzlabs.com
                            </a>
                        </p>
                        <p className="text-muted">
                            <Link href="/terms" style={{ textDecoration: 'underline' }}>
                                Terms
                            </Link>{' '}
                            {' | '}
                            <Link href="/privacy" style={{ textDecoration: 'underline' }}>
                                Privacy
                            </Link>
                        </p>
                    </article>

                    <article className="card" style={{ marginBottom: '24px' }}>
                        <h3 style={{ marginBottom: '12px' }}>How to support</h3>
                        <p className="text-muted" style={{ marginBottom: '14px' }}>
                            Payment flow: open Stripe checkout, complete payment, and access software
                            immediately via official release/download links.
                        </p>
                        {hasStripePaymentLink ? (
                            <a
                                href={stripePaymentLink}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary"
                                style={{ width: 'fit-content' }}
                            >
                                Support with Stripe
                            </a>
                        ) : (
                            <span
                                className="btn btn-secondary"
                                aria-disabled="true"
                                style={{ width: 'fit-content', opacity: 0.8 }}
                            >
                                Stripe checkout: coming soon
                            </span>
                        )}
                    </article>

                    <div className="section-header" style={{ marginBottom: '24px' }}>
                        <h2 className="text-accent">Software available now</h2>
                        <p className="text-muted">Current products and official downloads.</p>
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
                                        <p className="text-muted" style={{ marginBottom: '12px' }}>
                                            Releases / downloads
                                        </p>
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
