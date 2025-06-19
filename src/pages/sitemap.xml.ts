import { getProducts } from "@/lib/shopify"; // you must implement this
import { type APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const products = await getProducts({}); // returns array of { handle: string }
  const base = 'https://matterhubs.com';

  const urls = [
    `${base}/`,
    `${base}/about`,
    `${base}/contact`,
    // Add more static routes manually
    ...products.products.map(p => `${base}/products/${p.handle}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        url => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
