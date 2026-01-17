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
        <div
            className="app-shell"
            style={{
                minHeight: '100vh',
                padding: '70px 0 80px',
            }}
        >
            <section className="product-hero" style={{ padding: '120px 0 60px' }}>
                <div className="container">
                    <TranslatedText as="h1" i18nKey="privacy.title" />
                    <TranslatedText as="p" i18nKey="privacy.subtitle" />
                </div>
            </section>

            <section className="products">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <article className="card" style={{ marginBottom: '30px' }}>
                        <h3 style={{ marginBottom: '15px' }}>
                            <TranslatedText as="span" i18nKey="privacy.local_title" />
                        </h3>
                        <p className="text-muted">
                            <TranslatedText as="span" i18nKey="privacy.local_desc" />
                        </p>
                    </article>

                    <article className="card" style={{ marginBottom: '30px' }}>
                        <h3 style={{ marginBottom: '15px' }}>
                            <TranslatedText as="span" i18nKey="privacy.api_title" />
                        </h3>
                        <p className="text-muted">
                            <TranslatedText as="span" i18nKey="privacy.api_desc" />
                        </p>
                        <ul
                            style={{
                                listStyle: 'disc',
                                marginLeft: '20px',
                                color: 'var(--text-muted)',
                                marginTop: '10px',
                            }}
                        >
                            <li style={{ marginBottom: '8px' }}>
                                <TranslatedHtml as="span" i18nKey="privacy.api_list_gemini" />
                            </li>
                            <li>
                                <TranslatedHtml as="span" i18nKey="privacy.api_list_lrclib" />
                            </li>
                        </ul>
                    </article>

                    <article className="card">
                        <h3 style={{ marginBottom: '15px' }}>
                            <TranslatedText as="span" i18nKey="privacy.contact_title" />
                        </h3>
                        <p className="text-muted">
                            <TranslatedText as="span" i18nKey="privacy.contact_desc" />
                        </p>
                    </article>
                </div>
            </section>
        </div>
    );
}
