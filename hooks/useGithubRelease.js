"use client";

import { useEffect, useMemo, useState } from 'react';

const ONE_HOUR = 60 * 60 * 1000;
const OWNER = 'starzynhobr';
const MAX_PAGES = 5;

const memoryCache = new Map();
const inflightRequests = new Map();

const normalizeRepo = (repoName) => (
    repoName?.includes('/') ? repoName : `${OWNER}/${repoName}`
);

const readCache = (key) => {
    try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const writeCache = (key, value) => {
    try {
        window.localStorage.setItem(key, JSON.stringify({ value, timestamp: Date.now() }));
    } catch {
        // O fallback continua disponível quando o armazenamento está bloqueado.
    }
};

const getVersion = (tagName, tagPrefix) => {
    const value = tagName.startsWith(tagPrefix)
        ? tagName.slice(tagPrefix.length)
        : tagName;

    return value.replace(/^v/i, '');
};

const findRelease = async ({ repo, tagPrefix, assetPattern }) => {
    const assetRegex = new RegExp(assetPattern, 'i');

    for (let page = 1; page <= MAX_PAGES; page += 1) {
        const response = await fetch(
            `https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`
        );

        if (!response.ok) return null;

        const releases = await response.json();
        const release = releases.find((item) => (
            !item.draft
            && !item.prerelease
            && item.tag_name?.startsWith(tagPrefix)
            && item.assets?.some((asset) => assetRegex.test(asset.name))
        ));

        if (release) {
            const asset = release.assets.find((item) => assetRegex.test(item.name));
            return {
                tagName: release.tag_name,
                version: getVersion(release.tag_name, tagPrefix),
                downloadUrl: asset.browser_download_url,
                releaseUrl: release.html_url,
            };
        }

        if (releases.length < 100) return null;
    }

    return null;
};

export function useGithubRelease({
    repoName,
    tagPrefix,
    assetPattern,
    fallbackTag,
    fallbackDownloadUrl,
}) {
    const repo = useMemo(() => normalizeRepo(repoName), [repoName]);
    const fallback = useMemo(() => ({
        tagName: fallbackTag,
        version: fallbackTag && tagPrefix ? getVersion(fallbackTag, tagPrefix) : null,
        downloadUrl: fallbackDownloadUrl,
        releaseUrl: null,
    }), [fallbackDownloadUrl, fallbackTag, tagPrefix]);
    const [release, setRelease] = useState(fallback);
    const enabled = Boolean(repo && tagPrefix && assetPattern);
    const cacheKey = enabled
        ? `github-release:v1:${repo}:${tagPrefix}:${assetPattern}`
        : null;

    useEffect(() => {
        if (!enabled || !cacheKey) return undefined;

        let cancelled = false;
        const memoryEntry = memoryCache.get(cacheKey);
        const cached = memoryEntry || readCache(cacheKey);

        if (cached?.value) {
            queueMicrotask(() => {
                if (!cancelled) setRelease(cached.value);
            });
        }

        const isFresh = cached?.timestamp && Date.now() - cached.timestamp < ONE_HOUR;
        if (isFresh) {
            return () => {
                cancelled = true;
            };
        }

        const load = async () => {
            let request = inflightRequests.get(cacheKey);

            if (!request) {
                request = findRelease({ repo, tagPrefix, assetPattern })
                    .catch(() => null)
                    .finally(() => inflightRequests.delete(cacheKey));
                inflightRequests.set(cacheKey, request);
            }

            const nextRelease = await request;
            if (!nextRelease) return;

            const nextCache = { value: nextRelease, timestamp: Date.now() };
            memoryCache.set(cacheKey, nextCache);
            writeCache(cacheKey, nextRelease);

            if (!cancelled) setRelease(nextRelease);
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [assetPattern, cacheKey, enabled, repo, tagPrefix]);

    return release;
}
