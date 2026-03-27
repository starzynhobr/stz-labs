import TranslatedText from './TranslatedText';
 
export default function StatusTimeline() {
    return (
        <section id="roadmap" className="mt-24 md:mt-32 mb-12">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16 px-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                        <TranslatedText i18nKey="sections.roadmap_badge" />
                    </div>
                    <TranslatedText as="h2" className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight" i18nKey="sections.roadmap_title" />
                    <TranslatedText
                        as="p"
                        className="text-zinc-500 text-sm font-medium max-w-lg mx-auto leading-relaxed"
                        i18nKey="sections.roadmap_subtitle"
                    />
                    <TranslatedText
                        as="p"
                        className="text-zinc-600 text-[11px] font-mono mt-6 uppercase tracking-widest opacity-60"
                        i18nKey="sections.roadmap_tips"
                    />
                </div>
 
                <div className="relative space-y-0 px-6">
                    {/* Vertical Line */}
                    <div className="absolute left-[31px] md:left-1/2 top-4 bottom-4 w-px bg-white/5 md:-translate-x-1/2 hidden md:block" />
 
                    {/* Item 1: Stable */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 pb-12 group">
                        <div className="md:w-1/2 md:text-right order-2 md:order-1">
                            <TranslatedText as="h4" className="text-white text-sm font-bold mb-1" i18nKey="sections.roadmap_q1" />
                            <TranslatedText as="p" className="text-zinc-500 text-[12px] leading-relaxed" i18nKey="sections.roadmap_q1_desc" />
                        </div>
                        <div className="relative z-10 flex items-center justify-center w-16 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 order-1 md:order-2 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                            <TranslatedText as="span" className="text-emerald-400 font-mono text-[10px] font-bold tracking-tighter" i18nKey="common.status.stable" />
                        </div>
                        <div className="md:w-1/2 order-3">
                            <TranslatedText as="span" className="text-zinc-600 font-mono text-[11px] uppercase tracking-wider" i18nKey="sections.roadmap_status_1" />
                        </div>
                    </div>
 
                    {/* Item 2: Beta */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 pb-12 group">
                        <div className="md:w-1/2 md:text-right order-2 md:order-1">
                            <TranslatedText as="h4" className="text-white text-sm font-bold mb-1" i18nKey="sections.roadmap_q2" />
                            <TranslatedText as="p" className="text-zinc-500 text-[12px] leading-relaxed" i18nKey="sections.roadmap_q2_desc" />
                        </div>
                        <div className="relative z-10 flex items-center justify-center w-16 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 order-1 md:order-2 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.05)]">
                            <TranslatedText as="span" className="text-purple-400 font-mono text-[10px] font-bold tracking-tighter animate-pulse" i18nKey="common.status.beta" />
                        </div>
                        <div className="md:w-1/2 order-3">
                            <TranslatedText as="span" className="text-zinc-600 font-mono text-[11px] uppercase tracking-wider" i18nKey="sections.roadmap_status_2" />
                        </div>
                    </div>
 
                    {/* Item 3: Planned */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 pb-12 group opacity-60 grayscale-[0.5]">
                        <div className="md:w-1/2 md:text-right order-2 md:order-1">
                            <TranslatedText as="h4" className="text-white text-sm font-bold mb-1" i18nKey="sections.roadmap_q3" />
                            <TranslatedText as="p" className="text-zinc-500 text-[12px] leading-relaxed" i18nKey="sections.roadmap_q3_desc" />
                        </div>
                        <div className="relative z-10 flex items-center justify-center w-16 h-8 rounded-lg bg-white/5 border border-white/10 order-1 md:order-2 shrink-0">
                            <TranslatedText as="span" className="text-zinc-500 font-mono text-[10px] font-bold tracking-tighter" i18nKey="common.status.alpha" />
                        </div>
                        <div className="md:w-1/2 order-3">
                            <TranslatedText as="span" className="text-zinc-600 font-mono text-[11px] uppercase tracking-wider" i18nKey="sections.roadmap_status_3" />
                        </div>
                    </div>
 
                    {/* Item 4: Experimental */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 group opacity-40 grayscale">
                        <div className="md:w-1/2 md:text-right order-2 md:order-1">
                            <TranslatedText as="h4" className="text-white text-sm font-bold mb-1" i18nKey="sections.roadmap_q4" />
                            <TranslatedText as="p" className="text-zinc-500 text-[12px] leading-relaxed" i18nKey="sections.roadmap_q4_desc" />
                        </div>
                        <div className="relative z-10 flex items-center justify-center w-16 h-8 rounded-lg bg-white/5 border border-white/10 order-1 md:order-2 shrink-0">
                            <TranslatedText as="span" className="text-zinc-500 font-mono text-[10px] font-bold tracking-tighter" i18nKey="common.status.experimental" />
                        </div>
                        <div className="md:w-1/2 order-3">
                            <TranslatedText as="span" className="text-zinc-600 font-mono text-[11px] uppercase tracking-wider" i18nKey="sections.roadmap_status_4" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
