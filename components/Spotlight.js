"use client";

import React, { useEffect, useRef, useState } from 'react';

/**
 * Cursor Spotlight Component (Refined)
 * Follows the mouse with smooth LERP for a premium "Nexus AI" look.
 * Optimized for standard Tailwind CSS without external animate plugins.
 */
export default function Spotlight() {
    const spotlightRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Initial position (center)
        mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        currentPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        // Fade in after mount
        const timer = setTimeout(() => setIsVisible(true), 100);

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        let rafId;
        const animate = () => {
            const lerpFactor = 0.12;
            currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerpFactor;
            currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerpFactor;

            if (spotlightRef.current) {
                // translate3d uses GPU acceleration
                spotlightRef.current.style.transform = `translate3d(${currentPos.current.x - 400}px, ${currentPos.current.y - 400}px, 0)`;
            }
            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div 
            ref={spotlightRef}
            className={`fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,var(--accent-glow)_0%,rgba(0,0,0,0)_70%)] blur-[120px] pointer-events-none z-[0] will-change-transform transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden="true"
        />
    );
}
