import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spotlight from '../components/Spotlight';
import KonamiListener from '../components/KonamiListener';
import Providers from './providers';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: 'STZ LABS',
    description:
        'STZ LABS desenvolve ferramentas de alta performance como STZ CSV Converter, Game XML Translator e STZ Lyrics.',
    icons: {
        icon: '/icon.png',
        shortcut: '/favicon.png',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
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
            </body>
        </html>
    );
}
