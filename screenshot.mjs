import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const [, , url, label] = process.argv;

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

const outDir = 'temporary screenshots';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const existing = readdirSync(outDir)
  .map((f) => f.match(/^screenshot-(\d+)/))
  .filter(Boolean)
  .map((m) => parseInt(m[1], 10));
const next = existing.length ? Math.max(...existing) + 1 : 1;
const suffix = label ? `-${label}` : '';
const filename = `screenshot-${next}${suffix}.png`;
const outPath = join(outDir, filename);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved: ${outPath}`);
