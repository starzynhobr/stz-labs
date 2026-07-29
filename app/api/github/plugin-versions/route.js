import { NextResponse } from 'next/server';
import {
    RELEASE_CACHE_SECONDS,
    fetchReleasePages,
    isNewerVersion,
    resolveRepo,
} from '../../../../lib/github';

export const revalidate = 3600;

const PLUGIN_TAG = /^([a-z0-9-]+)-v(\d+\.\d+\.\d+)$/i;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const repo = resolveRepo(searchParams.get('repo'));

    if (!repo) {
        return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
    }

    const versions = {};

    const ok = await fetchReleasePages(repo, (releases) => {
        releases.forEach((release) => {
            if (release.draft) return;

            const match = PLUGIN_TAG.exec(release.tag_name || '');
            if (!match) return;

            const [, id, version] = match;
            const hasPackage = release.assets?.some((asset) => /\.stz-plugin$/i.test(asset.name));
            if (!hasPackage) return;

            if (isNewerVersion(version, versions[id]?.version)) {
                versions[id] = { version, releaseUrl: release.html_url };
            }
        });

        return false;
    });

    if (!ok && !Object.keys(versions).length) {
        return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    return NextResponse.json(versions, {
        headers: {
            'Cache-Control': `public, s-maxage=${RELEASE_CACHE_SECONDS}, stale-while-revalidate=86400`,
        },
    });
}
