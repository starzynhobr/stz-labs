import Link from 'next/link';
import RepoStats from './RepoStats';
import TranslatedText from './TranslatedText';

const Tag = ({ label, labelKey, className = '', dataAttrs = {} }) => {
    if (labelKey) {
        return (
            <TranslatedText
                as="span"
                className={`tag ${className}`.trim()}
                i18nKey={labelKey}
                {...dataAttrs}
            />
        );
    }

    return (
        <span className={`tag ${className}`.trim()} {...dataAttrs}>
            {label}
        </span>
    );
};

const ProjectCard = ({
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
}) => (
    <article className="card" style={style}>
        <div className="card-header">
            {titleKey ? (
                <TranslatedText as="h3" className="card-title" i18nKey={titleKey} />
            ) : (
                <h3 className="card-title">{title}</h3>
            )}
            {repoName ? (
                <RepoStats
                    repoName={repoName}
                    variant="badge"
                    badgeVariant={badgeVariant}
                    badgeAttrs={badgeAttrs}
                />
            ) : badgeLabelKey ? (
                <TranslatedText
                    as="span"
                    className={`badge ${badgeVariant}`}
                    i18nKey={badgeLabelKey}
                    {...badgeAttrs}
                />
            ) : (
                badgeLabel && (
                    <span className={`badge ${badgeVariant}`} {...badgeAttrs}>
                        {badgeLabel}
                    </span>
                )
            )}
        </div>
        {repoName
            ? null
            : versionKey
              ? (
                    <TranslatedText as="p" className="card-version" i18nKey={versionKey} />
                )
              : version && <p className="card-version">{version}</p>}
        {descriptionKey ? (
            <TranslatedText as="p" className="card-desc" i18nKey={descriptionKey} />
        ) : (
            <p className="card-desc">{description}</p>
        )}
        <div className="tags">
            {tags.map((tag) => {
                const normalizedTag = typeof tag === 'string' ? { label: tag } : tag;
                return (
                    <Tag
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
        <div className="card-actions">
            {actionButtons?.length ? (
                actionButtons.map((action) => (
                    <TranslatedText
                        key={action.labelKey || action.label}
                        as="span"
                        className={`btn btn-${action.variant || 'primary'} btn-sm`}
                        i18nKey={action.labelKey}
                        style={action.style}
                    />
                ))
            ) : (
                <>
                    {detailHref && (
                        detailLabelKey ? (
                            <Link href={detailHref} className="btn btn-primary btn-sm">
                                <TranslatedText as="span" i18nKey={detailLabelKey} />
                            </Link>
                        ) : (
                            <Link href={detailHref} className="btn btn-primary btn-sm">
                                {detailLabel}
                            </Link>
                        )
                    )}
                    {downloadHref && (
                        downloadLabelKey ? (
                            <a
                                href={downloadHref}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-secondary btn-sm"
                            >
                                <TranslatedText as="span" i18nKey={downloadLabelKey} />
                            </a>
                        ) : (
                            <a
                                href={downloadHref}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-secondary btn-sm"
                            >
                                {downloadLabel}
                            </a>
                        )
                    )}
                </>
            )}
        </div>
    </article>
);

export default ProjectCard;
