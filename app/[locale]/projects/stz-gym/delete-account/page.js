import { notFound } from 'next/navigation';
import GymLegalPage from '../../../../../components/gym/GymLegalPage';
import { getGymLegal } from '../../../../../data/stzGymLegal';
import { GYM_SLUG } from '../../../../../data/stzGym';
import { localeAlternates } from '../../../../../lib/pageMetadata';
import { isLocale, localeParams } from '../../../../../lib/i18n';

export const dynamicParams = false;

export function generateStaticParams() {
    return localeParams();
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const { title, description } = getGymLegal(locale).deleteAccount;
    return { title, description, alternates: localeAlternates(locale, `/projects/${GYM_SLUG}/delete-account`) };
}

export default async function Page({ params }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();

    return <GymLegalPage locale={locale} page="deleteAccount" />;
}
