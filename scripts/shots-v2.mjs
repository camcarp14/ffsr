import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'shots');
mkdirSync(out, { recursive: true });

const BASE = 'http://localhost:5199/';
const routes = [
  ['home', ''],
  ['adopt', '#/adopt'],
  ['about', '#/about'],
  ['faq', '#/faq'],
  ['involved', '#/get-involved'],
  ['forms', '#/forms'],
];

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});

const errors = [];

async function shoot(label, viewport) {
  const page = await browser.newPage();
  page.on('console', (m) => m.type() === 'error' && errors.push(`${label}: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`${label} pageerror: ${e.message}`));
  await page.setViewport(viewport);
  for (const [name, hash] of routes) {
    await page.goto(BASE + hash, { waitUntil: 'networkidle0', timeout: 40000 });
    await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
    await new Promise((r) => setTimeout(r, 1400));
    await page.screenshot({ path: join(out, `${label}-${name}-top.png`) });
    // mid + forced-reveal full page
    await page.evaluate(() => {
      document.querySelectorAll('[data-reveal], .stagger').forEach((el) => el.classList.add('in'));
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: join(out, `${label}-${name}-full.png`), fullPage: true });
  }
  // modal on adopt
  await page.goto(BASE + '#/adopt', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  const card = await page.$('.bird-card');
  if (card) {
    await card.click();
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: join(out, `${label}-modal.png`) });
  }
  await page.close();
}

await shoot('d2', { width: 1440, height: 900, deviceScaleFactor: 1 });
await shoot('m2', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

console.log(JSON.stringify({ errors }, null, 2));
await browser.close();
