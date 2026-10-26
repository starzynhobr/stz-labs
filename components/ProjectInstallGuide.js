import Link from 'next/link';
import TranslatedText from './TranslatedText';
import { Button } from './ui/Button';

const cardClass =
    'p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)]';

function formatSize(bytes) {
    if (!bytes) return null;
    return `${Math.round(bytes / (1024 * 1024))} MB`;
}

/**
 * Bloco de download (versão, tamanho, requisitos e o aviso do SmartScreen, que é o maior
 * atrito para quem baixa um .exe não assinado) e o passo a passo para atualizar.
 */
export default function ProjectInstallGuide({ guide, release, downloadHref }) {
    if (!guide) return null;
    const details = [release?.version ? `v${release.version}` : null, formatSize(release?.size)].filter(Boolean);

    return (
        <section className="container max-w-5xl mx-auto px-6 mb-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <article className={cardClass}>
                    <TranslatedText as="h2" className="text-xl font-bold text-[var(--text-heading)] mb-2 tracking-tight" i18nKey={guide.downloadTitleKey} />
                    {details.length > 0 && (
                        <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-6">{details.join(' · ')}</p>
                    )}
                    <ul className="space-y-2 mb-6">
                        {guide.requirementKeys.map((key) => (
                            <li key={key} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                                <span className="text-[var(--accent)]" aria-hidden="true">✓</span>
                                <TranslatedText as="span" i18nKey={key} />
                            </li>
                        ))}
                    </ul>
                    <div className="mb-6 rounded-[var(--radius-card)] border border-amber-400/30 bg-amber-400/5 p-4">
                        <TranslatedText as="p" className="text-sm font-bold text-[var(--text-heading)] mb-1" i18nKey={guide.smartscreenTitleKey} />
                        <TranslatedText as="p" className="text-sm text-[var(--text-secondary)] leading-relaxed" i18nKey={guide.smartscreenDescriptionKey} />
                    </div>
                    {downloadHref && (
                        <Button asChild variant="primary" size="default" className="px-8">
                            <Link href={downloadHref}>
                                <TranslatedText as="span" i18nKey="cards.btn_download" />
                            </Link>
                        </Button>
                    )}
                </article>

                <article className={cardClass}>
                    <TranslatedText as="h2" className="text-xl font-bold text-[var(--text-heading)] mb-6 tracking-tight" i18nKey={guide.updateTitleKey} />
                    <ol className="space-y-4 mb-6">
                        {guide.updateStepKeys.map((key, index) => (
                            <li key={key} className="flex gap-4">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border [border-color:var(--border-strong)] text-xs font-mono text-[var(--accent)]">
                                    {index + 1}
                                </span>
                                <TranslatedText as="p" className="text-sm text-[var(--text-secondary)] leading-relaxed pt-1" i18nKey={key} />
                            </li>
                        ))}
                    </ol>
                    {guide.updateVideo && (
                        <video
                            className="w-full aspect-video rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-black"
                            src={guide.updateVideo.src}
                            poster={guide.updateVideo.poster}
                            controls
                            muted
                            playsInline
                            preload="none"
                        />
                    )}
                </article>
            </div>
        </section>
    );
}
