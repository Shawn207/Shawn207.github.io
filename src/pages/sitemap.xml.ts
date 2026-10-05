import type { APIRoute } from 'astro';
import { projectPages } from '../data/projectPages';
import { site } from '../data/site';
import { url } from '../lib/url';

const paths = ['/', ...Object.keys(projectPages).map((id) => `/projects/${id}/`), '/cv/'];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${new URL(url(p), site.url).href}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
