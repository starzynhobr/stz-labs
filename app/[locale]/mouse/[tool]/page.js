import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    MOUSE_LOCALES,
    MOUSE_TOOLS,
    getToolBySlug,
    getToolById,
    toolAlternates,
    toolPath,
} from '../../../../lib/mouseTools';
import { getMouseContent } from '../../../../content/mouse';
import { OG_LOCALE } from '../../../../lib/i18n';
import { JsonLd } from '../../../../lib/structuredData';
import { buildFaqLd, buildToolAppLd } from '../../../../lib/mouseStructuredData';
import { projects } from '../../../../data/projects';
import ToolRenderer from '../../../../components/mouse/ToolRenderer';

export const dynamicParams = false;

export function generateStaticParams() {
    return MOUSE_LOCALES.flatMap((locale) => (
        MOUSE_TOOLS.map((tool) => ({ locale, tool: tool.slugs[locale] }))
    ));
}

export async function generateMetadata({ params }) {
    const { locale, tool: slug } = await params;
    const tool = getToolBySlug(locale, slug);
    if (!tool) return {};

    const content = getMouseContent(locale).tools[tool.id];

    return {
        title: content.title,
        description: content.description,
        alternates: toolAlternates(locale, tool),
        openGraph: {
            title: content.title,
            description: content.description,
            type: 'website',
            locale: OG_LOCALE[locale],
        },
        twitter: { card: 'summary_large_image' },
    };
}

export default async function MouseToolPage({ params }) {
    const { locale, tool: slug } = await params;
    const tool = getToolBySlug(locale, slug);
    if (!tool) notFound();

    const { tools, toolLabels, ui } = getMouseContent(locale);
    const content = tools[tool.id];
    const related = tool.related.map(getToolById).filter(Boolean);
    const product = tool.product
        ? projects.find((item) => item.slug === tool.product)
        : null;

    return (
        <>
            <JsonLd data={[buildToolAppLd(locale, tool, content), buildFaqLd(content.faq)]} />

            <header className="mb-8 max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[var(--text-heading)] mb-4">
                    {content.h1}
                </h1>
                <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                    {content.intro}
                </p>
            </header>

            <ToolRenderer component={tool.component} locale={locale} content={content} />

            <p className="mt-4 text-xs text-[var(--text-muted)]">{ui.noMouseWarning}</p>

            <article className="mt-16 max-w-3xl">
                {content.sections.map((section) => (
                    <section key={section.heading} className="mb-10">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text-heading)] mb-4">
                            {section.heading}
                        </h2>
                        {section.body.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </section>
                ))}

                <section className="mb-10">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--text-heading)] mb-6">
                        {ui.faqHeading}
                    </h2>
                    <dl className="space-y-5">
                        {content.faq.map((item) => (
                            <div
                                key={item.q}
                                className="p-5 rounded-[var(--radius-card)] bg-[var(--surface-primary)] border [border-color:var(--border-subtle)]"
                            >
                                <dt className="font-bold text-[var(--text-heading)] mb-2">{item.q}</dt>
                                <dd className="text-[15px] text-[var(--text-secondary)] leading-relaxed">{item.a}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            </article>

            <section className="mt-12 max-w-3xl">
                <h2 className="text-[11px] uppercase font-mono tracking-[0.28em] text-[var(--accent)] mb-4">
                    {ui.relatedHeading}
                </h2>
                <div className="flex flex-wrap gap-3">
                    {related.map((item) => (
                        <Link
                            key={item.id}
                            href={toolPath(locale, item)}
                            className="px-4 py-2 rounded-lg bg-[var(--surface-3)] border [border-color:var(--border-subtle)] text-sm font-semibold text-[var(--text-primary)] hover:[border-color:var(--border-hover)] transition-colors"
                        >
                            {toolLabels[item.id]}
                        </Link>
                    ))}
                    {product && (
                        <Link
                            href={`/${locale}/projects/${product.slug}`}
                            className="px-4 py-2 rounded-lg bg-[var(--accent)]/[0.08] border [border-color:var(--accent)] text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/[0.14] transition-colors"
                        >
                            {ui.productHeading}: {product.detail?.meta?.title?.replace(/\s*\|\s*STZ LABS\s*$/, '') || product.slug}
                        </Link>
                    )}
                </div>
            </section>
        </>
    );
}
