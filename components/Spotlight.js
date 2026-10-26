"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * Cursor Spotlight Component (Refined)
 * Follows the mouse with smooth LERP for a premium "Nexus AI" look.
 *
 * Leve para PCs fracos: o gradiente (.spotlight-glow) já traz o perfil do antigo
 * filter: blur(120px), que custava um desfoque por quadro, e a animação só roda enquanto o círculo
 * ainda não alcançou o mouse; parado, não gasta nada. Fica de fora em telas de toque
 * e para quem pede menos movimento no sistema.
 */
export default function Spotlight() {
    const spotlightRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const finePointer = window.matchMedia('(pointer: fine)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!finePointer || reducedMotion) return undefined;

        // Initial position (center)
        mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        currentPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        // Fade in after mount
        const timer = setTimeout(() => setIsVisible(true), 100);

        let rafId = 0;
        const place = () => {
            if (spotlightRef.current) {
                spotlightRef.current.style.transform = `translate3d(${currentPos.current.x - 500}px, ${currentPos.current.y - 500}px, 0)`;
            }
        };
        const animate = () => {
            const lerpFactor = 0.12;
            const dx = mousePos.current.x - currentPos.current.x;
            const dy = mousePos.current.y - currentPos.current.y;
            currentPos.current.x += dx * lerpFactor;
            currentPos.current.y += dy * lerpFactor;
            place();
            // Chegou ao mouse: para até o próximo movimento.
            rafId = Math.abs(dx) + Math.abs(dy) > 0.5 ? requestAnimationFrame(animate) : 0;
        };
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!rafId) rafId = requestAnimationFrame(animate);
        };

        place();
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div
            ref={spotlightRef}
            className={`fixed top-0 left-0 w-[1000px] h-[1000px] rounded-full spotlight-glow pointer-events-none z-[0] will-change-transform hidden [@media(pointer:fine)]:block motion-reduce:hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
        />
    );
}
