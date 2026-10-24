import ChangelogView from '../../../components/ChangelogView';
import { loadChangelog } from '../../../lib/changelog';
import { buildPageMetadata } from '../../../lib/pageMetadata';
import { localeParams } from '../../../lib/i18n';

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
    return localeParams();
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    return buildPageMetadata('changelog', locale, '/changelog');
}

export default async function ChangelogPage() {
    const entries = await loadChangelog();

    return (
        <main className="relative min-h-screen bg-transparent pb-24 pt-32">
            <ChangelogView entries={entries} />
        </main>
    );
}
