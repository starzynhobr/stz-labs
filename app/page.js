import ProjectCard from '../components/ProjectCard';
import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
import StatusTimeline from '../components/StatusTimeline';
import { projects } from '../data/projects';

export const metadata = {
    title: 'STZ LABS | Micro Estúdio de Software Futurista',
    description:
        'STZ LABS desenvolve ferramentas de alta performance como STZ CSV Converter, Game XML Translator e STZ Lyrics. Foco em privacidade e eficiência.',
    openGraph: {
        title: 'STZ LABS - Inovação Minimalista',
        description: 'Ecossistema de ferramentas modulares para desktop.',
        type: 'website',
        images: ['https://stz-labs.vercel.app/public/og-image.png'],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://stz-labs.vercel.app/public/og-image.png'],
    },
};

export const viewport = {
    themeColor: '#0a0a0a',
};

export default function HomePage() {
    return (
        <div
            className="app-shell"
            style={{
                minHeight: '100vh',
                padding: '70px 0 80px',
            }}
        >
            <div className="container">
                <section className="products">
                    <Hero />
                    <div className="product-grid">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.slug || project.titleKey}
                                titleKey={project.titleKey}
                                descriptionKey={project.descriptionKey}
                                versionKey={project.versionKey}
                                repoName={project.repoName}
                                detailHref={project.slug ? `/projects/${project.slug}` : null}
                                downloadHref={project.downloadHref}
                                badgeLabel={project.badgeLabel}
                                badgeLabelKey={project.badgeLabelKey}
                                badgeVariant={project.badgeVariant}
                                badgeAttrs={project.badgeAttrs}
                                tags={project.tags}
                                detailLabelKey={project.detailLabelKey}
                                downloadLabelKey={project.downloadLabelKey}
                                style={project.style}
                                actionButtons={project.actionButtons}
                            />
                        ))}
                    </div>
                </section>
            </div>
            <Philosophy />
            <StatusTimeline />
        </div>
    );
}
