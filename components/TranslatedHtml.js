"use client";

import { createElement } from 'react';
import { useLanguage } from '../context/LanguageContext';

const renderStrongMarkup = (content) => {
    if (!content) return null;

    const parts = content.split(/(<strong>.*?<\/strong>)/g);

    return parts.map((part, index) => {
        const match = part.match(/^<strong>(.*?)<\/strong>$/);
        if (!match) return part;

        return createElement('strong', { key: index }, match[1]);
    });
};

export default function TranslatedHtml({ as = 'span', i18nKey, className, ...props }) {
    const { t } = useLanguage();
    const content = i18nKey ? t(i18nKey) : '';

    return createElement(as, {
        className,
        'data-i18n': i18nKey,
        ...props,
    }, renderStrongMarkup(content));
}
