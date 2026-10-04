// Prefixes internal paths with the configured `base` (empty for a user site) and leaves external links alone.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string): string =>
  /^(https?:|mailto:|#)/.test(path) ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`;

export const isExternal = (href: string): boolean => /^https?:/.test(href);
