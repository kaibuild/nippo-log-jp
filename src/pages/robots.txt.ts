import { site } from "../config/site";

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", site.productionUrl).toString()}
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
