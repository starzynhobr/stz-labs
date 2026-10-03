import ProjectCard from './ProjectCard';
import SuiteShowcaseCard from './SuiteShowcaseCard';

export default function ProjectGrid({ projectList, locale, releases, stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
            {projectList.map((project) => project.slug === 'stz-suite' ? (
                <SuiteShowcaseCard
                    key={project.slug}
                    tags={project.tags}
                    initialRelease={releases[project.slug] || null}
                    repoStats={stats[project.repoName] || null}
                />
            ) : (
                <ProjectCard
                    key={project.slug || project.titleKey}
                    layoutType={project.layoutType}
                    titleKey={project.titleKey}
                    descriptionKey={project.descriptionKey}
                    versionKey={project.versionKey}
                    repoName={project.repoName}
                    detailHref={project.slug ? `/${locale}/projects/${project.slug}` : null}
                    downloadHref={project.downloadHref}
                    releaseTagPrefix={project.releaseTagPrefix}
                    releaseAssetPattern={project.releaseAssetPattern}
                    releaseFallbackTag={project.releaseFallbackTag}
                    initialRelease={releases[project.slug] || null}
                    repoStats={project.repoName ? stats[project.repoName] || null : null}
                    badgeLabel={project.badgeLabel}
                    badgeLabelKey={project.badgeLabelKey}
                    badgeVariant={project.badgeVariant}
                    badgeAttrs={project.badgeAttrs}
                    tags={project.tags}
                    detailLabelKey={project.detailLabelKey}
                    downloadDisabledLabelKey={project.downloadDisabledLabelKey}
                    style={project.style}
                    actionButtons={project.actionButtons}
                    coverImage={project.coverImage}
                />
            ))}
        </div>
    );
}
