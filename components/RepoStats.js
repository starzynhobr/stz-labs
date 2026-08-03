import { Tag } from './ui/Tag';
import { Badge } from './ui/Badge';

/**
 * Apresenta estrelas e a tag do último release. Os dados chegam prontos do
 * servidor — o componente não busca nada, então não há chamada externa a
 * partir do navegador nem consumo do limite da API do GitHub por visitante.
 */
const RepoStats = ({
    stats = null,
    variant = 'stars',
    badgeVariant,
    badgeAttrs = {},
    repoName,
}) => {
    const starLabel = Number.isFinite(stats?.stars)
        ? stats.stars.toLocaleString('pt-BR')
        : '—';
    const releaseLabel = stats?.releaseTag || '—';
    const hasStars = Number.isFinite(stats?.stars);

    if (variant === 'version') {
        return <p className="card-version">{releaseLabel}</p>;
    }

    if (variant === 'release-inline') {
        return <span>{releaseLabel}</span>;
    }

    if (variant === 'badge') {
        return (
            <Badge variant={badgeVariant || 'stable'} {...badgeAttrs}>
                {releaseLabel}
            </Badge>
        );
    }

    if (variant === 'stars') {
        return (
            <Tag
                variant="stars"
                data-gh-stars={repoName || undefined}
                className={hasStars ? '' : 'opacity-60'}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="count">{starLabel}</span>
            </Tag>
        );
    }

    return null;
};

export default RepoStats;
