'use client';

import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import TranslatedText from './TranslatedText';
import { useLanguage } from '../context/LanguageContext';

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
            <button
                type="button"
                className="btn support-modal-trigger"
                onClick={() => setIsOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
            >
                <span className="support-modal-trigger-sheen" aria-hidden="true" />
                <TranslatedText as="span" i18nKey="support.open_modal_cta" />
            </button>

            {isOpen && typeof document !== 'undefined'
                ? createPortal(
                <div
                    className="support-modal-overlay"
                    role="presentation"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="support-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={titleId}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="support-modal-close"
                            onClick={() => setIsOpen(false)}
                            aria-label={t('support.modal_close_aria')}
                        >
                            <span aria-hidden="true">×</span>
                        </button>

                        <div className="support-modal-header">
                            <TranslatedText as="h3" i18nKey="support.modal_title" id={titleId} />
                            <TranslatedText
                                as="p"
                                className="text-muted"
                                i18nKey="support.modal_subtitle"
                            />
                        </div>

                        <div className="support-method-card">
                            <div className="support-method-copy">
                                <TranslatedText as="h4" i18nKey="support.kofi_title" />
                                <TranslatedText
                                    as="p"
                                    className="text-muted"
                                    i18nKey="support.kofi_text"
                                />
                            </div>
                            <a
                                href={kofiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary support-method-button"
                            >
                                <TranslatedText as="span" i18nKey="support.kofi_button" />
                            </a>
                        </div>

                        <div className="support-method-separator" aria-hidden="true" />

                        <div className="support-method-copy">
                            <TranslatedText as="h4" i18nKey="support.mercado_pago_title" />
                            <TranslatedText
                                as="p"
                                className="text-muted"
                                i18nKey="support.mercado_pago_text"
                            />
                        </div>

                        <div className="support-amount-grid">
                            {mercadoPagoLinks.map((option) => (
                                <a
                                    key={option.href}
                                    href={option.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary support-amount-button"
                                >
                                    <TranslatedText as="span" i18nKey={option.labelKey} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>,
                document.body
            )
                : null}
        </>
    );
}
