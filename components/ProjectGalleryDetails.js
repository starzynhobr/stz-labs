"use client";

import { createPortal } from 'react-dom';
import { useEffect, useId, useState } from 'react';
import Image from 'next/image';
import TranslatedText from './TranslatedText';

const GalleryImageButton = ({ item, className = '', onClick }) => (
    <button
        type="button"
        className={`product-gallery-image-button ${className}`.trim()}
        onClick={() => onClick(item)}
        aria-label={item.alt}
    >
        <div className="product-gallery-frame relative aspect-video overflow-hidden rounded-xl">
            <Image 
                src={item.src} 
                alt={item.alt} 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 100vw, 50vw" 
            />
        </div>
    </button>
);

export default function ProjectGalleryDetails({ heroItem = null, items = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const panelId = useId();

    const openImage = (item) => {
        setSelectedImage(item);
        setIsZoomed(false);
    };

    const closeImage = () => {
        setSelectedImage(null);
        setIsZoomed(false);
    };

    useEffect(() => {
        if (!selectedImage) return undefined;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeImage();
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedImage]);

    if (!heroItem && !items.length) return null;

    return (
            <>
            {heroItem ? (
                <figure className="product-gallery-item is-hero">
                    <GalleryImageButton
                        item={heroItem}
                        className="is-hero"
                        onClick={openImage}
                    />
                </figure>
            ) : null}

            {items.length ? (
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
                                        <GalleryImageButton item={item} onClick={openImage} />
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {selectedImage && typeof document !== 'undefined'
                ? createPortal(
                    <div
                        className="gallery-lightbox-overlay"
                        role="presentation"
                        onClick={closeImage}
                    >
                        <div
                            className={`gallery-lightbox ${isZoomed ? 'is-zoomed' : ''}`}
                            role="dialog"
                            aria-modal="true"
                            aria-label={selectedImage.alt}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="gallery-lightbox-close"
                                aria-label="Close image preview"
                                onClick={closeImage}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="gallery-lightbox-frame">
                                    <div className="gallery-lightbox-image-button relative w-full h-full min-h-[60vh]">
                                        <Image 
                                            src={selectedImage.src} 
                                            alt={selectedImage.alt} 
                                            fill 
                                            className="object-contain"
                                            sizes="90vw"
                                            priority
                                        />
                                    </div>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
                : null}
        </>
    );
}
