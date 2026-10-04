import { createFeedbackRoute } from '../../../lib/feedback';
import { getFeedbackProject } from '../../../lib/feedbackProjects';

export const dynamic = 'force-dynamic';

export const { GET, POST } = createFeedbackRoute(getFeedbackProject('stz-downloader'));
