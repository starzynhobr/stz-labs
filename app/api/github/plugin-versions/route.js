import { NextResponse } from 'next/server';
import { RELEASE_CACHE_SECONDS, findPluginVersions } from '../../../../lib/github';

export const revalidate = 3600;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const versions = await findPluginVersions(searchParams.get('repo'));

    if (!versions) {
        return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
    }

    return NextResponse.json(versions, {
        headers: {
            'Cache-Control': `public, s-maxage=${RELEASE_CACHE_SECONDS}, stale-while-revalidate=86400`,
        },
    });
}
