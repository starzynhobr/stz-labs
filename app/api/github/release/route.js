import { NextResponse } from 'next/server';
import { RELEASE_CACHE_SECONDS, findRelease } from '../../../../lib/github';

export const revalidate = 3600;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const release = await findRelease({
        repoName: searchParams.get('repo'),
        tagPrefix: searchParams.get('tagPrefix'),
        assetPattern: searchParams.get('assetPattern'),
    });

    if (!release) {
        return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    return NextResponse.json(release, {
        headers: {
            'Cache-Control': `public, s-maxage=${RELEASE_CACHE_SECONDS}, stale-while-revalidate=86400`,
        },
    });
}
