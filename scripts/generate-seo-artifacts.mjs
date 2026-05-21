import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildSeoManifest, getIndexableRoutes, SEO_CONSTANTS, toAbsoluteUrl } from '../src/utils/seoManifest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const projectsPath = path.join(projectRoot, 'src', 'data', 'projects.json');
const sectionsPath = path.join(projectRoot, 'src', 'data', 'seoSections.js');

export const generateSitemapAndRobots = (siteUrl = SEO_CONSTANTS.canonicalOrigin) => {
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  const manifest = buildSeoManifest({ projects });
  const indexableRoutes = getIndexableRoutes(manifest);
  const normalizedSiteUrl = siteUrl.replace(/\/+$/g, '');

  const sectionsLastMod = fs.statSync(sectionsPath).mtime.toISOString();
  const projectsLastMod = fs.statSync(projectsPath).mtime.toISOString();

  const getLastModForRoute = (route) =>
    route.routeType === 'project' ? projectsLastMod : sectionsLastMod;

  const sitemapEntries = indexableRoutes
    .map((route) => {
      const loc = toAbsoluteUrl(route.canonicalPath, normalizedSiteUrl);
      const lastmod = getLastModForRoute(route);
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapEntries,
    '</urlset>',
    '',
  ].join('\n');

  const robotsTxt = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${normalizedSiteUrl}/sitemap.xml`,
    '',
  ].join('\n');

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

  return {
    routesCount: indexableRoutes.length,
    sitemapPath: path.join(publicDir, 'sitemap.xml'),
    robotsPath: path.join(publicDir, 'robots.txt'),
  };
};

const { routesCount } = generateSitemapAndRobots(SEO_CONSTANTS.canonicalOrigin);
console.log(`Generated SEO artifacts for ${routesCount} indexable routes.`);
