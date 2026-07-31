import * as pt from './pt';
import * as en from './en';
import * as es from './es';
import * as fr from './fr';
import * as de from './de';
import * as it from './it';

const content = { pt, en, es, fr, de, it };

export const getMouseContent = (locale) => content[locale] || content.pt;

export const getToolContent = (locale, toolId) => getMouseContent(locale).tools[toolId] || null;
