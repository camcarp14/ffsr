import { MODE, auth, db, useTable } from '../../lib/db.js';
import { useFlock } from '../../lib/useFlock.js';
import { ORG } from '../../lib/flock.js';
import TeamBirds from './TeamBirds.jsx';
import TeamEvents from './TeamEvents.jsx';

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'M4 13h6V4H4v9zm10 7h6v-9h-6v9zM4 20h6v-5H4v5zm10-16v5h6V4h-6z' },
  { id: 'birds', label: 'Birds', icon: 'M12 3c3 0 5 2 5 5 0 4-2 8-5 13C9 16 7 12 7 8c0-3 2-5 5-5z' },
  { id: 'events', label: 'Events', icon: 'M5 5h14v15H5V5zm0 5h14M9 3v4m6-4v4' },
  { id: 'notices', label: 'Notice bar', icon: 'M4 9h16v6H4V9zm2-4h12M6 19h12' },
  { id: 'rates', label: 'Boarding rates', icon: 'M12 3v18M7 7c0-2 10-2 10 0s-10 4-10 6 10 4 10 6' },
  { id: 'stories', label: 'Happy landings', icon: 'M12 21C7 16 3 12 3 8c0-3 2-5 5-5 2 0 3 1 4 3 1-2 2-3 4-3 3 0 5 2 5 5 0 4-4 8-9 13z' },
  { id: 'settings', label: 'Settings', icon: 'M12 9a3 3 0 100 6 3 3 0 000-6zm8 3l2 1-1 3-2.5-.5a7 7 0 01-1.5 1.5L17.5 20l-3 1-1-2.5h-3L9.5 21l-3-1 .5-3.5A7 7 0 015.5 15L3 15.5 2 12.5l2-1' },
];

/* ---------- small tabs, kept inline ---------- */

