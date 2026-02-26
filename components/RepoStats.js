"use client";

import { useEffect, useMemo, useState } from 'react';

const ONE_HOUR = 60 * 60 * 1000;
const OWNER = 'starzynhobr';

const normalizeRepo = (repoName) => (repoName.includes('/') ? repoName : `${OWNER}/${repoName}`);

const readCache = (key) => {
    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (error) {
        return null;
    }
};

const writeCache = (key, value) => {
    try {
        window.localStorage.setItem(
            key,
            JSON.stringify({
                value,
                timestamp: Date.now(),
            })
        );
    } catch (error) {
        // Ignorar falhas de quota/privacidade silenciosamente.
    }
};

const memoryCache = new Map();
const inflightRequests = new Map();

const RepoStats = ({
    repoName,
    variant = 'both',
    badgeVariant = 'stable',
    badgeAttrs = {},
}) => {
    const [stats, setStats] = useState({ stars: null, releaseTag: null });

    const repo = useMemo(() => (repoName ? normalizeRepo(repoName) : null), [repoName]);
    const cacheKey = repo ? `repo-stats:${repo}` : null;

    useEffect(() => {
        if (!repo || !cacheKey) return;

        const memoryEntry = memoryCache.get(repo);
        const cached = memoryEntry || readCache(cacheKey);
        if (cached?.value) {
            setStats({
                stars: cached.value.stars ?? null,
                releaseTag: cached.value.releaseTag ?? null,
            });
        }

        const isFresh = cached?.timestamp && Date.now() - cached.timestamp < ONE_HOUR;
        if (isFresh) return;

        let cancelled = false;

        const load = async () => {
            if (inflightRequests.has(repo)) {
                return inflightRequests.get(repo);
            }

            const request = (async () => {
                try {
                    const [repoResponse, releaseResponse] = await Promise.all([
                        fetch(`https://api.github.com/repos/${repo}`),
                        fetch(`https://api.github.com/repos/${repo}/releases/latest`),
                    ]);

                    let stars = null;
                    let releaseTag = null;

                    if (repoResponse.ok) {
                        const repoData = await repoResponse.json();
                        stars = Number.isFinite(repoData.stargazers_count)
                            ? repoData.stargazers_count
                            : null;
                    }

                    if (releaseResponse.ok) {
                        const releaseData = await releaseResponse.json();
                        releaseTag = releaseData.tag_name || releaseData.name || null;
                    }

                    if (stars === null && releaseTag === null) return null;

                    const nextStats = { stars, releaseTag };
                    const nextCache = { value: nextStats, timestamp: Date.now() };
                    memoryCache.set(repo, nextCache);
                    writeCache(cacheKey, nextStats);
                    return nextStats;
                } catch (error) {
                    return null;
                } finally {
                    inflightRequests.delete(repo);
                }
            })();

            inflightRequests.set(repo, request);
            const nextStats = await request;
            if (nextStats && !cancelled) {
                setStats(nextStats);
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [repo, cacheKey]);

    const starLabel = Number.isFinite(stats.stars)
        ? stats.stars.toLocaleString('pt-BR')
        : '—';
    const releaseLabel = stats.releaseTag || '—';
    const starStyle = Number.isFinite(stats.stars) ? undefined : { opacity: 0.6 };

    if (variant === 'version') {
        return <p className="card-version">{releaseLabel}</p>;
    }

    if (variant === 'release-inline') {
        return <span>{releaseLabel}</span>;
    }

    if (variant === 'badge') {
        return (
            <span className={`badge ${badgeVariant}`} {...badgeAttrs}>
                {releaseLabel}
            </span>
        );
    }

    if (variant === 'stars') {
        return (
            <span
                className="tag stars"
                data-gh-stars={repo || undefined}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    lineHeight: 1,
                    ...starStyle,
                }}
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
                    style={{ display: 'block' }}
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="count">{starLabel}</span>
            </span>
        );
    }

    return null;
};

export default RepoStats;
