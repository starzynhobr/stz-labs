import TranslatedText from './TranslatedText';

/**
 * Vídeos curtos do projeto (sem áudio). O arquivo só carrega quando o visitante dá play:
 * `preload="none"` + pôster, para a página continuar leve.
 */
export default function ProjectVideos({ items = [] }) {
    if (!items.length) return null;

    return (
        <section className="container max-w-5xl mx-auto px-6 mb-24 relative z-10">
            <div className="flex items-center gap-4 mb-12">
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent flex-1" />
                <TranslatedText
                    as="h2"
                    className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent)] font-bold px-4"
                    i18nKey="sections.videos_title"
                />
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent flex-1" />
            </div>

            <div className="space-y-10">
                {items.map((video) => (
                    <article
                        key={video.src}
                        className="rounded-[var(--radius-card)] bg-[var(--surface-primary)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)] overflow-hidden"
                    >
                        <video
                            className="w-full aspect-video bg-black"
                            src={video.src}
                            poster={video.poster}
                            controls
                            muted
                            playsInline
                            preload="none"
                        />
                        <div className="p-6 md:p-8">
                            <TranslatedText as="h3" className="text-lg font-bold text-[var(--text-heading)] mb-2 tracking-tight" i18nKey={video.titleKey} />
                            <TranslatedText as="p" className="text-sm text-[var(--text-secondary)] leading-relaxed" i18nKey={video.descriptionKey} />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
