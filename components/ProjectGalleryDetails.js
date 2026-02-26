"use client";

import { useId, useState } from 'react';
import TranslatedText from './TranslatedText';

export default function ProjectGalleryDetails({ items = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const panelId = useId();

    if (!items.length) return null;

    return (
        <div className={`product-gallery-details ${isOpen ? 'is-open' : ''}`}>
            <button
                type="button"
                className="product-gallery-summary"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <TranslatedText as="span" i18nKey="sections.gallery_details_toggle" />
                <span className="product-gallery-summary-count">{items.length}</span>
            </button>

            <div id={panelId} className="product-gallery-details-panel">
                <div className="product-gallery-details-body">
                    <div className="product-gallery-grid">
                        {items.map((item) => (
                            <figure key={item.src} className="product-gallery-item">
                                <div className="product-gallery-frame">
                                    <img src={item.src} alt={item.alt} loading="lazy" />
                                </div>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
