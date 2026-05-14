import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const siteUrl = "https://nippo-log-jp.pages.dev/";
const sitemapUrl = "https://nippo-log-jp.pages.dev/sitemap.xml";
const expectedLocCount = 10;
const root = process.cwd();

function fail(message) {
  console.error(`verify:seo failed: ${message}`);
  process.exit(1);
}

function readRequired(path) {
  try {
    statSync(path);
    return readFileSync(path);
  } catch {
    fail(`${path} does not exist`);
  }
}

const sitemapPath = join(root, "dist", "sitemap.xml");
const robotsPath = join(root, "dist", "robots.txt");
const headersPath = join(root, "dist", "_headers");

const sitemapBuffer = readRequired(sitemapPath);
const robotsBuffer = readRequired(robotsPath);
readRequired(headersPath);

const declaration = '<?xml version="1.0" encoding="UTF-8"?>';
const sitemap = sitemapBuffer.toString("utf8");
const robots = robotsBuffer.toString("utf8");

if (sitemapBuffer[0] === 0xef && sitemapBuffer[1] === 0xbb && sitemapBuffer[2] === 0xbf) {
  fail("dist/sitemap.xml starts with a UTF-8 BOM");
}
if (!sitemap.startsWith(declaration)) {
  fail(`dist/sitemap.xml must start with ${declaration}`);
}
if (sitemap.charCodeAt(0) === 0xfeff || /^\s/.test(sitemap[0])) {
  fail("dist/sitemap.xml starts with whitespace or an unexpected character");
}
if (!sitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
  fail("dist/sitemap.xml is missing the sitemap urlset namespace");
}
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
if (locs.length !== expectedLocCount) {
  fail(`dist/sitemap.xml must contain ${expectedLocCount} <loc> entries, found ${locs.length}`);
}
for (const loc of locs) {
  if (!loc.startsWith(siteUrl)) {
    fail(`unexpected sitemap URL: ${loc}`);
  }
}
if (!robots.includes(`Sitemap: ${sitemapUrl}`)) {
  fail(`dist/robots.txt must include Sitemap: ${sitemapUrl}`);
}
console.log("verify:seo passed");
