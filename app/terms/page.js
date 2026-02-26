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
        <div
            className="app-shell"
            style={{
                minHeight: '100vh',
                padding: '70px 0 80px',
            }}
        >
            <section className="product-hero" style={{ padding: '120px 0 60px' }}>
                <div className="container">
                    <TranslatedText as="h1" i18nKey="terms.title" />
                    <TranslatedText as="p" i18nKey="terms.subtitle" />
                    <p className="text-muted" style={{ marginTop: '12px', fontSize: '0.95rem' }}>
                        <TranslatedText as="span" i18nKey="terms.last_update" />
                    </p>
                </div>
            </section>

            <section className="products">
                <div className="container" style={{ maxWidth: '900px' }}>
                    {sections.map((sectionKey) => (
                        <article
                            key={sectionKey}
                            className="card"
                            style={{ marginBottom: '20px' }}
                        >
                            <h3 style={{ marginBottom: '12px' }}>
                                <TranslatedText as="span" i18nKey={`terms.${sectionKey}_title`} />
                            </h3>
                            <p className="text-muted" style={{ marginBottom: sectionKey === 'payments' ? '10px' : 0 }}>
                                <TranslatedText as="span" i18nKey={`terms.${sectionKey}_desc`} />
                            </p>

                            {sectionKey === 'payments' ? (
                                <ul
                                    style={{
                                        listStyle: 'disc',
                                        marginLeft: '20px',
                                        color: 'var(--text-muted)',
                                        marginTop: '8px',
                                    }}
                                >
                                    <li style={{ marginBottom: '8px' }}>
                                        <TranslatedText as="span" i18nKey="terms.payments_item_1" />
                                    </li>
                                    <li style={{ marginBottom: '8px' }}>
                                        <TranslatedText as="span" i18nKey="terms.payments_item_2" />
                                    </li>
                                    <li style={{ marginBottom: '8px' }}>
                                        <TranslatedText as="span" i18nKey="terms.payments_item_3" />
                                    </li>
                                    <li>
                                        <TranslatedText as="span" i18nKey="terms.payments_item_4" />
                                    </li>
                                </ul>
                            ) : null}
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
