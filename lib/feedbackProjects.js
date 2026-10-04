import { GYM_POLL_OPTIONS, GYM_SUGGESTION_LENGTH } from '../data/stzGym';
import { DOWNLOADER_POLL_OPTIONS, DOWNLOADER_SUGGESTION_LENGTH } from '../data/stzDownloader';

// IDs públicos e prefixos persistidos são explícitos: nunca vêm do payload.
const PROJECTS = {
    'stz-gym': {
        prefix: 'gym', name: 'STZ Gym', clientHashPrefix: 'stz-gym',
        pollOptions: GYM_POLL_OPTIONS, suggestionLength: GYM_SUGGESTION_LENGTH,
        discordEnv: 'DISCORD_FEEDBACK_STZ_GYM_WEBHOOK_URL',
    },
    'stz-downloader': {
        prefix: 'downloader', name: 'STZ Downloader',
        pollOptions: DOWNLOADER_POLL_OPTIONS, suggestionLength: DOWNLOADER_SUGGESTION_LENGTH,
        discordEnv: 'DISCORD_FEEDBACK_STZ_DOWNLOADER_WEBHOOK_URL',
    },
    'stz-xml-translator': {
        prefix: 'xml-translator', name: 'STZ XML Translator',
        pollOptions: [], suggestionLength: { min: 10, max: 500 },
        discordEnv: 'DISCORD_FEEDBACK_STZ_XML_TRANSLATOR_WEBHOOK_URL',
    },
    'stz-pdf-suite': {
        prefix: 'pdf-suite', name: 'STZ PDF Suite',
        pollOptions: [], suggestionLength: { min: 10, max: 500 },
        discordEnv: 'DISCORD_FEEDBACK_STZ_PDF_SUITE_WEBHOOK_URL',
    },
};

export function getFeedbackProject(id) {
    return Object.hasOwn(PROJECTS, id) ? { ...PROJECTS[id], id } : null;
}
