import * as pt from './pt';
import * as en from './en';

const content = { pt, en };

export const getMouseContent = (locale) => content[locale] || content.pt;

export const getToolContent = (locale, toolId) => getMouseContent(locale).tools[toolId] || null;