function Overview({ setTab }) {
  const { birds } = useFlock();
  const events = useTable('events');
  const stories = useTable('stories');
  const notices = useTable('notices');
  const notice = notices?.find((n) => n.id === 'main');
  const upcoming = (events || []).filter(
    (e) => e.starts_at && e.starts_at.slice(0, 10) >= new Date().toISOString().slice(0, 10)
  );

  const stats = [
    { n: birds ? birds.length : '…', label: 'birds on the public site', tab: 'birds' },
    { n: upcoming.length, label: 'upcoming events posted', tab: 'events' },
    { n: (stories || []).length, label: 'happy landings recorded', tab: 'stories' },
    { n: notice?.active === false ? 'off' : 'on', label: 'site notice bar', tab: 'notices' },
  ];

  return (
    <div className="team-page">
      <h1>
        Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'} 🌺
      </h1>
      <p className="team-lead">
        Here's the sanctuary's little corner of the internet, at a glance.
      </p>
      <div className="team-stats">
        {stats.map((s) => (
          <button className="team-stat" key={s.label} onClick={() => setTab(s.tab)}>
            <span className="num">{s.n}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
      <div className="team-hint">
        <h3>How the site stays fresh</h3>
        <ul>
          <li><strong>Birds</strong> sync automatically from feathered-friends.com every few hours — or manage them right here in the Birds tab.</li>
          <li><strong>Events</strong> you post here appear on the public Events page, next to the live Facebook feed.</li>
          <li><strong>The notice bar</strong> (the gold ribbon at the very top of every page) is yours to change any time.</li>
        </ul>
      </div>
    </div>
  );
}

function Notices() {
  const rows = useTable('notices');
  const main = rows?.find((r) => r.id === 'main') || { id: 'main', message: ORG.notice, active: true };
  if (rows === null) return <div className="team-page"><p className="team-lead">Loading…</p></div>;

  const save = (patch) => db.upsert('notices', { ...main, ...patch });

  return (
    <div className="team-page">
      <h1>Notice bar</h1>
      <p className="team-lead">
        The gold ribbon at the very top of every page. Perfect for "closed for
        the holiday," trim-day announcements, or weather notes.
      </p>
      <div className="team-card">
        <label className="fld">
          <span>Message</span>
          <input
            value={main.message || ''}
            onChange={(e) => save({ message: e.target.value })}
            maxLength={110}
          />
        </label>
        <label className="team-toggle">
          <input
            type="checkbox"
            checked={main.active !== false}
            onChange={(e) => save({ active: e.target.checked })}
          />
          <i />
          <span>{main.active !== false ? 'Showing on the site' : 'Hidden'}</span>
        </label>
        <p className="fld-hint">Live preview:</p>
        <div className="notice-preview">
          <svg viewBox="0 0 24 16" width="18" height="12" aria-hidden="true">
            <path d="M2 14 Q7 4 12 12 Q17 4 22 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          {main.message || '—'}
        </div>
      </div>
    </div>
  );
}

function Rates() {
  const rows = useTable('rates');
  if (rows === null) return <div className="team-page"><p className="team-lead">Loading…</p></div>;

  const seed = () =>
    Promise.all([
      db.upsert('rates', { price: 15, per: '/day', who: 'Budgies, parakeets, cockatiels, parrotlets, conures, Senegals…' }),
      db.upsert('rates', { price: 20, per: '/day', who: 'Amazons, greys, eclectus, Alexandrines…' }),
      db.upsert('rates', { price: 30, per: '/day', who: 'Macaws, cockatoos…' }),
    ]);

  return (
    <div className="team-page">
      <h1>Boarding rates</h1>
      <p className="team-lead">These feed the public Boarding &amp; surrender page directly.</p>
      {rows.length === 0 ? (
        <div className="team-card">
          <p>No rates set yet — start from the current published ones:</p>
          <button className="btn btn-ink" onClick={seed} style={{ marginTop: '1rem' }}>
            Load current rates
          </button>
        </div>
      ) : (
        <div className="team-card">
          {rows
            .slice()
            .sort((a, b) => a.price - b.price)
            .map((r) => (
              <div className="rate-row" key={r.id}>
                <label className="fld fld-s">
                  <span>$/day</span>
                  <input
                    type="number"
                    value={r.price}
                    onChange={(e) => db.upsert('rates', { ...r, price: +e.target.value })}
                  />
                </label>
                <label className="fld fld-grow">
                  <span>Which birds</span>
                  <input value={r.who || ''} onChange={(e) => db.upsert('rates', { ...r, who: e.target.value })} />
                </label>
                <button className="team-del" onClick={() => db.remove('rates', r.id)} aria-label="Remove rate">
                  ✕
                </button>
              </div>
            ))}
          <button
            className="btn btn-line"
            onClick={() => db.upsert('rates', { price: 25, per: '/day', who: 'New tier' })}
          >
            + Add a tier
          </button>
        </div>
      )}
    </div>
  );
}

function Stories() {
  const rows = useTable('stories');
  if (rows === null) return <div className="team-page"><p className="team-lead">Loading…</p></div>;
  return (
    <div className="team-page">
      <h1>Happy landings 🎉</h1>
      <p className="team-lead">
        Every adoption recorded here. Birds arrive automatically when you hit
        "Mark adopted" in the Birds tab — or add one from memory.
      </p>
      <div className="team-card">
        {rows.length === 0 && <p>No landings recorded yet — the best problem to fix.</p>}
        {rows.map((s) => (
          <div className="rate-row" key={s.id}>
            <label className="fld">
              <span>Bird</span>
              <input value={s.name} onChange={(e) => db.upsert('stories', { ...s, name: e.target.value })} />
            </label>
            <label className="fld fld-grow">
              <span>Their story</span>
              <input
                value={s.blurb || ''}
                placeholder="Now supervising breakfast in Madison…"
                onChange={(e) => db.upsert('stories', { ...s, blurb: e.target.value })}
              />
            </label>
            <button className="team-del" onClick={() => db.remove('stories', s.id)} aria-label="Remove">
              ✕
            </button>
          </div>
        ))}
        <button
          className="btn btn-line"
          onClick={() => db.upsert('stories', { name: 'New landing', adopted_on: new Date().toISOString().slice(0, 10) })}
        >
          + Add a landing
        </button>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="team-page">
      <h1>Settings</h1>
      <div className="team-card">
        <h3>
          Backend:{' '}
          <span className={`mode-badge ${MODE === 'supabase' ? 'mode-live' : ''}`}>
            {MODE === 'supabase' ? 'Supabase connected' : 'Demo mode'}
          </span>
        </h3>
        {MODE === 'demo' ? (
          <>
            <p>
              Everything in the portal works right now, but changes save to{' '}
              <strong>this browser only</strong>. To go live for the whole team:
            </p>
            <ol className="team-steps">
              <li>Create a free project at <strong>supabase.com</strong></li>
              <li>Open the SQL editor and run <code>supabase/schema.sql</code> (it's in the site's repository)</li>
              <li>In Netlify → Site settings → Environment variables, add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> from Supabase → Project settings → API</li>
              <li>Redeploy — this login screen becomes a real magic-link sign-in</li>
              <li>Add each volunteer's email to the <code>volunteers</code> table (Supabase → Table editor) to approve them</li>
            </ol>
          </>
        ) : (
          <p>
            Connected. Volunteers sign in with magic links; approve new
            volunteers by adding their email to the <code>volunteers</code>{' '}
            table in Supabase.
          </p>
        )}
      </div>
      <div className="team-card">
        <h3>Who can get in here?</h3>
        <p>
          The portal lives at <code>{location.origin}/#/team</code> (also linked
          in the site footer as "Team portal"). In demo mode, the bypass button
          opens it for anyone — fine for previewing, not for launch. Once
          Supabase is connected, only emails on the approved volunteers list
          can sign in, and the database itself refuses writes from anyone else.
        </p>
      </div>
      {MODE === 'demo' && (
        <div className="team-card">
          <h3>Reset demo data</h3>
          <p>Clears everything the portal saved in this browser.</p>
          <button
            className="btn btn-line team-danger"
            onClick={() => {
              Object.keys(localStorage)
                .filter((k) => k.startsWith('ffsr-team-'))
                .forEach((k) => localStorage.removeItem(k));
              location.reload();
            }}
          >
            Clear demo data
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- shell ---------- */
export default function TeamShell({ route, user }) {
  const tab = route.split('/')[2] || 'overview';
  const setTab = (id) => (location.hash = `#/team/${id}`);

  return (
    <div className="team">
      <aside className="team-side">
        <a className="team-brand" href="#/">
          <img src="/logo-seal.svg" alt="" width="44" height="44" />
          <span>
            Team portal
            <em>{MODE === 'demo' ? 'demo mode' : 'live'}</em>
          </span>
        </a>
        <nav className="team-nav">
          {TABS.map((t) => (
            <a key={t.id} href={`#/team/${t.id}`} className={tab === t.id ? 'on' : ''}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={t.icon} />
              </svg>
              {t.label}
            </a>
          ))}
        </nav>
        <div className="team-side-foot">
          <a href="#/" className="team-view-site">
            ↗ View public site
          </a>
          <button onClick={() => auth.signOut()}>Sign out · {user.email}</button>
        </div>
      </aside>
      <main className="team-main">
        {MODE === 'demo' && (
          <div className="demo-banner">
            Demo mode — changes save to this browser only. Connect Supabase in
            Settings before launch.
          </div>
        )}
        {tab === 'overview' && <Overview setTab={setTab} />}
        {tab === 'birds' && <TeamBirds />}
        {tab === 'events' && <TeamEvents />}
        {tab === 'notices' && <Notices />}
        {tab === 'rates' && <Rates />}
        {tab === 'stories' && <Stories />}
        {tab === 'settings' && <Settings />}
      </main>
    </div>
  );
}
