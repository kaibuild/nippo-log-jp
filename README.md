# 日報ログ

日報ログの無料ツールSEOサイトです。Astro + TypeScriptで静的に生成し、Cloudflare Pagesで公開します。

## 開発

```bash
npm install
npm run dev
npm run build
```

`public/logo.png`と`public/favicon.png`を追加すると、サイト上のロゴとfaviconとして参照されます。Search Consoleの確認ファイルも`public/`直下に配置できます。
## SEO file verification

`sitemap.xml` and `robots.txt` are static files under `public/` so Cloudflare Pages serves them directly instead of falling back to an HTML route. The Cloudflare Pages `_headers` file sets explicit content types and no-cache revalidation for both files.

After building, verify the generated SEO files:

```bash
npm run build
npm run verify:seo
```

Post-deploy checks:

```bash
curl -I https://nippo-log-jp.pages.dev/sitemap.xml
curl -L https://nippo-log-jp.pages.dev/sitemap.xml
curl -I https://nippo-log-jp.pages.dev/robots.txt
curl -A "Googlebot/2.1 (+http://www.google.com/bot.html)" -I https://nippo-log-jp.pages.dev/sitemap.xml
```

Search Console retry steps:

1. Confirm the Search Console property is `https://nippo-log-jp.pages.dev/`.
2. Inspect `https://nippo-log-jp.pages.dev/sitemap.xml` only as a fetch check; normal HTML pages are better for indexability checks.
3. On the Sitemaps page, remove the old `/sitemap.xml` entry if possible.
4. Submit `sitemap.xml` again.
5. If it does not succeed immediately, wait a few hours to 48 hours and check again.
