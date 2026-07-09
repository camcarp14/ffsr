/* ============================================================
   LIVE FLOCK — scrapes feathered-friends.com species pages and
   returns the current adoptable birds as JSON.

   Netlify-credit conscious by design:
   - Responses are cached at the CDN edge for 6 hours (durable),
     served stale for a day while revalidating — the function
     itself runs a handful of times per day at most.
   - Bird photos are served straight from Wix's CDN (no proxying).
   ============================================================ */

const SOURCE = 'https://www.feathered-friends.com';
const PAGES = {
  'african-grays': 'African Grey',
  amazons: 'Amazon',
  cockatiels: 'Cockatiel',
  cockatoos: 'Cockatoo',
  conures: 'Conure',
  macaws: 'Macaw',
  parakeets: 'Parakeet',
  'other-birds': 'Other',
};

const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'bird';

/* pull species / age / sex out of the volunteers' own bio text */
function parseBio(desc) {
  const d = desc.replace(/\s+/g, ' ');
  const out = {};
  const m = d.match(
    /(?:is|am|are) (?:an?|the) (?:approximately |estimated (?:to be )?|around )?(\d{1,2})\s*\+?\s*[- ]?\s*years?[- ]?old,?\s*(assumed )?(male|female|bonded)?\s*,?\s*([A-Z][A-Za-z'’ -]{2,42}?)(?:\.|,| who| and| that| with|$)/
  );
  if (m) {
    out.age = `~${m[1]}${d.includes(m[1] + '+') ? '+' : ''} years`;
    if (m[3]) out.sex = m[2] ? `${cap(m[3])} (assumed)` : cap(m[3]);
    out.species = m[4].trim();
  }
  if (/unknown[- ]aged/i.test(d)) out.age = 'Unknown age';
  return out;
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* strip pure-CTA boilerplate lines (the site UI provides the CTA) */
const CTA_RE = [
  /to (meet|add) [^.]*?,? a complete(?:d)?(?: and approved)? questionnaire is required[^.]*\./i,
  /send in your complete questionnaire[^.]*\./i,
  /submit a questionnaire and come meet [^.]*!?/i,
  /if you're interested in meeting [^.]*questionnaire[^.]*\./i,
  /all cockatoos require a house without children[^.]*\./i,
  /multiple visits are required[^.]*\./i,
  /all cockatoo adopters must have large bird ownership experience\.?\s*(\([^)]*\)\.?)?/i,
  /birds are only available for adoption to those who live within 2 hours of edgerton, wi\.?/i,
];

function parsePage(html, group) {
  const birds = [];
  const seen = new Set();
  for (const chunk of html.split('"itemId":"').slice(1)) {
    const media = chunk.match(/"mediaUrl":"(01c11b_[a-f0-9]+~mv2\.(?:jpg|jpeg|png))"/);
    const title = chunk.match(/"title":"([^"]{1,80})"/);
    const desc = chunk.match(/"description":"((?:[^"\\]|\\.)*)"/);
    if (!media || seen.has(media[1])) continue;
    seen.add(media[1]);
    const name = title ? title[1].trim() : 'New arrival';
    let bio = (desc ? desc[1] : '')
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\//g, '/')
      .replace(/\\\\/g, '\\');
    bio = bio
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .filter((l) => !CTA_RE.some((re) => re.test(l)))
      .map((l) => CTA_RE.reduce((acc, re) => acc.replace(re, '').trim(), l))
      .filter(Boolean)
      .join('\n\n');
    const onHold = /on hold/i.test(name + ' ' + bio.slice(0, 200));
    birds.push({
      slug: slugify(name),
      name: name.replace(/\s*\(?on hold\)?/i, '').trim(),
      group,
      photo: `https://static.wixstatic.com/media/${media[1]}/v1/fill/w_820,h_920,q_85/${media[1]}`,
      photoLarge: `https://static.wixstatic.com/media/${media[1]}/v1/fit/w_1200,h_1200,q_88/${media[1]}`,
      bonded: /&/.test(name),
      onHold,
      bio,
      ...parseBio(bio),
    });
  }
  return birds;
}

export default async function handler() {
  const results = await Promise.allSettled(
    Object.entries(PAGES).map(async ([page, group]) => {
      const res = await fetch(`${SOURCE}/${page}`, {
        headers: { 'user-agent': 'FFSR-site-concept/1.0 (+adoptable bird sync)' },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error(`${page}: ${res.status}`);
      return parsePage(await res.text(), group);
    })
  );

  const birds = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));
  const failed = results.filter((r) => r.status === 'rejected').length;

  /* If the scrape mostly failed, tell the client to use its snapshot —
     and don't let the CDN cache the failure. */
  if (birds.length < 5) {
    return new Response(JSON.stringify({ error: 'source unavailable' }), {
      status: 503,
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
    });
  }

  return new Response(
    JSON.stringify({ birds, fetchedAt: new Date().toISOString(), pagesFailed: failed }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        /* browser: 15 min · CDN edge: 6 h, serve stale up to 24 h while revalidating */
        'cache-control': 'public, max-age=900',
        'netlify-cdn-cache-control': 'public, durable, s-maxage=21600, stale-while-revalidate=86400',
      },
    }
  );
}
