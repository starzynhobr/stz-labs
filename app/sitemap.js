import { projects } from '../data/projects';

export const baseUrl = 'https://stzlabs.com';

const staticRoutes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/mouse-tester', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/support', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap() {
    const lastModified = new Date();

    const projectRoutes = projects
        .filter((project) => project.slug && project.detail)
        .map((project) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        }));

    return [
        ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
            url: `${baseUrl}${path}`,
            lastModified,
            changeFrequency,
            priority,
        })),
        ...projectRoutes,
    ];
}
