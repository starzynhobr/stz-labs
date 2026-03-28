import { notFound } from 'next/navigation';
import ProjectGalleryDetails from '../../../components/ProjectGalleryDetails';
import RepoStats from '../../../components/RepoStats';
import TranslatedText from '../../../components/TranslatedText';
import { projects } from '../../../data/projects';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

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

    const { hero, gallery, features, specs } = project.detail;
    const heroGalleryItem = gallery?.find((item) => item.variant === 'hero') || gallery?.[0] || null;
    const extraGalleryItems = heroGalleryItem ? gallery.filter((item) => item.src !== heroGalleryItem.src) : [];

    return (
        <main className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
            {/* Project Hero */}
            <section className="relative w-full max-w-5xl mx-auto px-6 mb-20 text-center">
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {hero.tags.map((tag) => (
                        <Badge key={tag} variant="default" className="text-[10px] uppercase tracking-widest px-3 py-1">
                            {tag}
                        </Badge>
                    ))}
                </div>
                
                <TranslatedText as="h1" className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--text-heading)] mb-6" i18nKey={hero.titleKey} />
                <TranslatedText as="p" className="text-base md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10" i18nKey={hero.descriptionKey} />

                <div className="flex flex-wrap items-center justify-center gap-4">
                    {hero.actionLinks?.length ? (
                        hero.actionLinks.map((link, idx) => (
                            <Button
                                key={idx}
                                asChild
                                variant={link.variant === 'secondary' ? 'secondary' : 'primary'}
                                size="default"
                                className="px-8"
                            >
                                <a href={link.url} target="_blank" rel="noreferrer" style={link.style}>
                                    {link.icon && (
                                        <span
                                            className="mr-2.5 flex items-center"
                                            dangerouslySetInnerHTML={{ __html: link.icon }}
                                        />
                                    )}
                                    {link.labelKey ? (
                                        <TranslatedText as="span" i18nKey={link.labelKey} />
                                    ) : (
                                        <span>{link.label}</span>
                                    )}
                                </a>
                            </Button>
                        ))
                    ) : hero.githubUrl ? (
                        <Button asChild variant="primary" size="default" className="px-8">
                            <a href={hero.githubUrl} target="_blank" rel="noreferrer">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="mr-2.5"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                                <TranslatedText as="span" i18nKey={hero.githubLabelKey} />
                            </a>
                        </Button>
                    ) : (
                        <Button variant="primary" size="default" disabled className="px-8 opacity-50 cursor-not-allowed">
                            <TranslatedText as="span" i18nKey={hero.githubLabelKey} />
                        </Button>
                    )}
                </div>
            </section>

            {heroGalleryItem && (
                <section className="container max-w-5xl mx-auto px-6 mb-24 relative z-10">
                    <ProjectGalleryDetails
                        heroItem={heroGalleryItem}
                        items={extraGalleryItems}
                    />
                </section>
            )}

            {/* Features Section */}
            <section className="container max-w-5xl mx-auto px-6 mb-24">
                <div className="flex items-center gap-4 mb-12">
                     <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent flex-1" />
                     <TranslatedText
                        as="h2"
                        className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-bold px-4"
                        i18nKey="sections.features_title"
                    />
                     <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent flex-1" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature) => (
                        <article 
                            key={feature.titleKey} 
                            className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)] hover:[border-color:var(--border-hover)] transition-all duration-300 group"
                        >
                            <h3 className="text-lg font-bold text-[var(--text-heading)] mb-3 tracking-tight group-hover:text-[var(--accent)] transition-colors">
                                <TranslatedText as="span" i18nKey={feature.titleKey} />
                            </h3>
                            <TranslatedText as="p" className="text-sm text-[var(--text-secondary)] leading-relaxed" i18nKey={feature.descriptionKey} />
                        </article>
                    ))}
                </div>
            </section>

            {/* Specifications Section */}
            <section className="container max-w-4xl mx-auto px-6">
                <article className="p-10 rounded-[var(--radius-card)] bg-[var(--surface-3)] border [border-color:var(--border-strong)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent pointer-events-none" />
                    
                    <TranslatedText
                        as="h2"
                        className="text-xl font-bold text-[var(--text-heading)] mb-8 tracking-tight flex items-center gap-3 relative z-10"
                        i18nKey="sections.specs_title"
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 relative z-10">
                        {specs.map((spec) => (
                            <div
                                key={`${spec.labelKey}-${spec.value || spec.repoName || 'dynamic'}`}
                                className="flex justify-between items-center py-3 border-b [border-color:var(--border-subtle)] last:border-0 hover:bg-[var(--accent)]/[0.02] transition-colors"
                            >
                                <TranslatedText as="span" className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]" i18nKey={spec.labelKey} />
                                <div className="text-sm font-bold text-[var(--text-primary)]">
                                    {spec.repoName ? (
                                        <RepoStats repoName={spec.repoName} variant="release-inline" />
                                    ) : (
                                        <span>{spec.value}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </main>
    );
}
