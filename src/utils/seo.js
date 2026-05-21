import rawProjects from '../data/projects.json';
import {
  SEO_CONSTANTS,
  buildSeoManifest,
  normalizeAssetPath,
  normalizePathname,
  resolveSeoRoute,
  toAbsoluteUrl,
} from './seoManifest';

const manifest = buildSeoManifest({ projects: rawProjects });

const ensureMetaTag = (attribute, key, value = '') => {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
  return tag;
};

const ensureCanonicalTag = () => {
  const canonicalTags = document.head.querySelectorAll('link[rel="canonical"]');
  if (canonicalTags.length > 1) {
    canonicalTags.forEach((tag, index) => {
      if (index > 0) {
        tag.remove();
      }
    });
  }

  let canonicalTag = canonicalTags[0] || document.head.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  return canonicalTag;
};

const ensureJsonLdTag = () => {
  const jsonLdTags = document.head.querySelectorAll('script[data-seo-jsonld="true"]');
  if (jsonLdTags.length > 1) {
    jsonLdTags.forEach((tag, index) => {
      if (index > 0) {
        tag.remove();
      }
    });
  }

  let jsonLdTag =
    jsonLdTags[0] || document.head.querySelector('script[data-seo-jsonld="true"]');
  if (!jsonLdTag) {
    jsonLdTag = document.createElement('script');
    jsonLdTag.setAttribute('type', 'application/ld+json');
    jsonLdTag.setAttribute('data-seo-jsonld', 'true');
    document.head.appendChild(jsonLdTag);
  }
  return jsonLdTag;
};

const setJsonLd = (value) => {
  const jsonLdTag = ensureJsonLdTag();
  if (!value) {
    jsonLdTag.textContent = '';
    return;
  }
  const payload = Array.isArray(value) ? value : [value];
  jsonLdTag.textContent = JSON.stringify(payload);
};

export const getSeoRouteForPath = (pathname = window.location.pathname) =>
  resolveSeoRoute(normalizePathname(pathname), manifest);

export const applySeoForPath = (pathname = window.location.pathname) => {
  if (typeof document === 'undefined') return null;

  const route = getSeoRouteForPath(pathname);
  const canonicalPath = normalizePathname(route.canonicalPath);
  const canonicalUrl = toAbsoluteUrl(canonicalPath, SEO_CONSTANTS.canonicalOrigin);
  const ogImage = toAbsoluteUrl(normalizeAssetPath(route.ogImage), SEO_CONSTANTS.canonicalOrigin);

  document.title = route.title;

  ensureCanonicalTag().setAttribute('href', canonicalUrl);
  ensureMetaTag('name', 'description', route.description);
  ensureMetaTag('name', 'robots', route.robots);
  ensureMetaTag('property', 'og:type', 'website');
  ensureMetaTag('property', 'og:site_name', SEO_CONSTANTS.siteName);
  ensureMetaTag('property', 'og:locale', SEO_CONSTANTS.defaultLocale);
  ensureMetaTag('property', 'og:url', canonicalUrl);
  ensureMetaTag('property', 'og:title', route.title);
  ensureMetaTag('property', 'og:description', route.description);
  ensureMetaTag('property', 'og:image', ogImage);
  ensureMetaTag('name', 'twitter:card', 'summary_large_image');
  ensureMetaTag('name', 'twitter:url', canonicalUrl);
  ensureMetaTag('name', 'twitter:title', route.title);
  ensureMetaTag('name', 'twitter:description', route.description);
  ensureMetaTag('name', 'twitter:image', ogImage);

  const jsonLdValue =
    typeof route.jsonLdFactory === 'function'
      ? route.jsonLdFactory({ canonicalUrl, origin: SEO_CONSTANTS.canonicalOrigin, route })
      : null;
  setJsonLd(jsonLdValue);

  return {
    ...route,
    canonicalUrl,
  };
};

export const getCanonicalUrl = (pathname = window.location.pathname) =>
  toAbsoluteUrl(normalizePathname(pathname), SEO_CONSTANTS.canonicalOrigin);

export const getSeoManifest = () => manifest;
