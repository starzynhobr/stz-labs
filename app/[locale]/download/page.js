import { notFound } from 'next/navigation';
import Link from 'next/link';
import AutoDownload from '../../../components/AutoDownload';
import SupportOptionsModal from '../../../components/SupportOptionsModal';
import TranslatedText from '../../../components/TranslatedText';
import { Button } from '../../../components/ui/Button';
import { projects } from '../../../data/projects';
import { findRelease } from '../../../lib/github';
import { isLocale } from '../../../lib/i18n';
import { KOFI_URL, MERCADO_PAGO_LINKS } from '../../../lib/support';

/** Página de passagem: não é conteúdo de busca e não deve ser indexada. */
export const metadata = {
    robots: { index: false, follow: true },
};

export default async function DownloadPage({ params, searchParams }) {
    const { locale } = await params;
    const { app } = await searchParams;

    if (!isLocale(locale)) notFound();

    const project = projects.find((item) => item.slug === app);
    if (!project) notFound();

    const release = project.releaseAssetPattern
        ? await findRelease({
            repoName: project.repoName,
            tagPrefix: project.releaseTagPrefix,
            assetPattern: project.releaseAssetPattern,
        }).catch(() => null)
        : null;

    const downloadUrl = release?.downloadUrl || project.downloadHref;
    if (!downloadUrl) notFound();

    return (
        <main className="min-h-screen bg-transparent pt-32 pb-24">
            <AutoDownload url={downloadUrl} />

            <section className="container max-w-2xl mx-auto px-6 text-center">
                <p className="text-[11px] uppercase font-mono tracking-[0.28em] text-[var(--accent)] mb-4">
                    <TranslatedText as="span" i18nKey={project.titleKey} />
                    {release?.version ? ` · v${release.version}` : ''}
                </p>

                <TranslatedText
                    as="h1"
                    className="text-3xl md:text-4xl font-bold tracking-tighter text-[var(--text-heading)] mb-4"
                    i18nKey="thanks.title"
                />
                <TranslatedText
                    as="p"
                    className="text-base text-[var(--text-secondary)] leading-relaxed mb-6"
                    i18nKey="thanks.starting"
                />

                <a
                    href={downloadUrl}
                    className="inline-block text-sm font-semibold text-[var(--accent)] underline underline-offset-4 hover:opacity-80"
                >
                    <TranslatedText as="span" i18nKey="thanks.manual" />
                </a>
            </section>

            <section className="container max-w-2xl mx-auto px-6 mt-14">
                <div className="p-8 rounded-[var(--radius-card)] bg-[var(--surface-primary)] border [border-color:var(--border-subtle)] shadow-[var(--shadow)] text-center">
                    <TranslatedText
                        as="h2"
                        className="text-xl font-bold text-[var(--text-heading)] tracking-tight mb-3"
                        i18nKey="thanks.support_title"
                    />
                    <TranslatedText
                        as="p"
                        className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-6 max-w-md mx-auto"
                        i18nKey="thanks.support_text"
                    />
                    <SupportOptionsModal kofiUrl={KOFI_URL} mercadoPagoLinks={MERCADO_PAGO_LINKS} />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm">
                    <Button asChild variant="secondary" size="sm" className="px-5">
                        <Link href={`/${locale}/projects/${project.slug}`}>
                            <TranslatedText as="span" i18nKey="thanks.details" />
                        </Link>
                    </Button>
                    <Link
                        href={`/${locale}`}
                        className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                        <TranslatedText as="span" i18nKey="thanks.explore" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
