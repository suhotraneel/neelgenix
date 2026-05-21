const DEFAULT_CANONICAL_ORIGIN = 'https://www.neelgenix.com';

const normalizeOrigin = (origin) => {
  if (!origin) return DEFAULT_CANONICAL_ORIGIN;
  return origin.replace(/\/+$/g, '');
};

const normalizeBasePath = (basePath = '/') => {
  if (!basePath) return '/';
  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
};

const stripBasePath = (pathname, basePath) => {
  const normalizedBase = normalizeBasePath(basePath);
  if (normalizedBase === '/') return pathname;

  const baseWithoutTrailingSlash = normalizedBase.slice(0, -1);
  if (pathname === normalizedBase || pathname === baseWithoutTrailingSlash) return '/';

  if (pathname.startsWith(normalizedBase)) {
    return `/${pathname.slice(normalizedBase.length)}`;
  }

  return pathname;
};

const normalizePathname = (pathname = '/') => {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withSingleSlashes = withLeadingSlash.replace(/\/{2,}/g, '/');
  if (withSingleSlashes === '/') return withSingleSlashes;
  return withSingleSlashes.replace(/\/+$/g, '');
};

const getCanonicalOrigin = () => normalizeOrigin(
  import.meta.env.VITE_CANONICAL_ORIGIN || import.meta.env.VITE_SITE_URL
);

export const getCanonicalUrl = (pathname = window.location.pathname) => {
  const strippedPath = stripBasePath(pathname, import.meta.env.BASE_URL);
  const normalizedPath = normalizePathname(strippedPath);
  return `${getCanonicalOrigin()}${normalizedPath}`;
};

export const syncCanonicalTag = (pathname = window.location.pathname) => {
  if (typeof document === 'undefined') return '';

  const canonicalUrl = getCanonicalUrl(pathname);
  let canonicalLink = document.querySelector('link[rel="canonical"]');

  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }

  if (canonicalLink.getAttribute('href') !== canonicalUrl) {
    canonicalLink.setAttribute('href', canonicalUrl);
  }

  return canonicalUrl;
};
