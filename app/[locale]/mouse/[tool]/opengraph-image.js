import { ImageResponse } from 'next/og';
import { MOUSE_LOCALES, MOUSE_TOOLS, getToolBySlug } from '../../../../lib/mouseTools';
import { getMouseContent } from '../../../../content/mouse';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'STZ Labs';

export function generateStaticParams() {
    return MOUSE_LOCALES.flatMap((locale) => (
        MOUSE_TOOLS.map((tool) => ({ locale, tool: tool.slugs[locale] }))
    ));
}

export default async function Image({ params }) {
    const { locale, tool: slug } = await params;
    const tool = getToolBySlug(locale, slug);
    const content = tool ? getMouseContent(locale).tools[tool.id] : null;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#F1F5F9',
                    padding: 72,
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 7, background: '#4F46E5' }} />
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', letterSpacing: 2 }}>
                        STZ LABS
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ fontSize: 64, fontWeight: 700, color: '#0F172A', lineHeight: 1.1 }}>
                        {content?.h1 || 'Mouse tools'}
                    </div>
                    <div style={{ fontSize: 28, color: '#334155', lineHeight: 1.4, maxWidth: 900 }}>
                        {content?.description?.slice(0, 120) || ''}
                    </div>
                </div>

                <div style={{ display: 'flex', fontSize: 22, color: '#64748B' }}>
                    stzlabs.com
                </div>
            </div>
        ),
        size
    );
}
