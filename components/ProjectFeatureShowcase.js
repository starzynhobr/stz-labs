import Image from 'next/image';
import TranslatedText from './TranslatedText';
import { cn } from '../lib/utils';

export default function ProjectFeatureShowcase({ items = [] }) {
    if (!items.length) return null;

    return (
        <section className="container max-w-6xl mx-auto px-6 mb-24 relative z-10">
            <div className="space-y-16 md:space-y-20">
                {items.map((item, index) => {
                    const imageRight = item.align === 'image-right' || index % 2 === 1;

                    return (
                        <article
                            key={item.image}
                            className={cn(
                                "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center",
                                imageRight && "lg:[&>*:first-child]:order-2"
                            )}
                        >
                            <div className="lg:col-span-7">
                                <div className="group relative aspect-[1.49/1] overflow-hidden rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] shadow-[var(--shadow)]">
                                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[var(--accent)]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        fill
                                        className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.015]"
                                        sizes="(max-width: 1024px) 100vw, 58vw"
                                    />
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="h-px w-10 bg-[var(--accent)]/50" />
                                    <TranslatedText
                                        as="span"
                                        className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--accent)]"
                                        i18nKey={item.kickerKey}
                                    />
                                </div>
                                <TranslatedText
                                    as="h2"
                                    className="mb-4 text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-heading)]"
                                    i18nKey={item.titleKey}
                                />
                                <TranslatedText
                                    as="p"
                                    className="text-sm md:text-base leading-relaxed text-[var(--text-secondary)]"
                                    i18nKey={item.descriptionKey}
                                />
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
