"use client";

import { useEffect, useState } from 'react';

const ONE_HOUR = 60 * 60 * 1000;
const OWNER = 'starzynhobr';
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

const fetchPluginVersions = async (repo) => {
    const response = await fetch(`/api/github/plugin-versions?repo=${encodeURIComponent(repo)}`);

    if (!response.ok) return null;

    return response.json();
};

export function usePluginVersions(repoName, initialVersions = null) {
    const repo = normalizeRepo(repoName);
    const [versions, setVersions] = useState(() => memoryCache?.value || initialVersions || {});

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
