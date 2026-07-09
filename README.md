# Feathered Friends Sanctuary & Rescue — "A Life Worth Living"

A tropical, self-updating concept site for [Feathered Friends Sanctuary &
Rescue](https://www.feathered-friends.com) (Edgerton, WI — est. 2000).

## What makes it interesting

- **The bird list updates itself.** A Netlify function
  (`netlify/functions/birds.mjs`) scrapes the sanctuary's live species pages
  on demand and returns the current adoptable birds — names, photos, and the
  volunteers' own bios. Add or adopt a bird on the real site and this site
  follows. Responses are CDN-cached for six hours (durable, with
  stale-while-revalidate) so function invocations stay near zero; photos are
  served straight from Wix's CDN. If the API is unreachable, the client falls
  back to a bundled snapshot — the site never renders empty.
- **A generative hero** — a boid murmuration flies over a lagoon-sunset
  gradient, parting around the cursor while golden feathers drift down, with
  two live-picked ambassador birds in arched frames.
- **"What a parrot actually asks of you"** — a 24-hour day dial drawn with
  animated SVG arc segments (dash-array morphing, so switching species
  reshapes the day smoothly), paired with field notes on the honest
  non-negotiables: flock time, volume, mess, decades.
- **The Learn hub** (`#/learn`) — a four-chapter field guide (feeding,
  behavior, health & safety, before-you-adopt) with a scrollspy sidebar,
  a safe/never food grid, real Wisconsin avian-vet recommendations, and the
  sanctuary's own recommended reading. Content aligned with their published
  positions (World Parrot Trust, AAV, Mytoos, the True Nature of Parrots).

## Pages

Home · Adopt (live birds, filters, search, honesty-gated questionnaire
links) · Learn · About (story + beliefs) · FAQ · Get Involved (volunteer,
boarding rates & requirements, surrender) · Forms (the org's four real
Google Forms).

## Design system

Tropical lagoon palette (deep teal, coral, mango, sand), Fraunces +
Instrument Sans + Space Grotesk, layered wave dividers, one reveal-physics
system for all motion, skeleton loading matched to the card layout,
`prefers-reduced-motion` respected throughout. The two-macaw seal is the
organization's real logo redrawn as SVG in the site palette.

## Run it

```bash
npm install
npm run dev       # http://localhost:5199 (uses the bundled bird snapshot)
npm run build     # production bundle in dist/
```

Deployed on Netlify: build runs `npm run build`, publishes `dist/`, and
serves `/api/birds` through the function redirect in `netlify.toml`.

## Honesty notes

Contact details, mission language, policies, boarding rates, form links, and
bird listings are the organization's real ones. The sanctuary runs on one
paid caretaker and an army of volunteers — the site says so. Sample data
appears only if the live sync is unreachable, and is labeled.
