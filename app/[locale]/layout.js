import '../globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Spotlight from '../../components/Spotlight';
import KonamiListener from '../../components/KonamiListener';
import Providers from '../providers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { notFound } from 'next/navigation';
import { HTML_LANG, isLocale, localeParams } from '../../lib/i18n';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL('https://stzlabs.com'),
    title: 'STZ LABS',
    description:
        'STZ LABS desenvolve ferramentas de alta performance como STZ CSV Converter, Game XML Translator e STZ Lyrics.',
    icons: {
        icon: '/icon.png',
        shortcut: '/favicon.png',
        apple: '/apple-touch-icon.png',
    },
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var a=['neon-core','forge-grid','aurora-glass','light-mode','ember'];document.documentElement.dataset.theme=a.indexOf(t)>-1?t:'light-mode';}catch(e){}})();`;

export function generateStaticParams() {
    return localeParams();
}

export default async function RootLayout({ children, params }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    return (
        <html lang={HTML_LANG[locale]} data-theme="light-mode" data-scroll-behavior="smooth" suppressHydrationWarning>
            <head>
                {/* Aplica o tema salvo antes da primeira pintura, senão a página
                    aparece no tema padrão até a hidratação e pisca.

                    Em desenvolvimento o React registra "Encountered a script tag
                    while rendering React component" ao trocar de idioma, porque a
                    navegação recria o layout raiz no cliente. É aviso só de dev: em
                    produção não aparece, e o script já cumpriu seu papel no HTML
                    inicial — reexecutá-lo na navegação seria inócuo de qualquer forma. */}
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
            </head>
            <body className={inter.className} suppressHydrationWarning>
                <div className="noise" aria-hidden="true"></div>
                <Spotlight />
                <div className="relative z-10 min-h-screen flex flex-col">
                    <Providers>
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                        <KonamiListener />
                    </Providers>
                </div>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
