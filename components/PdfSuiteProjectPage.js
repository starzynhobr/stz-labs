import Link from 'next/link';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import TranslatedText from './TranslatedText';
import ZoomableImage from './ZoomableImage';
import PdfSuiteDemo from './PdfSuiteDemo';
import { downloadPath } from '../lib/downloadPath';

const IMAGES = '/images/projects/stz-pdf-suite/v030';
const text = (key, as = 'span', className = '') => (
    <TranslatedText as={as} i18nKey={`pdf_suite.${key}`} className={className} />
);
const surface = 'rounded-[var(--radius-card)] border [border-color:var(--border-subtle)] bg-[var(--surface-primary)]';

function Screenshot({ file, alt, sizes = '(max-width: 768px) 100vw, 560px', priority = false }) {
    return <ZoomableImage src={`${IMAGES}/${file}`} alt={alt} className={`relative block w-full aspect-[72/55] overflow-hidden ${surface}`} imageClassName="object-contain" sizes={sizes} priority={priority} />;
}

export default function PdfSuiteProjectPage({ project, release, locale }) {
    const version = release?.tagName || 'v0.3.0';
    const screens = [
        ['02-pdf-para-imagens.png', 'pdf_image'],
        ['05-imagens-para-pdf.png', 'image_pdf'],
        ['03-organizar-paginas.png', 'reorder'],
        ['04-pos-processamento.png', 'post_process'],
    ];

    return (
        <main className="relative min-h-screen overflow-hidden px-6 pt-32 pb-24">
            <div className="mx-auto max-w-6xl space-y-20 md:space-y-28">
                <section className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                    <div>
                        <div className="mb-6 flex flex-wrap gap-2">
                            <Badge variant="stable">{version}</Badge>
                            <Badge>Windows · x64</Badge>
                            <Badge>{text('landing.local')}</Badge>
                        </div>
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">STZ PDF Suite</p>
                        {text('landing.title', 'h1', 'text-4xl font-bold tracking-tight text-[var(--text-heading)] md:text-5xl')}
                        {text('description', 'p', 'mt-6 text-lg leading-relaxed text-[var(--text-secondary)]')}
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild><Link href={downloadPath(locale, project.slug)}>{text('landing.download')}</Link></Button>
                            <Button asChild variant="secondary"><a href={project.detail.hero.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a></Button>
                        </div>
                        {text('landing.install', 'p', 'mt-4 text-sm leading-relaxed text-[var(--text-muted)]')}
                    </div>
                    <div className="min-w-0">
                        <Screenshot file="01-unir-pdfs.png" alt="STZ PDF Suite 0.3.0 — Unir PDF" sizes="(max-width: 1024px) 100vw, 640px" priority />
                    </div>
                </section>

                <section>
                    {text('landing.tools', 'h2', 'text-3xl font-bold tracking-tight text-[var(--text-heading)]')}
                    {text('landing.tools_desc', 'p', 'mt-4 max-w-2xl leading-relaxed text-[var(--text-secondary)]')}
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {project.detail.features.map((feature) => (
                            <article key={feature.titleKey} className={`${surface} p-6`}>
                                <TranslatedText as="h3" i18nKey={feature.titleKey} className="mb-3 text-lg font-semibold text-[var(--text-heading)]" />
                                <TranslatedText as="p" i18nKey={feature.descriptionKey} className="text-sm leading-relaxed text-[var(--text-secondary)]" />
                            </article>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="pdf-screens">
                    <TranslatedText as="h2" id="pdf-screens" i18nKey="pdf_suite.landing.screens" className="text-3xl font-bold tracking-tight text-[var(--text-heading)]" />
                    <div className="mt-8 grid gap-8 md:grid-cols-2">
                        {screens.map(([file, key]) => (
                            <article key={file} className="min-w-0">
                                <Screenshot file={file} alt={`STZ PDF Suite 0.3.0 — ${file.slice(3, -4)}`} />
                                {text(`showcase.${key}_title`, 'h3', 'mt-5 text-xl font-semibold text-[var(--text-heading)]')}
                                {text(`showcase.${key}_desc`, 'p', 'mt-2 text-sm leading-relaxed text-[var(--text-secondary)]')}
                            </article>
                        ))}
                    </div>
                </section>

                <section className="grid items-center gap-8 md:grid-cols-2">
                    <div>
                        {text('landing.themes', 'h2', 'text-3xl font-bold tracking-tight text-[var(--text-heading)]')}
                        {text('landing.themes_desc', 'p', 'mt-4 leading-relaxed text-[var(--text-secondary)]')}
                        {text('landing.migration', 'p', 'mt-4 text-sm leading-relaxed text-[var(--text-muted)]')}
                    </div>
                    <Screenshot file="06-tema-claro.png" alt="STZ PDF Suite 0.3.0 — light theme" />
                </section>

                <section className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
                    <PdfSuiteDemo />
                    <div className="md:order-last">
                        {text('landing.demo', 'h2', 'text-3xl font-bold tracking-tight text-[var(--text-heading)]')}
                        {text('landing.demo_desc', 'p', 'mt-4 leading-relaxed text-[var(--text-secondary)]')}
                    </div>
                </section>

                <section className={`${surface} p-6 md:p-10`}>
                    <TranslatedText as="h2" i18nKey="sections.specs_title" className="mb-6 text-2xl font-bold text-[var(--text-heading)]" />
                    <dl className="grid gap-x-10 md:grid-cols-2">
                        {project.detail.specs.map((spec) => (
                            <div key={spec.labelKey} className="flex flex-wrap justify-between gap-3 border-b py-4 [border-color:var(--border-subtle)]">
                                <TranslatedText as="dt" i18nKey={spec.labelKey} className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]" />
                                <dd className="text-sm font-semibold text-[var(--text-primary)]">{spec.repoName ? version : spec.value}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Button asChild><Link href={downloadPath(locale, project.slug)}>{text('landing.download')}</Link></Button>
                        <a className="text-sm text-[var(--accent)] underline underline-offset-4" href={release?.releaseUrl || `${project.detail.hero.githubUrl}/releases/tag/v0.3.0`} target="_blank" rel="noreferrer">{text('landing.release')}</a>
                    </div>
                </section>
            </div>
        </main>
    );
}
