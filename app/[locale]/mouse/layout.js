import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOUSE_LOCALES, MOUSE_TOOLS, hubPath, toolPath } from '../../../lib/mouseTools';
import { getMouseContent } from '../../../content/mouse';
import MouseToolTabs from '../../../components/mouse/MouseToolTabs';

export function generateStaticParams() {
    return MOUSE_LOCALES.map((locale) => ({ locale }));
}

export default async function MouseToolsLayout({ children, params }) {
    const { locale } = await params;
    if (!MOUSE_LOCALES.includes(locale)) notFound();

    const { toolLabels, hub } = getMouseContent(locale);

    const tabs = MOUSE_TOOLS.map((tool) => ({
        id: tool.id,
        href: toolPath(locale, tool),
        label: toolLabels[tool.id],
    }));

    return (
        <main className="min-h-screen bg-transparent pt-24 pb-24 relative overflow-hidden">
            <div className="container max-w-6xl mx-auto px-6">
                <nav className="mb-8" aria-label={hub.toolsHeading}>
                    <Link
                        href={hubPath(locale)}
                        className="inline-block mb-4 text-[11px] font-mono uppercase tracking-[0.28em] text-[var(--accent)] hover:underline"
                    >
                        {hub.h1}
                    </Link>
                    <MouseToolTabs tabs={tabs} />
                </nav>

                {children}
            </div>
        </main>
    );
}
