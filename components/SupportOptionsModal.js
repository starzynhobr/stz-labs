'use client';

import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import TranslatedText from './TranslatedText';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/Button';
import SupportOptions from './SupportOptions';

export default function SupportOptionsModal({ kofiUrl, mercadoPagoLinks }) {
    const [isOpen, setIsOpen] = useState(false);
    const titleId = useId();
    const { t } = useLanguage();

    useEffect(() => {
        if (!isOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <>
            <Button
                variant="primary"
                onClick={() => setIsOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                className="w-full relative group overflow-hidden py-6 cursor-pointer"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                <TranslatedText as="span" className="relative font-bold text-base" i18nKey="support.open_modal_cta" />
            </Button>

            {isOpen && typeof document !== 'undefined'
                ? createPortal(
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                    role="presentation"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative w-full max-w-lg bg-[var(--surface-3)] border [border-color:var(--border-strong)] rounded-[var(--radius-card)] p-8 shadow-2xl animate-in zoom-in-95 duration-300"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-2xl leading-none"
                            onClick={() => setIsOpen(false)}
                            aria-label={t('support.modal_close_aria')}
                        >
                            <span aria-hidden="true">×</span>
                        </button>

                        <div className="mb-10">
                            <TranslatedText as="h3" className="text-2xl font-bold text-[var(--text-heading)] mb-2 tracking-tight" i18nKey="support.modal_title" id={titleId} />
                            <TranslatedText
                                as="p"
                                className="text-sm text-[var(--text-secondary)] leading-relaxed"
                                i18nKey="support.modal_subtitle"
                            />
                        </div>

                        <SupportOptions kofiUrl={kofiUrl} mercadoPagoLinks={mercadoPagoLinks} />
                    </div>
                </div>,
                document.body
            )
                : null}
        </>
    );
}
