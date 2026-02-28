import TranslatedText from './TranslatedText';

export default function StatusTimeline() {
    return (
        <section id="roadmap" className="roadmap">
            <div className="container">
                <div className="section-header" style={{ textAlign: 'center' }}>
                    <TranslatedText as="h2" className="text-accent" i18nKey="sections.roadmap_title" />
                    <TranslatedText
                        as="p"
                        className="text-muted"
                        i18nKey="sections.roadmap_subtitle"
                    />
                    <p
                        className="text-muted"
                        style={{ marginTop: '10px', fontSize: '0.95rem' }}
                    >
                        Tips do not fund a campaign; they support maintenance.
                    </p>
                </div>
                <div className="timeline">
                    <div className="timeline-item">
                        <span className="time-label">
                            <TranslatedText as="span" i18nKey="sections.roadmap_status_1" />{' '}
                            <TranslatedText as="span" className="update-badge" i18nKey="common.badges.stable" />
                        </span>
                        <div className="t-content">
                            <TranslatedText as="h4" i18nKey="sections.roadmap_q1" />
                            <TranslatedText as="p" i18nKey="sections.roadmap_q1_desc" />
                        </div>
                    </div>
                    <div className="timeline-item">
                        <span className="time-label">
                            <TranslatedText as="span" i18nKey="sections.roadmap_status_2" />{' '}
                            <TranslatedText as="span" className="update-badge" i18nKey="common.badges.beta" />
                        </span>
                        <div className="t-content">
                            <TranslatedText as="h4" i18nKey="sections.roadmap_q2" />
                            <TranslatedText as="p" i18nKey="sections.roadmap_q2_desc" />
                        </div>
                    </div>
                    <div className="timeline-item">
                        <span className="time-label">
                            <span>Planned / No public ETA</span>{' '}
                            <TranslatedText as="span" className="update-badge" i18nKey="common.badges.alpha" />
                        </span>
                        <div className="t-content">
                            <TranslatedText as="h4" i18nKey="sections.roadmap_q3" />
                            <TranslatedText as="p" i18nKey="sections.roadmap_q3_desc" />
                        </div>
                    </div>
                    <div className="timeline-item">
                        <span className="time-label">
                            <span>Experimental / No public ETA</span>{' '}
                            <TranslatedText as="span" className="update-badge" i18nKey="common.badges.alpha" />
                        </span>
                        <div className="t-content">
                            <TranslatedText as="h4" i18nKey="sections.roadmap_q4" />
                            <TranslatedText as="p" i18nKey="sections.roadmap_q4_desc" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
