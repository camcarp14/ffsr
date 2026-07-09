import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'shots');
mkdirSync(out, { recursive: true });

const URL = 'http://localhost:5199/';
const sections = ['top', 'landings', 'mission', 'flock', 'promise', 'donate', 'involved', 'visit'];

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu-sandbox', '--force-color-profile=srgb'],
});

async function run(label, viewport) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });
  await new Promise((r) => setTimeout(r, 1600));
  for (const id of sections) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'auto' });
    }, id);
    await new Promise((r) => setTimeout(r, 1300));
    await page.screenshot({ path: join(out, `${label}-${id}.png`), type: 'png' });
  }
  // footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: join(out, `${label}-footer.png`) });
  // modal open (first bird card)
  await page.evaluate(() => {
    document.getElementById('flock')?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 900));
  const card = await page.$('.bird-card');
  if (card) {
    await card.click();
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: join(out, `${label}-modal.png`) });
  }
  await page.close();
}

await run('desktop', { width: 1440, height: 900, deviceScaleFactor: 1 });
await run('mobile', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

// logo close-up
const page = await browser.newPage();
await page.setViewport({ width: 700, height: 700 });
await page.goto(URL + 'logo-seal.svg', { waitUntil: 'networkidle0' });
await page.screenshot({ path: join(out, 'logo-seal.png') });
await page.close();

await browser.close();
console.log('done -> ' + out);
