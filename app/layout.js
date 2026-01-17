import '../css/style.css';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KonamiListener from '../components/KonamiListener';
import Providers from './providers';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: 'STZ LABS | Micro Estúdio de Software Futurista',
    description:
        'STZ LABS desenvolve ferramentas de alta performance como STZ CSV Converter, Game XML Translator e STZ Lyrics.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" data-theme="dark">
            <body className={inter.className}>
                <div className="noise" aria-hidden="true"></div>
                <Providers>
                    <Navbar />
                    {children}
                    <Footer />
                    <KonamiListener />
                </Providers>
            </body>
        </html>
    );
}
