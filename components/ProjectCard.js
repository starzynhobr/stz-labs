import Link from 'next/link';
import RepoStats from './RepoStats';
import TranslatedText from './TranslatedText';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Tag as UITag } from './ui/Tag';

const cardVariants = cva(
    "group relative overflow-hidden transition-all duration-300 flex flex-col",
    {
        variants: {
            layout: {
                featured: "col-span-full md:grid md:grid-cols-12 rounded-[24px] bg-zinc-900/50 backdrop-blur-md border border-purple-500/20 shadow-2xl hover:border-purple-500/40 transition-all duration-500",
                bento: "col-span-full md:col-span-6 lg:col-span-4 min-h-[380px] rounded-[24px] bg-zinc-900/40 backdrop-blur-md border border-white/10 hover:border-purple-500/40 transition-all duration-500 flex flex-col",
                list: "col-span-full flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/5 hover:border-white/15 hover:bg-white/[0.05]",
            }
        },
        defaultVariants: {
            layout: "bento"
        }
    }
);

const TagWrapper = ({ label, labelKey, className = '', dataAttrs = {} }) => {
    if (labelKey) {
        return (
            <UITag variant={className.includes('stars') ? 'stars' : 'default'} {...dataAttrs}>
                <TranslatedText as="span" i18nKey={labelKey} />
            </UITag>
        );
    }
    return (
        <UITag variant={className.includes('stars') ? 'stars' : 'default'} {...dataAttrs}>
            {label}
        </UITag>
    );
};

// Mapeamento dos estilos .badge antigos para os nossos novos UI Badges
const badgeVariantMap = {
    'stable': 'stable',
    'beta': 'beta',
    'alpha': 'alpha',
    'default': 'default'
};

