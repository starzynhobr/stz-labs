import { handleReleaseHook } from '../../../lib/releaseHook';

export const dynamic = 'force-dynamic';

export const POST = (request) => handleReleaseHook(request);
