/** Selo "em breve" em âmbar, para não ser confundido com um projeto já lançado. */
export default function ComingSoonBadge({ label, status }) {
    return (
        <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-500">
                <span className="relative flex size-1.5" aria-hidden="true">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-500 opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-amber-500" />
                </span>
                {label}
            </span>
            {status && <span className="text-xs text-[var(--text-muted)]">{status}</span>}
        </div>
    );
}
