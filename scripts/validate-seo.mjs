import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SEO_CONSTANTS,
  buildSeoManifest,
  getIndexableRoutes,
  resolveSeoRoute,
  slugifyProjectTitle,
  toAbsoluteUrl,
} from '../src/utils/seoManifest.js';
import { seoSections } from '../src/data/seoSections.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const projectsPath = path.join(projectRoot, 'src', 'data', 'projects.json');
const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');
const robotsPath = path.join(projectRoot, 'public', 'robots.txt');

const requiredRouteFields = [
  'path',
  'canonicalPath',
  'title',
  'description',
  'robots',
  'ogImage',
  'indexable',
  'routeType',
];

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const readProjects = () => JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

const validateRoutes = (manifest, projects) => {
  const homeRoute = resolveSeoRoute('/', manifest);
  assert(homeRoute.routeType === 'home', 'Expected "/" to resolve as home route.');
  assert(homeRoute.indexable === true, 'Expected "/" to be indexable.');

  for (const section of seoSections) {
    const pathName = section.slug === 'introduction' ? '/introduction' : `/${section.slug}`;
    const route = resolveSeoRoute(pathName, manifest);
    assert(
      route.routeType === 'section' || route.routeType === 'home',
      `Expected section route for "${pathName}".`,
    );
    assert(route.indexable === true, `Expected section route "${pathName}" to be indexable.`);
  }

  const projectsRoute = resolveSeoRoute('/projects', manifest);
  assert(
    projectsRoute.routeType === 'section' && projectsRoute.sectionSlug === 'projects',
    'Expected "/projects" to resolve to projects section route.',
  );

  for (const project of projects) {
    const slug = slugifyProjectTitle(project.title);
    const route = resolveSeoRoute(`/projects/${slug}`, manifest);
    assert(route.routeType === 'project', `Expected project route for "/projects/${slug}".`);
    assert(route.indexable === true, `Expected "/projects/${slug}" to be indexable.`);
  }

  const cmsRoute = resolveSeoRoute('/cms', manifest);
  const cmsNestedRoute = resolveSeoRoute('/cms/settings', manifest);
  assert(cmsRoute.routeType === 'cms', 'Expected "/cms" to resolve as cms route.');
  assert(cmsNestedRoute.routeType === 'cms', 'Expected "/cms/settings" to resolve as cms route.');
  assert(cmsRoute.robots === 'noindex,follow', 'Expected "/cms" robots to be noindex,follow.');
  assert(cmsRoute.indexable === false, 'Expected "/cms" to be non-indexable.');

  const unknownRoute = resolveSeoRoute('/not-a-real-page', manifest);
  const unknownProjectRoute = resolveSeoRoute('/projects/not-a-real-project', manifest);
  assert(
    unknownRoute.routeType === 'not-found',
    'Expected unknown path to resolve as not-found route.',
  );
  assert(
    unknownProjectRoute.routeType === 'not-found',
    'Expected unknown project path to resolve as not-found route.',
  );
  assert(
    unknownRoute.robots === 'noindex,follow' && unknownProjectRoute.robots === 'noindex,follow',
    'Expected unknown routes to emit noindex,follow.',
  );

  const allRoutes = [...manifest.staticEntries, ...manifest.projectEntries];
  for (const route of allRoutes) {
    for (const field of requiredRouteFields) {
      assert(
        Object.prototype.hasOwnProperty.call(route, field),
        `Missing required route field "${field}" on route "${route.path}".`,
      );
    }
  }
};

const validateSitemapAndRobots = (manifest) => {
  const indexableRoutes = getIndexableRoutes(manifest);
  assert(
    indexableRoutes.every((route) => route.indexable),
    'Sitemap source contains non-indexable routes.',
  );
  assert(
    indexableRoutes.every((route) => route.routeType !== 'cms' && route.routeType !== 'not-found'),
    'Indexable routes should not include cms/not-found routes.',
  );

  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  assert(!sitemap.includes('<priority>'), 'Sitemap must not include <priority>.');
  assert(!sitemap.includes('<changefreq>'), 'Sitemap must not include <changefreq>.');

  const locMatches = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedLocs = indexableRoutes.map((route) =>
    toAbsoluteUrl(route.canonicalPath, SEO_CONSTANTS.canonicalOrigin),
  );

  assert(
    locMatches.length === expectedLocs.length,
    `Sitemap URL count mismatch. Expected ${expectedLocs.length}, got ${locMatches.length}.`,
  );
  assert(
    locMatches.every((loc) => loc.startsWith(`${SEO_CONSTANTS.canonicalOrigin}/`) || loc === `${SEO_CONSTANTS.canonicalOrigin}/`),
    'All sitemap URLs must use canonical absolute URLs on https://www.neelgenix.com.',
  );

  const locSet = new Set(locMatches);
  const expectedSet = new Set(expectedLocs);
  assert(locSet.size === expectedSet.size, 'Sitemap URLs must be unique and canonical-only.');
  for (const loc of expectedSet) {
    assert(locSet.has(loc), `Missing sitemap URL: ${loc}`);
  }

  const robots = fs.readFileSync(robotsPath, 'utf8');
  assert(robots.includes('User-agent: *'), 'robots.txt missing "User-agent: *".');
  assert(robots.includes('Allow: /'), 'robots.txt should allow crawling of page content.');
  assert(
    robots.includes(`Sitemap: ${SEO_CONSTANTS.canonicalOrigin}/sitemap.xml`),
    'robots.txt sitemap URL must match canonical host.',
  );
};

const projects = readProjects();
const manifest = buildSeoManifest({ projects });

validateRoutes(manifest, projects);
validateSitemapAndRobots(manifest);

console.log(
  `SEO validation passed for ${projects.length} projects and ${getIndexableRoutes(manifest).length} indexable routes.`,
);
