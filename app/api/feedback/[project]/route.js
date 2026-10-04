import { NextResponse } from 'next/server';
import { createFeedbackRoute } from '../../../../lib/feedback';
import { getFeedbackProject } from '../../../../lib/feedbackProjects';

export const dynamic = 'force-dynamic';

async function dispatch(method, request, context) {
    const { project } = await context.params;
    const config = getFeedbackProject(project);
    if (!config) return NextResponse.json({ error: 'not_found' }, {
        status: 404, headers: { 'Cache-Control': 'no-store' },
    });
    return createFeedbackRoute(config)[method](request);
}

export const GET = (request, context) => dispatch('GET', request, context);
export const POST = (request, context) => dispatch('POST', request, context);
