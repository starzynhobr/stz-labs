import TranslatedText from '../../components/TranslatedText';

export const metadata = {
    title: 'Termos | STZ LABS',
    description: 'Termos de uso, condições de compra e regras gerais de uso dos produtos STZ LABS.',
    openGraph: {
        title: 'Termos | STZ LABS',
        description: 'Termos de uso e condições gerais dos produtos e serviços STZ LABS.',
        type: 'website',
        images: ['https://stz-labs.vercel.app/public/og-image.png'],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://stz-labs.vercel.app/public/og-image.png'],
    },
};

const sections = [
    'intro',
    'services',
    'payments',
    'delivery',
    'refunds',
    'license',
    'acceptable_use',
    'third_party',
    'support',
    'liability',
    'changes',
    'law',
];

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
            <section className="relative w-full max-w-4xl mx-auto px-6 mb-16 text-center">
                <TranslatedText as="h1" className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--text-heading)] mb-6" i18nKey="terms.title" />
                <TranslatedText as="p" className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-4" i18nKey="terms.subtitle" />
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-80">
                    <TranslatedText as="span" i18nKey="terms.last_update" />
                </p>
            </section>

            <section className="container max-w-3xl mx-auto px-6 space-y-6">
                {sections.map((sectionKey) => (
                    <article
                        key={sectionKey}
                        className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)] hover:[border-color:var(--border-hover)] transition-all duration-300"
                    >
                        <h3 className="text-lg font-bold text-[var(--text-heading)] mb-4 tracking-tight flex items-center gap-3">
                            <span className="w-1 h-1 rounded-full bg-[var(--accent)]/50 shrink-0" />
                            <TranslatedText as="span" i18nKey={`terms.${sectionKey}_title`} />
                        </h3>
                        
                        <div className="text-[var(--text-secondary)] leading-relaxed text-[15px]">
                            <TranslatedText as="p" className="mb-4" i18nKey={`terms.${sectionKey}_desc`} />
                            
                            {sectionKey === 'payments' && (
                                <ul className="mt-6 ml-4 space-y-3">
                                    {[1, 2, 3, 4].map((num) => (
                                        <li key={num} className="flex items-start gap-4 text-sm text-[var(--text-muted)] group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30 mt-2 shrink-0 group-hover:bg-[var(--accent)] transition-colors" />
                                            <TranslatedText as="span" i18nKey={`terms.payments_item_${num}`} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
