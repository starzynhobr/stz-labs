"use client";

import { cn } from '../../lib/utils';

/** Silhueta do mouse com os botões acendendo — herdada da ferramenta original. */
export function MouseGraphic({ active = {}, className = '' }) {
    return (
        <svg
            className={cn('w-24 md:w-28 h-auto opacity-90 pointer-events-none', className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            aria-hidden="true"
        >
            <path
                className="fill-[var(--surface-2)] stroke-[var(--border-strong)] stroke-[20px]"
                d="M407.352 0C270.94 0 132.854 68.485 132.854 199.394v333.458c0 147.309 119.834 267.146 267.146 267.146 147.31 0 267.144-119.837 267.144-267.146V199.394C667.144 62.392 532.484 0 407.352 0zm209.51 532.852c0 119.59-97.286 216.858-216.862 216.858-119.58 0-216.858-97.269-216.858-216.858V376.893c44.903 13.585 129.421 34.136 229.341 34.136 63.976 0 134.236-8.545 204.38-32.682v154.505zm0-207.994c-183.262 70.074-377.714 17.311-433.72-.817V199.394c0-96.85 115.52-149.109 224.21-149.109 104.284 0 209.51 46.1 209.51 149.11v125.463z"
            />
            <path
                className={cn('fill-[var(--text-muted)] opacity-30 transition-all duration-75', active.middle && 'fill-[var(--accent)] opacity-100')}
                d="M428.285 108.565v182.287c0 13.88-11.27 25.146-25.142 25.146-13.876 0-25.144-11.265-25.144-25.146V108.565c0-13.879 11.266-25.144 25.144-25.144 13.87 0 25.142 11.265 25.142 25.144z"
            />
            <path
                className={cn('fill-[var(--text-muted)] opacity-20 transition-all duration-75', active.right && 'fill-[var(--accent)] opacity-80')}
                d="M592.917 292.514s-104.746 29.328-140.372 23.044V82.986s167.61 2.097 140.372 209.528z"
            />
            <path
                className={cn('fill-[var(--text-muted)] opacity-20 transition-all duration-75', active.left && 'fill-[var(--accent)] opacity-80')}
                d="M353.91 80.986v232.572c-35.626 6.284-140.372-23.044-140.372-23.044C186.301 83.084 353.91 80.986 353.91 80.986z"
            />
        </svg>
    );
}
