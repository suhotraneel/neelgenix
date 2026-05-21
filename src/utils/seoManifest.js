import { seoSections } from '../data/seoSections.js';

export const SEO_CONSTANTS = {
  siteName: 'Neel Genix',
  siteAlternateName: 'Neel Genix Portfolio',
  personName: 'Suhotra Chakraborty',
  personAlternateName: 'Neel Genix',
  canonicalOrigin: 'https://www.neelgenix.com',
  defaultOgImage: '/assets/hero-image.jpg',
  defaultLocale: 'en_US',
  socialLinks: [
    'https://www.linkedin.com/in/suhotra/',
    'https://www.instagram.com/neelgenix/',
  ],
};

const CMS_PATH_REGEX = /^\/cms(?:\/.*)?$/;

export const slugifyProjectTitle = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const normalizePathname = (pathname = '/') => {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withSingleSlashes = withLeadingSlash.replace(/\/{2,}/g, '/');
  if (withSingleSlashes === '/') return withSingleSlashes;
  return withSingleSlashes.replace(/\/+$/g, '');
};

export const normalizeAssetPath = (value = '') =>
  value.replace(/^\/neelgenix\/assets\//, '/assets/');

export const toAbsoluteUrl = (value = '', origin = SEO_CONSTANTS.canonicalOrigin) => {
  const normalizedOrigin = origin.replace(/\/+$/g, '');
  if (!value) return `${normalizedOrigin}/`;
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = normalizePathname(value);
  return normalizedPath === '/'
    ? `${normalizedOrigin}/`
    : `${normalizedOrigin}${normalizedPath}`;
};

const getPersonStructuredData = (origin = SEO_CONSTANTS.canonicalOrigin) => ({
  '@type': 'Person',
  name: SEO_CONSTANTS.personName,
  alternateName: SEO_CONSTANTS.personAlternateName,
  url: toAbsoluteUrl('/', origin),
  sameAs: SEO_CONSTANTS.socialLinks,
});

const createSectionEntry = (section) => ({
  path: `/${section.slug}`,
  canonicalPath: `/${section.slug}`,
  title: section.pageTitle,
  description: section.description,
  robots: 'index,follow',
  ogImage: SEO_CONSTANTS.defaultOgImage,
  indexable: true,
  routeType: 'section',
  sectionSlug: section.slug,
  jsonLdFactory: ({ canonicalUrl, origin }) => {
    if (section.slug === 'about-me') {
      return {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: canonicalUrl,
        mainEntity: getPersonStructuredData(origin),
      };
    }
    return null;
  },
});

const createProjectEntry = (project) => {
  const projectSlug = slugifyProjectTitle(project.title);
  const imagePath = normalizeAssetPath(project.image || SEO_CONSTANTS.defaultOgImage);

  return {
    path: `/projects/${projectSlug}`,
    canonicalPath: `/projects/${projectSlug}`,
    title: `${project.title} | Projects | Neel Genix`,
    description: project.detail || 'Project case study by Neel Genix.',
    robots: 'index,follow',
    ogImage: imagePath,
    indexable: true,
    routeType: 'project',
    projectSlug,
    projectTitle: project.title,
    jsonLdFactory: ({ canonicalUrl, origin }) => ({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.detail,
      url: canonicalUrl,
      image: toAbsoluteUrl(imagePath, origin),
      creator: getPersonStructuredData(origin),
    }),
  };
};

const createHomeEntry = () => ({
  path: '/',
  canonicalPath: '/',
  title: 'Neel Genix | Suhotra Chakraborty - UX UI Designer',
  description:
    'Portfolio of Suhotra Chakraborty (Neel Genix), a UX UI designer crafting user-centered digital products, design systems, and AI-powered experiences.',
  robots: 'index,follow',
  ogImage: SEO_CONSTANTS.defaultOgImage,
  indexable: true,
  routeType: 'home',
  jsonLdFactory: ({ canonicalUrl, origin }) => [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SEO_CONSTANTS.siteName,
      alternateName: SEO_CONSTANTS.siteAlternateName,
      url: canonicalUrl,
    },
    {
      '@context': 'https://schema.org',
      ...getPersonStructuredData(origin),
    },
  ],
});

const createProjectsListingEntry = () => {
  const projectsSection = seoSections.find((section) => section.slug === 'projects');
  if (!projectsSection) {
    throw new Error('Missing projects section SEO metadata.');
  }

  return {
    path: '/projects',
    canonicalPath: '/projects',
    title: projectsSection.pageTitle,
    description: projectsSection.description,
    robots: 'index,follow',
    ogImage: SEO_CONSTANTS.defaultOgImage,
    indexable: true,
    routeType: 'section',
    sectionSlug: 'projects',
    jsonLdFactory: null,
  };
};

const createCmsEntry = () => ({
  path: '/cms',
  canonicalPath: '/cms',
  title: 'CMS | Neel Genix',
  description: 'Internal content management interface for Neel Genix.',
  robots: 'noindex,follow',
  ogImage: SEO_CONSTANTS.defaultOgImage,
  indexable: false,
  routeType: 'cms',
  jsonLdFactory: null,
});

const createNotFoundEntry = (pathname) => ({
  path: pathname,
  canonicalPath: pathname,
  title: 'Page Not Found | Neel Genix',
  description: 'The requested page could not be found.',
  robots: 'noindex,follow',
  ogImage: SEO_CONSTANTS.defaultOgImage,
  indexable: false,
  routeType: 'not-found',
  jsonLdFactory: null,
});

export const buildSeoManifest = ({ projects = [] } = {}) => {
  const home = createHomeEntry();
  const projectsListing = createProjectsListingEntry();
  const cms = createCmsEntry();
  const sectionEntries = seoSections
    .filter((section) => section.slug !== 'projects')
    .map(createSectionEntry);
  const projectEntries = projects.map(createProjectEntry);
  const staticEntries = [home, projectsListing, ...sectionEntries, cms];
  const exactRoutes = new Map(staticEntries.map((entry) => [entry.path, entry]));
  const projectRoutesBySlug = new Map(
    projectEntries.map((entry) => [entry.projectSlug, entry]),
  );

  return {
    staticEntries,
    projectEntries,
    exactRoutes,
    projectRoutesBySlug,
  };
};

export const resolveSeoRoute = (pathname, manifest) => {
  const normalizedPath = normalizePathname(pathname);

  if (CMS_PATH_REGEX.test(normalizedPath)) {
    return manifest.exactRoutes.get('/cms');
  }

  const exactEntry = manifest.exactRoutes.get(normalizedPath);
  if (exactEntry) {
    return exactEntry;
  }

  if (normalizedPath.startsWith('/projects/')) {
    const projectSlug = normalizedPath.slice('/projects/'.length);
    const projectEntry = manifest.projectRoutesBySlug.get(projectSlug);
    if (projectEntry) {
      return projectEntry;
    }
  }

  return createNotFoundEntry(normalizedPath);
};

export const getIndexableRoutes = (manifest) => [
  ...manifest.staticEntries.filter((entry) => entry.indexable),
  ...manifest.projectEntries.filter((entry) => entry.indexable),
];
