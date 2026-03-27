import TranslatedText from './TranslatedText';
 
export default function Philosophy() {
    return (
        <section id="benefits" className="relative mt-24 md:mt-32">
            {/* Background Atmosphere Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--accent-glow)] blur-[120px] pointer-events-none rounded-full opacity-[var(--glow-opacity)]" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-fr">
                {/* Item 1: Efficiency */}
                <div className="group relative bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] rounded-[var(--radius-card)] p-8 transition-all hover:bg-[var(--surface-primary)]/80 hover:[border-color:var(--border-hover)] shadow-[var(--shadow)] flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_var(--accent-glow)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </div>
                    <TranslatedText as="h3" className="text-base font-bold text-[var(--text-heading)] mb-3 uppercase tracking-widest" i18nKey="benefits.efficiency_title" />
                    <TranslatedText
                        as="p"
                        className="text-[var(--text-secondary)] text-[13px] leading-relaxed font-medium"
                        i18nKey="benefits.efficiency_desc"
                    />
                </div>
 
                {/* Item 2: Local Processing */}
                <div className="group relative bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] rounded-[var(--radius-card)] p-8 transition-all hover:bg-[var(--surface-primary)]/80 hover:[border-color:var(--border-hover)] shadow-[var(--shadow)] flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_var(--accent-glow)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <TranslatedText as="h3" className="text-base font-bold text-[var(--text-heading)] mb-3 uppercase tracking-widest" i18nKey="benefits.local_title" />
                    <TranslatedText
                        as="p"
                        className="text-[var(--text-secondary)] text-[13px] leading-relaxed font-medium"
                        i18nKey="benefits.local_desc"
                    />
                </div>
 
                {/* Item 3: Open Source */}
                <div className="group relative bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] rounded-[var(--radius-card)] p-8 transition-all hover:bg-[var(--surface-primary)]/80 hover:[border-color:var(--border-hover)] shadow-[var(--shadow)] flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_var(--accent-glow)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </div>
                    <TranslatedText as="h3" className="text-base font-bold text-[var(--text-heading)] mb-3 uppercase tracking-widest" i18nKey="benefits.opensource_title" />
                    <TranslatedText
                        as="p"
                        className="text-[var(--text-secondary)] text-[13px] leading-relaxed font-medium"
                        i18nKey="benefits.opensource_desc"
                    />
                </div>
            </div>
        </section>
    );
}

