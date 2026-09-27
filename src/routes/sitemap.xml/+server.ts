import { env } from '$env/dynamic/private'

export const prerender = true

export async function GET({platform}) {
  const pages = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/capoeira-classes-malta', changefreq: 'monthly', priority: '0.8' },
  ]

  const url = 'https://capoeiramalta.com'

  const render = (pages)
    .map(
      (p) => `<url>
  <loc>${url}${p.loc}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>${p.changefreq}</changefreq>
  <priority>${p.priority}</priority>
</url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${render}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}