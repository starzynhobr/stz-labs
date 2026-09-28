'use client';

import TranslatedText from './TranslatedText';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/Button';

const CARD = 'p-6 rounded-2xl bg-[var(--surface-primary)] border [border-color:var(--border-subtle)]';

function KofiOption({ kofiUrl, featured }) {
    return (
        <div className={featured ? CARD : 'text-center'}>
            <div className="mb-6">
                <TranslatedText as="h4" className={`text-sm font-bold uppercase tracking-widest mb-2 ${featured ? 'text-[var(--accent)]' : 'text-[var(--text-heading)]'}`} i18nKey="support.kofi_title" />
                <TranslatedText as="p" className="text-[13px] text-[var(--text-secondary)] leading-relaxed" i18nKey="support.kofi_text" />
            </div>
            <Button asChild variant={featured ? 'primary' : 'secondary'} className="w-full">
                <a href={kofiUrl} target="_blank" rel="noopener noreferrer">
                    <TranslatedText as="span" i18nKey="support.kofi_button" />
                </a>
            </Button>
        </div>
    );
}

function MercadoPagoOption({ links, featured }) {
    return (
        <div className={featured ? CARD : 'text-center'}>
            <div className={`mb-6 ${featured ? '' : 'text-center'}`}>
                <TranslatedText as="h4" className={`text-sm font-bold uppercase tracking-widest mb-2 ${featured ? 'text-[var(--accent)]' : 'text-[var(--text-heading)]'}`} i18nKey="support.mercado_pago_title" />
                <TranslatedText as="p" className="text-[13px] text-[var(--text-secondary)] leading-relaxed" i18nKey="support.mercado_pago_text" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {links.map((option) => (
                    <Button key={option.href} asChild variant={featured ? 'primary' : 'secondary'} size="sm">
                        <a href={option.href} target="_blank" rel="noopener noreferrer">
                            <TranslatedText as="span" i18nKey={option.labelKey} />
                        </a>
                    </Button>
                ))}
            </div>
        </div>
    );
}

/**
 * Formas de apoio. Em português o Pix (Mercado Pago) vem primeiro e em destaque;
 * nos demais idiomas, o Ko-fi, que aceita cartão internacional e PayPal.
 */
export default function SupportOptions({ kofiUrl, mercadoPagoLinks }) {
    const { lang, t } = useLanguage();
    const pixFirst = lang === 'pt';

    const kofi = <KofiOption kofiUrl={kofiUrl} featured={!pixFirst} />;
    const mercadoPago = <MercadoPagoOption links={mercadoPagoLinks} featured={pixFirst} />;

    return (
        <div className="space-y-8 text-left">
            {pixFirst ? mercadoPago : kofi}

            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t [border-color:var(--border-subtle)]" />
                <span className="flex-shrink mx-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.2em]">{t('support.or')}</span>
                <div className="flex-grow border-t [border-color:var(--border-subtle)]" />
            </div>

            {pixFirst ? kofi : mercadoPago}
        </div>
    );
}
