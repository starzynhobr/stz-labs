"use client";

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '../lib/utils';

const GalleryImage = ({ item, isHero = false, onClick }) => (
    <button
        type="button"
        className={cn(
            "group relative overflow-hidden rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)] hover:[border-color:var(--border-hover)] transition-all duration-500 shadow-lg",
            isHero ? "aspect-video md:aspect-[21/9] w-full" : "aspect-video w-full"
        )}
        onClick={() => onClick(item)}
        aria-label={item.alt}
    >
        {/* Hover Highlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {/* Interaction Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 scale-90 group-hover:scale-100">
            <div className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-2xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
            </div>
        </div>

        <Image 
            src={item.src} 
            alt={item.alt} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
            sizes={isHero ? "100vw" : "(max-width: 768px) 100vw, 33vw"} 
        />
    </button>
);

export default function ProjectGalleryDetails({ heroItem = null, items = [] }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);

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
        <div className="space-y-4">
            {/* Hero (Main) Image */}
            {heroItem && (
                <div className="w-full">
                    <GalleryImage item={heroItem} isHero onClick={openImage} />
                </div>
            )}

            {/* Grid for extra images */}
            {items.length > 0 && (
                <div className={cn(
                    "grid gap-4",
                    items.length === 1 ? "grid-cols-1" : 
                    items.length === 2 ? "grid-cols-1 sm:grid-cols-2" : 
                    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                )}>
                    {items.map((item) => (
                        <GalleryImage key={item.src} item={item} onClick={openImage} />
                    ))}
                </div>
            )}

            {/* Lightbox Portal */}
            {selectedImage && typeof document !== 'undefined'
                ? createPortal(
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 stz-animate-fade-in"
                        role="presentation"
                        onClick={closeImage}
                    >
                        {/* Dramatic Backdrop */}
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />
                        
                        <div
                            className={cn(
                                "relative w-full max-w-7xl max-h-full flex items-center justify-center transition-all duration-500 stz-animate-zoom-jump",
                                isZoomed ? "scale-110 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                            )}
                            role="dialog"
                            aria-modal="true"
                            onClick={(event) => {
                                event.stopPropagation();
                                setIsZoomed(prev => !prev);
                            }}
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                className="absolute -top-12 right-0 md:-right-12 text-white/50 hover:text-[var(--accent)] transition-colors p-2 z-50 group"
                                aria-label="Close image preview"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeImage();
                                }}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
                                    <path d="M18 6 6 18M6 6l12 12"/>
                                </svg>
                            </button>

                            {/* Image Container with Border Accent */}
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <Image 
                                    src={selectedImage.src} 
                                    alt={selectedImage.alt} 
                                    fill 
                                    className="object-contain p-2 md:p-4"
                                    sizes="95vw"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Caption Info */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-sm font-mono tracking-widest uppercase stz-animate-slide-up pointer-events-none">
                            {selectedImage.alt || "Project Preview_"}
                        </div>
                    </div>,
                    document.body
                )
                : null}
        </div>
    );
}
