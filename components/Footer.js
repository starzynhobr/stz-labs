import Link from 'next/link';
import TranslatedText from './TranslatedText';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <span style={{ fontWeight: 700, color: '#fff' }}>STZ LABS</span>
                    <span style={{ margin: '0 10px' }}>|</span>
                    <TranslatedText as="span" className="build-info" i18nKey="footer.build" />
                </div>
                <div className="footer-links">
                    <a href="https://github.com/starzynhobr" target="_blank" rel="noreferrer">
                        GitHub
                    </a>

                    <Link href="/privacy">
                        <TranslatedText as="span" i18nKey="footer.privacy" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
