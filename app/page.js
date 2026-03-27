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
        images: ['https://stz-labs.vercel.app/og-image.png'],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://stz-labs.vercel.app/og-image.png'],
    },
};

export const viewport = {
    themeColor: '#0A0C10',
};

export default function Home() {
    // Ordenar os projetos de acordo com a prioridade selecionada manualmente
    const sortedProjects = [...projects].sort((a, b) => (a.priority || 99) - (b.priority || 99));

    return (
        <main className="min-h-screen bg-[#0A0C10] pt-24 pb-24 relative selection:bg-purple-500/30 text-white overflow-hidden">
            {/* Global Noise Overlay */}
            <div className="fixed inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-40 mix-blend-overlay pointer-events-none" />
            
            <div className="container relative z-10 max-w-[1200px] mx-auto px-6">
                <section className="mt-12 relative z-10 flex flex-col gap-16">
                    <Hero />
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
                        {sortedProjects.map((project) => (
                            <ProjectCard
                                key={project.slug || project.titleKey}
                                layoutType={project.layoutType}
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
                                downloadDisabledLabelKey={project.downloadDisabledLabelKey}
                                style={project.style}
                                actionButtons={project.actionButtons}
                            />
                        ))}
                    </div>
                </section>

                {/* Legacy Components that will be refactored eventually - wrapped nicely */}
                <div className="mt-24 max-w-4xl mx-auto space-y-16">
                    <Philosophy />
                    <StatusTimeline />
                </div>
            </div>
        </main>
    );
}
