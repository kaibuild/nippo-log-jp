import { site } from "../config/site";
import { tools } from "../config/tools";

const staticPaths = ["/", "/waitlist", "/terms", "/privacy"];
const toolPaths = tools.map((tool) => `/tools/${tool.slug}`);

export function GET() {
  const urls = [...staticPaths.slice(0, 1), ...toolPaths, ...staticPaths.slice(1)]
    .map((path) => {
      const loc = new URL(path, site.productionUrl).toString();
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
