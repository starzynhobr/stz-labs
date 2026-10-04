"use client";

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../lib/utils';

const copy = {
    pt: { expand: 'Ampliar imagem', close: 'Fechar imagem', zoomIn: 'Aumentar zoom', zoomOut: 'Diminuir zoom' },
    en: { expand: 'Enlarge image', close: 'Close image', zoomIn: 'Zoom in', zoomOut: 'Zoom out' },
    es: { expand: 'Ampliar imagen', close: 'Cerrar imagen', zoomIn: 'Acercar', zoomOut: 'Alejar' },
    fr: { expand: 'Agrandir l’image', close: 'Fermer l’image', zoomIn: 'Zoom avant', zoomOut: 'Zoom arrière' },
    de: { expand: 'Bild vergrößern', close: 'Bild schließen', zoomIn: 'Vergrößern', zoomOut: 'Verkleinern' },
    it: { expand: 'Ingrandisci immagine', close: 'Chiudi immagine', zoomIn: 'Ingrandisci', zoomOut: 'Riduci' },
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const CLICK_SCALE = 2.5;
// Abaixo disso o gesto conta como clique, não como arrasto.
const DRAG_THRESHOLD = 4;
const INITIAL_VIEW = { scale: 1, x: 0, y: 0 };

/** Mantém a imagem cobrindo a área visível: sem isso o arrasto a tira da tela. */
const clampView = ({ scale, x, y }, rect) => {
    const maxX = ((scale - 1) * rect.width) / 2;
    const maxY = ((scale - 1) * rect.height) / 2;
    return {
        scale,
        x: Math.min(maxX, Math.max(-maxX, x)),
        y: Math.min(maxY, Math.max(-maxY, y)),
    };
};

/**
 * Miniatura que abre a imagem em tela cheia. Dentro do lightbox: clique alterna
 * o zoom no ponto clicado, a roda do mouse ajusta o nível e arrastar move a imagem.
 */
export default function ZoomableImage({ src, alt, className, imageClassName, sizes, priority = false, children }) {
    const { lang } = useLanguage();
    const text = copy[lang] || copy.en;
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(INITIAL_VIEW);
    const [dragging, setDragging] = useState(false);
    const stageRef = useRef(null);
    const dragRef = useRef(null);

    const openLightbox = () => {
        setView(INITIAL_VIEW);
        setOpen(true);
    };

    /** Aplica o novo nível mantendo fixo o ponto sob o cursor. */
    const zoomAt = (nextScale, clientX, clientY) => {
        const rect = stageRef.current?.getBoundingClientRect();
        if (!rect) return;

        setView((current) => {
            const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
            if (scale === MIN_SCALE) return INITIAL_VIEW;

            const cx = clientX - (rect.left + rect.width / 2);
            const cy = clientY - (rect.top + rect.height / 2);
            const ratio = scale / current.scale;
            return clampView({ scale, x: cx - (cx - current.x) * ratio, y: cy - (cy - current.y) * ratio }, rect);
        });
    };

    const zoomFromCenter = (factor) => {
        const rect = stageRef.current?.getBoundingClientRect();
        if (rect) zoomAt(view.scale * factor, rect.left + rect.width / 2, rect.top + rect.height / 2);
    };

    useEffect(() => {
        if (!open) return undefined;

        const previousOverflow = document.body.style.overflow;
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    const handlePointerDown = (event) => {
        if (event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        dragRef.current = { startX: event.clientX, startY: event.clientY, originX: view.x, originY: view.y, moved: false };
    };

    const handlePointerMove = (event) => {
        const drag = dragRef.current;
        if (!drag) return;

        const dx = event.clientX - drag.startX;
        const dy = event.clientY - drag.startY;
        if (!drag.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;

        drag.moved = true;
        if (view.scale === MIN_SCALE) return;

        setDragging(true);
        const rect = stageRef.current.getBoundingClientRect();
        setView((current) => clampView({ scale: current.scale, x: drag.originX + dx, y: drag.originY + dy }, rect));
    };

    const handlePointerUp = (event) => {
        const drag = dragRef.current;
        dragRef.current = null;
        setDragging(false);
        if (!drag || drag.moved) return;

        zoomAt(view.scale > MIN_SCALE ? MIN_SCALE : CLICK_SCALE, event.clientX, event.clientY);
    };

    const handleWheel = (event) => {
        zoomAt(view.scale * (event.deltaY < 0 ? 1.2 : 1 / 1.2), event.clientX, event.clientY);
    };

    const isZoomed = view.scale > MIN_SCALE;
    const controlClass = "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-white/10";

    return (
        <>
            <button
                type="button"
                onClick={openLightbox}
                aria-label={`${text.expand}: ${alt}`}
                className={cn("block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]", className)}
            >
                {children}
                <Image src={src} alt={alt} fill className={imageClassName} sizes={sizes} priority={priority} />
            </button>

            {open && typeof document !== 'undefined' ? createPortal(
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={alt}
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl stz-animate-fade-in md:p-10"
                >
                    <div className="absolute right-5 top-5 z-30 flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
                        <button type="button" aria-label={text.zoomOut} disabled={!isZoomed} onClick={() => zoomFromCenter(1 / 1.5)} className={controlClass}>
                            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14" /></svg>
                        </button>
                        <span className="min-w-12 text-center font-mono text-xs text-white/80">{Math.round(view.scale * 100)}%</span>
                        <button type="button" aria-label={text.zoomIn} disabled={view.scale >= MAX_SCALE} onClick={() => zoomFromCenter(1.5)} className={controlClass}>
                            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                        </button>
                        <button type="button" aria-label={text.close} onClick={() => setOpen(false)} className={cn(controlClass, "ml-2")}>
                            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div
                        ref={stageRef}
                        className={cn(
                            "relative h-[82vh] w-full max-w-7xl touch-none select-none overflow-hidden",
                            dragging ? "cursor-grabbing" : isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                        )}
                        onClick={(event) => event.stopPropagation()}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        onWheel={handleWheel}
                    >
                        <div
                            className={cn("absolute inset-0", !dragging && "transition-transform duration-200 ease-out")}
                            style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
                        >
                            <Image src={src} alt={alt} fill className="object-contain" sizes="95vw" draggable={false} priority />
                        </div>
                    </div>
                </div>,
                document.body
            ) : null}
        </>
    );
}
