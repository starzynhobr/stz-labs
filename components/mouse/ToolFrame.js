"use client";

import { cn } from '../../lib/utils';

/** Painel padrão das ferramentas, para todas compartilharem espaçamento e borda. */
export function ToolPanel({ title, subtitle, children, className = '' }) {
    return (
        <section className={cn(
            'p-6 md:p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)]',
            'border [border-color:var(--border-subtle)] shadow-[var(--shadow)] relative overflow-hidden',
            className
        )}>
            {(title || subtitle) && (
                <div className="mb-6 relative z-10">
                    {title && (
                        <h2 className="text-lg font-bold text-[var(--text-heading)] tracking-tight">{title}</h2>
                    )}
                    {subtitle && (
                        <p className="text-[11px] uppercase font-mono tracking-widest text-[var(--text-muted)] mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}
            <div className="relative z-10">{children}</div>
        </section>
    );
}

/**
 * Área de teste. O texto de estado quebra em várias linhas de propósito:
 * cortar com reticências escondia justamente o resultado do teste.
 */
export function TestSurface({
    title,
    description,
    highlight = false,
    children,
    ariaLabel,
    surfaceRef,
    ...handlers
}) {
    return (
        <div
            ref={surfaceRef}
            {...handlers}
            tabIndex={0}
            role="application"
            aria-label={ariaLabel}
            className={cn(
                'relative w-full min-h-[280px] md:min-h-[340px] rounded-2xl bg-[var(--surface-3)]',
                'border [border-color:var(--border-strong)] flex flex-col items-center justify-center gap-4',
                'p-6 text-center cursor-crosshair select-none transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
                highlight && '[border-color:var(--accent)] bg-[var(--accent)]/[0.06]'
            )}
        >
            {children}
            <div className="w-full max-w-md">
                <p className="text-lg md:text-xl font-bold text-[var(--text-heading)] tracking-tight text-balance">
                    {title}
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed text-balance">
                    {description}
                </p>
            </div>
        </div>
    );
}

export function StatGrid({ items }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
            {items.map((item) => (
                <div
                    key={item.label}
                    className={cn(
                        'p-4 rounded-xl bg-[var(--surface-3)] border [border-color:var(--border-subtle)] text-center transition-colors',
                        item.alert && '[border-color:var(--accent)] bg-[var(--accent)]/[0.06]'
                    )}
                >
                    <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] mb-1">
                        {item.label}
                    </div>
                    <div className={cn(
                        'text-2xl font-bold tracking-tight',
                        item.alert ? 'text-[var(--accent)]' : 'text-[var(--text-heading)]'
                    )}>
                        {item.value}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function HistoryList({ heading, emptyLabel, clearLabel, items, onClear }) {
    return (
        <div className="mt-6 pt-6 border-t [border-color:var(--border-subtle)]">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] uppercase font-mono tracking-widest text-[var(--text-muted)]">
                    {heading}
                </h3>
                {items.length > 0 && (
                    <button
                        type="button"
                        onClick={onClear}
                        className="text-[11px] font-semibold text-[var(--accent)] hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded px-1"
                    >
                        {clearLabel}
                    </button>
                )}
            </div>
            {items.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)]">{emptyLabel}</p>
            ) : (
                <ul className="flex flex-wrap gap-2">
                    {items.map((item, index) => (
                        <li
                            key={`${item}-${index}`}
                            className="px-3 py-1.5 rounded-lg bg-[var(--surface-3)] border [border-color:var(--border-subtle)] text-sm font-mono text-[var(--text-primary)]"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
