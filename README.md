# Feathered Friends Sanctuary & Rescue — "A Life Worth Living" (v3 concept)

A cinematic, single-page concept site for [Feathered Friends Sanctuary &
Rescue](https://www.feathered-friends.com) (Edgerton, WI — est. 2000), designed
to do three jobs in one scroll:

1. **Drive adoptions** — but honestly. Bird cards lead with volume, lifespan,
   and experience level, and the adoption CTA is gated behind three plain-English
   acknowledgments. Deliberate friction: the right match never needs a sales pitch.
2. **Drive donations** — concrete impact tiers ("The Chop Club", wellness visits,
   sanctuary sponsorship) linking to the org's real PayPal.
3. **Recruit volunteers** — plus surrender and boarding paths.

## The design

A **night-to-daylight journey**: generative starling murmuration over a dawn
sky (canvas boids that part around your cursor), a gold ribbon of "happy
landings," warm editorial daylight for the flock, then back into the dark for
**The Forever Math** — an interactive reckoning with what a parrot actually
costs in years, dollars, and decibels. Species chips + an age slider redraw a
life-together timeline ("Adopt a macaw at 34 and you'd be 99 at the end of it").

- **Logo**: the organization's real two-macaw seal, redrawn as crisp SVG in the
  site palette (`public/logo-seal.svg`).
- **Portraits**: seven hand-drawn SVG species busts in arched aviary windows.
- **Type**: Fraunces (display) · Instrument Sans (text) · Space Grotesk (numbers).
- **Motion**: one physics — a single reveal system, tweened numbers,
  spring-pop modal — all gated behind `prefers-reduced-motion`.

## Run it

```bash
npm install
npm run dev       # http://localhost:5199
npm run build     # production bundle in dist/ (~62 KB gzip JS)
npm run preview   # serve the production build
```

Deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages).

## Honest-data note

Bird listings, adoption stories, and wait times are **sample data** for this
concept build (labeled as such on the page). Contact details, address, mission
language, founding year, and the PayPal/Facebook links are the organization's
real ones.

## Map

```
public/logo-seal.svg        the seal, redrawn
src/lib/flock.js            species facts (lifespan/cost/dB) + sample birds + org info
src/lib/motion.js           reveal observer, count-up, tween, scroll-lock hooks
src/components/Murmuration.jsx   the boids sky
src/components/Portraits.jsx     seven SVG species portraits
src/components/BirdModal.jsx     Companion Facts + honest checkboxes
src/components/sections/         Hero · Landings · Mission · Flock · Promise ·
                                 Donate · Involved · Visit
scripts/shots.mjs           screenshot harness (puppeteer-core + system Chrome)
```
