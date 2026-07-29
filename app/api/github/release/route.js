import { NextResponse } from 'next/server';
import {
    RELEASE_CACHE_SECONDS,
    fetchReleasePages,
    resolveRepo,
    stripTagPrefix,
} from '../../../../lib/github';

export const revalidate = 3600;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const repo = resolveRepo(searchParams.get('repo'));
    const tagPrefix = searchParams.get('tagPrefix') || '';
    const assetPattern = searchParams.get('assetPattern') || '';

    if (!repo || !tagPrefix || !assetPattern) {
        return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
    }

    let assetRegex;
    try {
        assetRegex = new RegExp(assetPattern, 'i');
    } catch {
        return NextResponse.json({ error: 'invalid_asset_pattern' }, { status: 400 });
    }

    let found = null;

    const ok = await fetchReleasePages(repo, (releases) => {
        const release = releases.find((item) => (
            !item.draft
            && !item.prerelease
            && item.tag_name?.startsWith(tagPrefix)
            && item.assets?.some((asset) => assetRegex.test(asset.name))
        ));

        if (!release) return false;

        const asset = release.assets.find((item) => assetRegex.test(item.name));
        found = {
            tagName: release.tag_name,
            version: stripTagPrefix(release.tag_name, tagPrefix),
            downloadUrl: asset.browser_download_url,
            releaseUrl: release.html_url,
        };

        return true;
    });

    if (!ok || !found) {
        return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    return NextResponse.json(found, {
        headers: {
            'Cache-Control': `public, s-maxage=${RELEASE_CACHE_SECONDS}, stale-while-revalidate=86400`,
        },
    });
}
