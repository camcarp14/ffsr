import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'shots');
mkdirSync(out, { recursive: true });
const URL = 'http://localhost:5199/';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});
const page = await browser.newPage();
const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`);
});
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: 'networkidle0' });
await page.evaluate(() => (document.documentElement.style.scrollBehavior = 'auto'));
await new Promise((r) => setTimeout(r, 1500));

// 1. filter interaction
await page.evaluate(() => document.getElementById('flock').scrollIntoView());
await new Promise((r) => setTimeout(r, 1200));
const chips = await page.$$('.flock-filters .chip');
await chips[1].click(); // Quieter homes
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: join(out, 'p2-filter-quiet.png') });
const quietCount = await page.$$eval('.bird-card', (els) => els.length);

// 2. modal acks
await chips[0].click();
await new Promise((r) => setTimeout(r, 700));
const card = await page.$('.bird-card');
await card.click();
await new Promise((r) => setTimeout(r, 700));
for (const ack of await page.$$('.ack')) {
  await ack.click();
  await new Promise((r) => setTimeout(r, 150));
}
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: join(out, 'p2-modal-ready.png') });
const btnText = await page.$eval('.modal-action .btn', (el) => el.textContent);
// escape closes
await page.keyboard.press('Escape');
await new Promise((r) => setTimeout(r, 500));
const modalGone = (await page.$('.modal-scrim')) === null;

// 3. forever math: cockatiel at 60
await page.evaluate(() => document.getElementById('promise').scrollIntoView());
await new Promise((r) => setTimeout(r, 1000));
const darkChips = await page.$$('.chip-row .chip');
let clicked = '';
for (const c of darkChips) {
  const t = await c.evaluate((el) => el.textContent);
  if (t === 'Cockatiel') {
    await c.click();
    clicked = t;
    break;
  }
}
await page.$eval('#age-slider', (el) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(el, 62);
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: join(out, 'p2-math-cockatiel.png') });
const verdict = await page.$eval('.verdict-line', (el) => el.textContent);

// 4. reduced motion
const rpage = await browser.newPage();
await rpage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await rpage.setViewport({ width: 1440, height: 900 });
await rpage.goto(URL, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1200));
await rpage.evaluate(() => document.getElementById('mission').scrollIntoView());
await new Promise((r) => setTimeout(r, 700));
await rpage.screenshot({ path: join(out, 'p2-reduced-motion.png') });
await rpage.close();

// 5. full page for rhythm
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: join(out, 'p2-fullpage.png'), fullPage: true });

console.log(JSON.stringify({ quietCount, btnText, modalGone, clicked, verdict, errors }, null, 2));
await browser.close();
