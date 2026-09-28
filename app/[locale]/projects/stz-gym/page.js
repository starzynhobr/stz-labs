import { notFound } from 'next/navigation';
import GymProjectPage from '../../../../components/gym/GymProjectPage';
import { buildProjectMetadata } from '../../../../lib/pageMetadata';
import { isLocale, localeParams } from '../../../../lib/i18n';
import { GYM_SLUG } from '../../../../data/stzGym';

export const dynamicParams = false;

export function generateStaticParams() {
    return localeParams();
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    return buildProjectMetadata(GYM_SLUG, locale);
}

export default async function StzGymPage({ params }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    return <GymProjectPage />;
}
