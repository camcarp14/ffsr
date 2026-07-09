import { useEffect, useState } from 'react';
import { BIRDS as SNAPSHOT } from './birds.js';
import { MODE, db } from './db.js';

/* ============================================================
   LIVE FLOCK HOOK — asks /api/birds (a cached serverless scrape
   of feathered-friends.com) for the current adoptable birds, so
   the site updates itself as the sanctuary adds and removes
   listings. Falls back to the bundled snapshot if the API is
   unreachable (local dev, outages).
   ============================================================ */

/* group-level defaults for birds we haven't hand-annotated */
const GROUP_DEFAULTS = {
  Macaw: { noise: 5, exp: 'Experienced homes only' },
  Cockatoo: { noise: 5, exp: 'Experienced homes only' },
  'African Grey': { noise: 3, exp: 'Experienced homes only' },
  Amazon: { noise: 4, exp: 'Some experience' },
  Conure: { noise: 3, exp: 'Some experience' },
  Cockatiel: { noise: 2, exp: 'Beginner-friendly' },
  Parakeet: { noise: 1, exp: 'Beginner-friendly' },
  Other: { noise: 3, exp: 'Some experience' },
};

/* hand-curated details for birds we know — live listings that match
   by slug get these richer facts layered on top */
const META = {
  bubba: { species: 'Yellow-Crowned Amazon', age: '~7 years', sex: 'Male', noise: 4 },
  babi: { species: 'Blue-Fronted Amazon', age: '27 years', sex: 'Male', noise: 5 },
  'elsa-olaf': { species: 'Lutino & White-faced Pied Cockatiels', age: '~4 years', sex: 'Bonded pair' },
  puddin: { species: "Goffin's Cockatoo", age: '20+ years', sex: 'Male (assumed)', noise: 4, special: 'Mostly blind — narrates life beautifully anyway' },
  houdini: { species: 'Yellow-Crested Cockatoo', age: 'Unknown age', sex: 'Male (assumed)', noise: 3 },
  'big-boy': { species: 'Umbrella Cockatoo', age: 'Unknown age', sex: 'Male (assumed)' },
  star: { species: 'Bare-Eyed Cockatoo', age: '20+ years', sex: 'Male (assumed)' },
  'sweetie-booboo': { species: 'Umbrella Cockatoos', age: 'Unknown age', sex: 'Bonded pair (F & M)' },
  buddy: { species: 'Umbrella Cockatoo', age: '25+ years', sex: 'Male (assumed)' },
  hita: { species: 'Umbrella Cockatoo', age: '30+ years', sex: 'Female', special: 'No homes with male cockatoos (egg-laying history)' },
  charlie: { species: "Goffin's Cockatoo", age: '~40 years', sex: 'Male (assumed)', special: 'No dogs · prefers to be your only "man"' },
  sunshine: { species: 'Sun Conure', age: '5+ years', sex: 'Female (assumed)', noise: 5 },
  rio: { species: 'Green-Cheek Conure', age: '8 years', sex: 'Female', noise: 2, exp: 'Beginner-friendly' },
  isaac: { species: 'Green-Cheek Conure', age: '9 years', sex: 'Male (assumed)', noise: 2, exp: 'Beginner-friendly' },
  ollie: { species: 'Green-Cheek Conure', age: '3 years', sex: 'Male', noise: 2, exp: 'Beginner-friendly' },
  morgan: { species: 'Blue & Gold Macaw', age: '~35 years', sex: 'Male' },
  koda: { species: 'Harlequin Macaw', age: '60+ years', sex: 'Male (assumed)', noise: 4 },
  'indigo-birdie': { species: 'Blue & Gold Macaw', age: '22 years', sex: 'Male (assumed)', special: 'Walks with a limp (born with deformed feet) — a total trooper' },
  marco: { species: 'Blue & Gold Macaw', age: '~30 years', sex: 'Male (assumed)' },
  jessie: { species: 'Blue & Gold Macaw', age: '30+ years', sex: 'Male (assumed)', noise: 4, special: 'No in-shell walnuts (seizure history)' },
  savannah: { species: 'Catalina Macaw (hybrid)', age: '21 years', sex: 'Female (assumed)', noise: 4, special: 'Harness-trained adventurer' },
  benji: { species: 'Blue & Gold Macaw', age: '~34 years', sex: 'Male (assumed)' },
  skittles: { species: 'Blue & Gold Macaw', age: '8 years', sex: 'Male (assumed)', noise: 4, special: 'Fully flighted — recall training encouraged' },
  max: { species: 'Blue & Gold Macaw', age: '40 years', sex: 'Male' },
  maui: { species: 'Blue & Gold Macaw', age: '17 years', sex: 'Male (assumed)', special: 'Fully flighted — recall training encouraged' },
  sinbad: { species: 'Harlequin Macaw', age: '~35 years', sex: 'Male', noise: 4 },
  'boyd-floyd': { species: 'Budgies', age: '4 years', sex: 'Bonded pair' },
  'teegan-mango': { species: 'Budgies', age: '5+ years', sex: 'Bonded pair' },
  oatmeal: { species: 'Indian Ringneck Parakeet', age: '13 years', sex: 'Male', noise: 4, exp: 'Experienced homes only', special: 'No cats or dogs (fall risk) · seizure history' },
  city: { species: 'Senegal Parrot', age: '~10 years', sex: 'Male', exp: 'Experienced homes only' },
  kiko: { species: 'Quaker Parrot', age: '4 years', sex: 'Female (assumed)', special: 'Quakers require WI state registration' },
  'melody-lyric': { species: "Fischer's Lovebirds", age: '3 & 5 years', sex: 'Bonded pair' },
  gizmo: { species: 'Senegal Parrot', age: '15 years', sex: 'Female (assumed)', special: 'No dogs · old wing injury, flies a little' },
};

