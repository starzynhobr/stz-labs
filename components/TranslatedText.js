"use client";

import { createElement } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function TranslatedText({ as = 'span', i18nKey, className, ...props }) {
    const { t } = useLanguage();
    const content = i18nKey ? t(i18nKey) : '';

    return createElement(
        as,
        {
            className,
            'data-i18n': i18nKey,
            ...props,
        },
        content
    );
}
