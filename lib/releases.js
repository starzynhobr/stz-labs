import { findRelease, findRepoStats } from './github';

/**
 * Resolve no servidor a release de cada projeto que declara configuração de
 * release. Roda no build e revalida junto com a página, então a versão e o
 * link de download acompanham o GitHub sem precisar de atualização manual.
 */
export async function resolveProjectReleases(projectList) {
    const configured = projectList.filter((project) => (
        project.slug
        && project.repoName
        && project.releaseAssetPattern
    ));

    const resolved = await Promise.all(configured.map(async (project) => {
        const release = await findRelease({
            repoName: project.repoName,
            tagPrefix: project.releaseTagPrefix,
            assetPattern: project.releaseAssetPattern,
        }).catch(() => null);

        return [project.slug, release];
    }));

    return Object.fromEntries(resolved.filter(([, release]) => release));
}

/** Estrelas e último release por projeto, para os cards e specs. */
export async function resolveProjectStats(projectList) {
    const repos = [...new Set(
        projectList.map((project) => project.repoName).filter(Boolean)
    )];

    const resolved = await Promise.all(repos.map(async (repoName) => [
        repoName,
        await findRepoStats(repoName).catch(() => null),
    ]));

    return Object.fromEntries(resolved.filter(([, stats]) => stats));
}
