import TranslatedText from './TranslatedText';

export default function Philosophy() {
    return (
        <section id="benefits" className="benefits">
            <div className="container">
                <div className="benefits-grid">
                    <div className="benefit-item">
                        <div className="icon-box">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                            </svg>
                        </div>
                        <TranslatedText as="h3" i18nKey="benefits.efficiency_title" />
                        <TranslatedText
                            as="p"
                            className="text-muted"
                            i18nKey="benefits.efficiency_desc"
                        />
                    </div>
                    <div className="benefit-item">
                        <div className="icon-box">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <TranslatedText as="h3" i18nKey="benefits.local_title" />
                        <TranslatedText
                            as="p"
                            className="text-muted"
                            i18nKey="benefits.local_desc"
                        />
                    </div>
                    <div className="benefit-item">
                        <div className="icon-box">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </div>
                        <TranslatedText as="h3" i18nKey="benefits.opensource_title" />
                        <TranslatedText
                            as="p"
                            className="text-muted"
                            i18nKey="benefits.opensource_desc"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
