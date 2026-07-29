"use client";

import { useEffect, useState } from 'react';

const ONE_HOUR = 60 * 60 * 1000;
const OWNER = 'starzynhobr';
const MAX_PAGES = 5;
const CACHE_KEY = 'github-plugin-versions:v1';

let memoryCache = null;
let inflightRequest = null;

const normalizeRepo = (repoName) => (
    repoName?.includes('/') ? repoName : `${OWNER}/${repoName}`
);

const readCache = () => {
    try {
        const raw = window.localStorage.getItem(CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const writeCache = (value) => {
    try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify({ value, timestamp: Date.now() }));
    } catch {
        // O fallback continua disponível quando o armazenamento está bloqueado.
    }
};

const parseVersion = (value) => value.split('.').map((part) => Number.parseInt(part, 10) || 0);

const isNewer = (candidate, current) => {
    if (!current) return true;

    const next = parseVersion(candidate);
    const previous = parseVersion(current);

    for (let index = 0; index < Math.max(next.length, previous.length); index += 1) {
        const a = next[index] || 0;
        const b = previous[index] || 0;
        if (a !== b) return a > b;
    }

    return false;
};

const fetchPluginVersions = async (repo) => {
    const versions = {};

    for (let page = 1; page <= MAX_PAGES; page += 1) {
        const response = await fetch(
            `https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`
        );

        if (!response.ok) return Object.keys(versions).length ? versions : null;

        const releases = await response.json();

        releases.forEach((release) => {
            if (release.draft) return;

            const match = /^([a-z0-9-]+)-v(\d+\.\d+\.\d+)$/i.exec(release.tag_name || '');
            if (!match) return;

            const [, id, version] = match;
            const hasPackage = release.assets?.some((asset) => /\.stz-plugin$/i.test(asset.name));
            if (!hasPackage) return;

            if (isNewer(version, versions[id]?.version)) {
                versions[id] = { version, releaseUrl: release.html_url };
            }
        });

        if (releases.length < 100) break;
    }

    return versions;
};

export function usePluginVersions(repoName) {
    const repo = normalizeRepo(repoName);
    const [versions, setVersions] = useState(() => memoryCache?.value || {});

    useEffect(() => {
        if (!repo) return undefined;

        let cancelled = false;
        const cached = memoryCache || readCache();

        if (cached?.value) {
            queueMicrotask(() => {
                if (!cancelled) setVersions(cached.value);
            });
        }

        const isFresh = cached?.timestamp && Date.now() - cached.timestamp < ONE_HOUR;
        if (isFresh) {
            return () => {
                cancelled = true;
            };
        }

        const load = async () => {
            if (!inflightRequest) {
                inflightRequest = fetchPluginVersions(repo)
                    .catch(() => null)
                    .finally(() => {
                        inflightRequest = null;
                    });
            }

            const next = await inflightRequest;
            if (!next) return;

            memoryCache = { value: next, timestamp: Date.now() };
            writeCache(next);

            if (!cancelled) setVersions(next);
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [repo]);

    return versions;
}
