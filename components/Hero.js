"use client";

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import TranslatedText from './TranslatedText';

export default function Hero() {
    const { t } = useLanguage();

    return (
        <div className="section-header section-header-projects">
            <div className="section-header-top">
                <TranslatedText as="h2" className="text-accent" i18nKey="sections.projects_title" />
                <div className="projects-support-cta">
                    <Link
                        href="/support"
                        className="btn btn-primary btn-sm support-cta-btn"
                        aria-label={t('sections.projects_support_aria')}
                    >
                        <TranslatedText as="span" i18nKey="sections.projects_support_cta" />
                    </Link>
                    <TranslatedText
                        as="span"
                        className="support-cta-note text-muted"
                        i18nKey="sections.projects_support_note"
                    />
                </div>
            </div>
            <TranslatedText as="p" className="text-muted" i18nKey="sections.projects_subtitle" />
        </div>
    );
}
