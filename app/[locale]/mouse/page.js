import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    MOUSE_LOCALES,
    MOUSE_TOOLS,
    hubAlternates,
    toolPath,
} from '../../../lib/mouseTools';
import { getMouseContent } from '../../../content/mouse';
import { JsonLd } from '../../../lib/structuredData';
import { buildHubLd } from '../../../lib/mouseStructuredData';

export const dynamicParams = false;

export function generateStaticParams() {
    return MOUSE_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    if (!MOUSE_LOCALES.includes(locale)) return {};

    const { hub } = getMouseContent(locale);

    return {
        title: hub.title,
        description: hub.description,
        alternates: hubAlternates(locale),
        openGraph: {
            title: hub.title,
            description: hub.description,
            type: 'website',
            locale: locale === 'pt' ? 'pt_BR' : 'en_US',
        },
    };
}

export default async function MouseHubPage({ params }) {
    const { locale } = await params;
    if (!MOUSE_LOCALES.includes(locale)) notFound();

    const { hub, toolLabels, tools } = getMouseContent(locale);

    return (
        <>
            <JsonLd data={buildHubLd(locale, hub, MOUSE_TOOLS, toolLabels)} />

            <header className="mb-10 max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-[var(--text-heading)] mb-4">
                    {hub.h1}
                </h1>
                <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
                    {hub.intro}
                </p>
            </header>

            <h2 className="text-[11px] uppercase font-mono tracking-[0.28em] text-[var(--accent)] mb-4">
                {hub.toolsHeading}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOUSE_TOOLS.map((tool) => (
                    <Link
                        key={tool.id}
                        href={toolPath(locale, tool)}
                        className="group p-6 rounded-[var(--radius-card)] bg-[var(--surface-primary)] border [border-color:var(--border-subtle)] shadow-[var(--shadow-card)] hover:[border-color:var(--border-hover)] transition-all hover:-translate-y-0.5"
                    >
                        <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2 tracking-tight">
                            {tools[tool.id].h1}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {tools[tool.id].description}
                        </p>
                        <span className="mt-4 inline-block text-sm font-semibold text-[var(--accent)]">
                            {toolLabels[tool.id]} →
                        </span>
                    </Link>
                ))}
            </div>

            <section className="mt-12 max-w-3xl p-6 rounded-[var(--radius-card)] bg-[var(--surface-3)] border [border-color:var(--border-subtle)] border-l-4 [border-left-color:var(--accent)]">
                <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3 tracking-tight">
                    {hub.noteHeading}
                </h2>
                <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                    {hub.noteBody}
                </p>
            </section>
        </>
    );
}
