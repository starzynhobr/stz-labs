import TranslatedText from './TranslatedText';

export default function Hero() {
    return (
        <div className="section-header">
            <TranslatedText as="h2" className="text-accent" i18nKey="sections.projects_title" />
            <TranslatedText as="p" className="text-muted" i18nKey="sections.projects_subtitle" />
        </div>
    );
}