const factsGroupFor = (bird) => {
  if (bird.group !== 'Other') return bird.group;
  const s = (bird.species || '').toLowerCase();
  if (s.includes('ringneck')) return 'Ringneck';
  if (s.includes('senegal')) return 'Senegal';
  if (s.includes('quaker')) return 'Quaker';
  if (s.includes('lovebird')) return 'Lovebird';
  return 'Conure';
};

function enrich(raw) {
  return raw.map((b) => {
    const meta = META[b.slug] || {};
    const defaults = GROUP_DEFAULTS[b.group] || GROUP_DEFAULTS.Other;
    const bird = {
      species: b.group === 'Other' ? 'Companion parrot' : b.group,
      age: 'Ask us',
      sex: 'Ask us',
      ...defaults,
      ...b,
      ...meta,
    };
    bird.facts = factsGroupFor(bird);
    if (bird.bonded && !/pair/i.test(bird.sex)) bird.sex = 'Bonded pair';
    return bird;
  });
}

const SNAPSHOT_ENRICHED = enrich(SNAPSHOT);

/* one fetch per session, shared by every component */
let shared = null;
let sharedPromise = null;

const loadFlock = () => {
  if (shared) return Promise.resolve(shared);
  if (!sharedPromise) {
    /* Once Supabase is connected, birds managed in the Team Portal become
       the source of truth; otherwise we sync from feathered-friends.com. */
    const fromPortal =
      MODE === 'supabase'
        ? db
            .list('birds')
            .then((rows) => rows.filter((b) => b.status === 'available'))
            .catch(() => [])
        : Promise.resolve([]);

    sharedPromise = fromPortal
      .then((portalBirds) => {
        if (portalBirds.length > 0) {
          shared = { birds: enrich(portalBirds), live: true };
          return shared;
        }
        return fetch('/api/birds')
          .then((r) => {
            if (!r.ok) throw new Error('api ' + r.status);
            return r.json();
          })
          .then((data) => {
            if (!data.birds?.length) throw new Error('empty');
            shared = { birds: enrich(data.birds), live: true };
            return shared;
          });
      })
      .catch(() => {
        shared = { birds: SNAPSHOT_ENRICHED, live: false };
        return shared;
      });
  }
  return sharedPromise;
};

export function useFlock() {
  const [state, setState] = useState(
    () => shared || { birds: null, live: false }
  );
  useEffect(() => {
    if (shared) return;
    let on = true;
    loadFlock().then((s) => on && setState(s));
    return () => {
      on = false;
    };
  }, []);
  return {
    birds: state.birds, // null while loading
    live: state.live,
    loading: state.birds === null,
    fallback: SNAPSHOT_ENRICHED, // for things that need instant data (hero)
  };
}
