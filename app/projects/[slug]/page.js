import Link from 'next/link';
import { notFound } from 'next/navigation';
import RepoStats from '../../../components/RepoStats';
import TranslatedText from '../../../components/TranslatedText';
import { projects } from '../../../data/projects';

const getProjectBySlug = (slug) => projects.find((project) => project.slug === slug);

export function generateStaticParams() {
    return projects
        .filter((project) => project.slug)
        .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project?.detail) return {};

    const { title, description, ogDescription } = project.detail.meta;

    return {
        title,
        description,
        openGraph: {
            title,
            description: ogDescription || description,
            images: ['https://stz-labs.vercel.app/public/og-image.png'],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: ogDescription || description,
            images: ['https://stz-labs.vercel.app/public/og-image.png'],
        },
    };
}

export default async function ProjectDetailPage({ params }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project?.detail) {
        notFound();
    }

    const { hero, features, specs } = project.detail;

    return (
        <main>
            <section className="product-hero">
                <div className="container">
                    <div className="hero-tags">
                        {hero.tags.map((tag) => (
                            <span key={tag} className="hero-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <TranslatedText as="h1" i18nKey={hero.titleKey} />
                    <TranslatedText as="p" i18nKey={hero.descriptionKey} />

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <a href={hero.githubUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{ marginRight: '8px' }}
                            >
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                            <TranslatedText as="span" i18nKey={hero.githubLabelKey} />
                        </a>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                        <TranslatedText
                        as="h2"
                        style={{ marginBottom: '40px', textAlign: 'center' }}
                        i18nKey="sections.features_title"
                    />
                    <div className="features-grid">
                        {features.map((feature) => (
                            <div className="feature-card" key={feature.titleKey}>
                                <TranslatedText as="h3" i18nKey={feature.titleKey} />
                                <TranslatedText as="p" i18nKey={feature.descriptionKey} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="specs-section">
                <div className="container">
                    <TranslatedText
                        as="h2"
                        style={{ textAlign: 'center', marginBottom: '30px' }}
                        i18nKey="sections.specs_title"
                    />
                    <div className="specs-list">
                        {specs.map((spec) => (
                            <div
                                className="spec-item"
                                key={`${spec.labelKey}-${spec.value || spec.repoName || 'dynamic'}`}
                            >
                                <TranslatedText as="span" className="spec-label" i18nKey={spec.labelKey} />
                                {spec.repoName ? (
                                    <RepoStats repoName={spec.repoName} variant="release-inline" />
                                ) : (
                                    <span>{spec.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
