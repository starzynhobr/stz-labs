import Link from 'next/link';
import TranslatedText from './TranslatedText';
 
export default function Footer() {
    const currentYear = new Date().getFullYear();
 
    return (
        <footer className="mt-32 border-t border-[var(--border-subtle)] bg-[var(--surface-primary)] backdrop-blur-md pt-16 pb-12 relative overflow-hidden">
            {/* Subtle Gradient Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
 
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
                    {/* Brand & Copyright */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold tracking-tighter text-[var(--text-primary)]">STZ LABS</span>
                            <span className="w-px h-3 bg-[var(--border-subtle)]" />
                            <TranslatedText as="span" className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest" i18nKey="footer.build" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-tight">
                                <TranslatedText i18nKey="footer.operated_by" /> <span className="text-[var(--text-primary)]">StarzynhoBR</span> <TranslatedText i18nKey="footer.operated_location" />
                            </p>
                            <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                                &copy; {currentYear} STZ LABS // <TranslatedText i18nKey="footer.all_rights_reserved" />
                            </p>
                        </div>
                    </div>
 
                    {/* Navigation & Contact */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
                        <div className="space-y-4">
                            <TranslatedText as="h5" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4" i18nKey="footer.connect" />
                            <a 
                                href="https://github.com/starzynhobr" 
                                target="_blank" 
                                rel="noreferrer"
                                className="block text-[11px] font-bold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors uppercase tracking-wider"
                            >
                                GitHub
                            </a>
                            <a 
                                href="mailto:contato@stzlabs.com"
                                className="block text-[11px] font-bold text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors uppercase tracking-wider"
                            >
                                <TranslatedText i18nKey="footer.contact" />
                            </a>
                        </div>
 
                        <div className="space-y-4">
                            <TranslatedText as="h5" className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4" i18nKey="footer.legal" />
                            <Link href="/privacy" className="block text-[11px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-wider">
                                <TranslatedText as="span" i18nKey="footer.privacy" />
                            </Link>
                            <Link href="/terms" className="block text-[11px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-wider">
                                <TranslatedText as="span" i18nKey="footer.terms" />
                            </Link>
                        </div>
 
                        <div className="space-y-4 col-span-2 md:col-span-1">
                            <h5 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4">Support</h5>
                            <Link 
                                href="/support" 
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--accent)]/5 border border-[var(--accent)]/10 text-[10px] font-bold text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/20 transition-all uppercase tracking-widest shadow-[0_0_15px_var(--accent-glow)]"
                            >
                                <TranslatedText as="span" i18nKey="footer.support" />
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
