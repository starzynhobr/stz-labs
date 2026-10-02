import ProjectGrid from '../../components/ProjectGrid';
import GameProjects from '../../components/GameProjects';
import Hero from '../../components/Hero';
import GymSpotlight from '../../components/gym/GymSpotlight';
import Philosophy from '../../components/Philosophy';
import StatusTimeline from '../../components/StatusTimeline';
import { projects } from '../../data/projects';
import { JsonLd, buildSiteLd } from '../../lib/structuredData';
import { resolveProjectReleases, resolveProjectStats } from '../../lib/releases';
import { buildPageMetadata } from '../../lib/pageMetadata';
import { isLocale, localeParams } from '../../lib/i18n';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
    return localeParams();
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    return buildPageMetadata('home', locale);
}


export const viewport = {
    themeColor: '#0A0C10',
};

export const revalidate = 3600;

export default async function Home({ params }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    // Ordenar os projetos de acordo com a prioridade selecionada manualmente
    const sortedProjects = [...projects].sort((a, b) => (a.priority || 99) - (b.priority || 99));
    const [releases, stats] = await Promise.all([
        resolveProjectReleases(sortedProjects),
        resolveProjectStats(sortedProjects),
    ]);

    return (
        <main className="min-h-screen bg-transparent pt-24 pb-24 relative selection:bg-purple-500/30 text-white overflow-hidden">
            <JsonLd data={buildSiteLd()} />

            <div className="container relative z-10 max-w-[1200px] mx-auto px-6">
                <section className="mt-12 relative z-10 flex flex-col gap-16">
                    <GymSpotlight />

                    <div className="flex flex-col gap-8">
                    <Hero />

                    <ProjectGrid projectList={sortedProjects.filter((project) => !project.gameId)} locale={locale} releases={releases} stats={stats} />
                    </div>
                    <GameProjects projectList={sortedProjects.filter((project) => project.gameId)} locale={locale} releases={releases} stats={stats} />
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