const ProjectCard = ({
    layoutType = 'bento',
    title,
    titleKey,
    description,
    descriptionKey,
    version,
    versionKey,
    detailHref,
    downloadHref,
    badgeLabel,
    badgeLabelKey,
    badgeVariant = 'stable',
    badgeAttrs = {},
    tags = [],
    repoName,
    detailLabel,
    detailLabelKey,
    downloadLabel,
    downloadLabelKey,
    style,
    actionButtons,
}) => {
    const isFeatured = layoutType === 'featured';
    const isList = layoutType === 'list';
    const mappedBadgeVariant = badgeVariantMap[badgeVariant] || 'default';

    if (isList) {
        return (
            <article className={cn(cardVariants({ layout: 'list' }))} style={style}>
                <div className="flex-1 mb-4 sm:mb-0 space-y-1.5">
                    <div className="flex items-center gap-3">
                         {titleKey ? (
                            <TranslatedText as="h3" className="text-lg font-bold text-zinc-100" i18nKey={titleKey} />
                         ) : (
                            <h3 className="text-lg font-bold text-zinc-100">{title}</h3>
                         )}
                         {repoName ? (
                            <RepoStats repoName={repoName} variant="badge" badgeVariant={mappedBadgeVariant} badgeAttrs={badgeAttrs} />
                         ) : badgeLabelKey ? (
                            <Badge variant={mappedBadgeVariant} {...badgeAttrs}>
                                <TranslatedText as="span" i18nKey={badgeLabelKey} />
                            </Badge>
                         ) : badgeLabel && (
                            <Badge variant={mappedBadgeVariant} {...badgeAttrs}>{badgeLabel}</Badge>
                         )}
                    </div>
                    {descriptionKey ? (
                        <TranslatedText as="p" className="text-sm text-zinc-400" i18nKey={descriptionKey} />
                    ) : (
                        <p className="text-sm text-zinc-400">{description}</p>
                    )}
                </div>
                <div className="flex gap-3 shrink-0">
                    {detailHref && (
                         <Button asChild variant="primary" size="sm">
                             <Link href={detailHref}>
                                 {detailLabelKey ? <TranslatedText as="span" i18nKey={detailLabelKey} /> : detailLabel || 'Detalhes'}
                             </Link>
                         </Button>
                    )}
                </div>
            </article>
        );
    }

    return (
        <article className={cn(cardVariants({ layout: layoutType }))} style={style}>
            {/* Edge Glow Hover Effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none rounded-[24px]" />

            <div className={cn(
                "relative z-10 flex flex-col h-full flex-1",
                isFeatured ? "md:col-span-7 p-8 md:p-12 lg:p-16 justify-center" : "p-8 md:p-10"
            )}>
                <div className="flex w-full justify-between items-start gap-4 mb-4">
                    <div className="flex flex-col gap-1.5 items-start">
                        {titleKey ? (
                            <TranslatedText as="h3" className={cn("font-bold text-zinc-100 tracking-tight leading-tight", isFeatured ? "text-3xl lg:text-4xl" : "text-xl md:text-2xl")} i18nKey={titleKey} />
                        ) : (
                            <h3 className={cn("font-bold text-zinc-100 tracking-tight leading-tight", isFeatured ? "text-3xl lg:text-4xl" : "text-xl md:text-2xl")}>{title}</h3>
                        )}
                        {repoName ? null : versionKey ? (
                            <TranslatedText as="p" className="text-[10px] tracking-widest text-purple-400 font-mono uppercase bg-purple-500/10 px-1.5 py-0.5 rounded" i18nKey={versionKey} />
                        ) : version && <p className="text-[10px] tracking-widest text-purple-400 font-mono uppercase bg-purple-500/10 px-1.5 py-0.5 rounded">{version}</p>}
                    </div>

                    {repoName ? (
                        <RepoStats repoName={repoName} variant="badge" badgeVariant={mappedBadgeVariant} badgeAttrs={badgeAttrs} />
                    ) : badgeLabelKey ? (
                        <Badge variant={mappedBadgeVariant} {...badgeAttrs}>
                            <TranslatedText as="span" i18nKey={badgeLabelKey} />
                        </Badge>
                    ) : badgeLabel && (
                        <Badge variant={mappedBadgeVariant} {...badgeAttrs}>{badgeLabel}</Badge>
                    )}
                </div>

                {descriptionKey ? (
                    <TranslatedText as="p" className={cn("text-zinc-400 leading-relaxed", isFeatured ? "text-lg/relaxed max-w-lg mb-8" : "text-sm md:text-[15px] mb-6")} i18nKey={descriptionKey} />
                ) : (
                    <p className={cn("text-zinc-400 leading-relaxed", isFeatured ? "text-lg/relaxed max-w-lg mb-8" : "text-sm md:text-[15px] mb-6")}>{description}</p>
                )}
                
                <div className="mt-auto pt-4 space-y-6 w-full">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => {
                            const normalizedTag = typeof tag === 'string' ? { label: tag } : tag;
                            return (
                                <TagWrapper
                                    key={normalizedTag.labelKey || normalizedTag.label}
                                    label={normalizedTag.label}
                                    labelKey={normalizedTag.labelKey}
                                    className={normalizedTag.className}
                                    dataAttrs={normalizedTag.dataAttrs}
                                />
                            );
                        })}
                        {repoName && <RepoStats repoName={repoName} variant="stars" />}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {actionButtons?.length ? (
                            actionButtons.map((action) => {
                                const isInternal = action.href?.startsWith('/');
                                const ButtonContent = () => (
                                    action.labelKey ? <TranslatedText as="span" i18nKey={action.labelKey} /> : <span>{action.label}</span>
                                );
                                
                                const Element = isInternal ? Link : (action.href ? 'a' : 'span');
                                const elementProps = isInternal ? { href: action.href } : (action.href ? { href: action.href, target: "_blank", rel: "noreferrer" } : {});
 
                                return (
                                    <Button key={action.labelKey || action.label} asChild={!!action.href} variant={action.variant || 'primary'} size={isFeatured ? "default" : "sm"} style={action.style} className={cn("px-5 py-2", !action.href ? "opacity-50 pointer-events-none" : "")}>
                                        <Element {...elementProps}>
                                            <ButtonContent />
                                        </Element>
                                    </Button>
                                );
                            })
                        ) : (
                            <>
                                {detailHref && (
                                    <Button asChild variant="primary" size={isFeatured ? "default" : "sm"} className="px-5 py-2">
                                        <Link href={detailHref}>
                                            {detailLabelKey ? <TranslatedText as="span" i18nKey={detailLabelKey} /> : detailLabel || 'Detalhes'}
                                        </Link>
                                    </Button>
                                )}
                                {downloadHref && (
                                    <Button asChild variant="secondary" size={isFeatured ? "default" : "sm"} className="px-5 py-2">
                                        <a href={downloadHref} target="_blank" rel="noreferrer">
                                            {downloadLabelKey ? <TranslatedText as="span" i18nKey={downloadLabelKey} /> : downloadLabel || 'Download'}
                                        </a>
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* PURE/MINIMALIST PANEL PARA O SPOTLIGHT (FEATURED APP) */}
            {isFeatured && (
                <div className="relative md:col-span-5 min-h-[300px] md:min-h-full border-t md:border-t-0 md:border-l border-white/5 bg-[#080A0E]/50 flex items-center justify-center p-6 sm:p-12 overflow-hidden rounded-b-[24px] md:rounded-r-[24px] md:rounded-bl-none z-0">
                    {/* Background Minimalist Grid Pattern - Extremely Subtle */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03)_1px,transparent_1px)] [background-size:32px_32px] opacity-100 pointer-events-none" />
                    
                    {/* Clean Interface Block - Laboratorial Look */}
                    <div className="w-full max-w-[340px] aspect-video flex flex-col items-center justify-center z-10 relative rounded-2xl border border-white/10 bg-zinc-900/10 backdrop-blur-md shadow-2xl">
                        <div className="flex items-center gap-2.5 text-zinc-500 font-mono text-[9px] tracking-[0.2em] uppercase">
                            <span className="w-1 h-1 rounded-full bg-purple-500/40 animate-pulse" />
                            Interface_System_Core
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
};

export default ProjectCard;
