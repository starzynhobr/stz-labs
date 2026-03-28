import TranslatedHtml from '../../components/TranslatedHtml';
import TranslatedText from '../../components/TranslatedText';

export const metadata = {
    title: 'Privacidade | STZ LABS',
    description: 'Política de privacidade e transparência sobre o uso de dados nos softwares STZ LABS.',
    openGraph: {
        title: 'Privacidade | STZ LABS',
        description: 'Política de privacidade e transparência sobre o uso de dados.',
        type: 'website',
        images: ['https://stz-labs.vercel.app/public/og-image.png'],
    },
    twitter: {
        card: 'summary_large_image',
        images: ['https://stz-labs.vercel.app/public/og-image.png'],
    },
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-transparent pt-32 pb-24 relative overflow-hidden">
            <section className="relative w-full max-w-4xl mx-auto px-6 mb-16 text-center">
                <TranslatedText as="h1" className="text-4xl md:text-5xl font-bold tracking-tighter text-[var(--text-heading)] mb-6" i18nKey="privacy.title" />
                <TranslatedText as="p" className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto" i18nKey="privacy.subtitle" />
            </section>

            <section className="container max-w-3xl mx-auto px-6 space-y-6">
                {/* Local Card */}
                <article className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)]">
                    <h3 className="text-lg font-bold text-[var(--text-heading)] mb-4 tracking-tight">
                        <TranslatedText as="span" i18nKey="privacy.local_title" />
                    </h3>
                    <TranslatedText as="p" className="text-[var(--text-secondary)] leading-relaxed text-[15px]" i18nKey="privacy.local_desc" />
                </article>

                {/* Extension Card */}
                <article className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)]">
                    <h3 className="text-lg font-bold text-[var(--text-heading)] mb-4 tracking-tight">
                        <TranslatedText as="span" i18nKey="privacy.extension_title" />
                    </h3>
                    <TranslatedText as="p" className="text-[var(--text-secondary)] leading-relaxed text-[15px] mb-6" i18nKey="privacy.extension_desc" />
                    <ul className="space-y-3 ml-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <li key={num} className="flex items-start gap-4 text-sm text-[var(--text-muted)] group">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30 mt-2 shrink-0 group-hover:bg-[var(--accent)] transition-colors" />
                                <TranslatedText as="span" i18nKey={`privacy.extension_item_${num}`} />
                            </li>
                        ))}
                    </ul>
                </article>

                {/* API Card */}
                <article className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)]">
                    <h3 className="text-lg font-bold text-[var(--text-heading)] mb-4 tracking-tight">
                        <TranslatedText as="span" i18nKey="privacy.api_title" />
                    </h3>
                    <TranslatedText as="p" className="text-[var(--text-secondary)] leading-relaxed text-[15px] mb-6" i18nKey="privacy.api_desc" />
                    <ul className="space-y-4 ml-4">
                        {['gemini', 'lrclib'].map((api) => (
                            <li key={api} className="flex items-start gap-4 text-sm text-[var(--text-muted)] group">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/30 mt-2 shrink-0 group-hover:bg-[var(--accent)] transition-colors" />
                                <TranslatedHtml as="span" className="[&_a]:text-[var(--accent)] [&_a]:underline-offset-4 [&_a:hover]:underline [&_a]:transition-colors" i18nKey={`privacy.api_list_${api}`} />
                            </li>
                        ))}
                    </ul>
                </article>

                {/* Contact Card */}
                <article className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] backdrop-blur-[var(--backdrop-blur)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)] border-l-4 [border-left-color:var(--accent)]">
                    <h3 className="text-lg font-bold text-[var(--text-heading)] mb-4 tracking-tight">
                        <TranslatedText as="span" i18nKey="privacy.contact_title" />
                    </h3>
                    <TranslatedText as="p" className="text-[var(--text-secondary)] leading-relaxed text-[15px]" i18nKey="privacy.contact_desc" />
                </article>
            </section>
        </main>
    );
}
