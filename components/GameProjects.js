import ProjectGrid from './ProjectGrid';
import TranslatedText from './TranslatedText';

export default function GameProjects({ projectList, locale, releases, stats }) {
    if (!projectList.length) return null;

    const games = [...new Set(projectList.map((project) => project.gameId))];

    return (
        <section aria-labelledby="game-tools-title" className="flex flex-col gap-8">
            <header className="border-b [border-color:var(--border-subtle)] pb-8">
                <TranslatedText as="h2" id="game-tools-title" i18nKey="sections.game_tools_title" className="mb-2 text-3xl font-bold tracking-tighter text-[var(--text-primary)] md:text-4xl" />
                <TranslatedText as="p" i18nKey="sections.game_tools_subtitle" className="text-base leading-relaxed text-[var(--text-secondary)]" />
            </header>
            {games.map((gameId) => {
                const items = projectList.filter((project) => project.gameId === gameId);
                return (
                    <section key={gameId} aria-labelledby={gameId + '-title'} className="flex flex-col gap-6">
                        <h3 id={gameId + '-title'} className="font-mono text-sm uppercase tracking-widest text-[var(--accent)]">{items[0].gameName}</h3>
                        <ProjectGrid projectList={items} locale={locale} releases={releases} stats={stats} />
                    </section>
                );
            })}
        </section>
    );
}
