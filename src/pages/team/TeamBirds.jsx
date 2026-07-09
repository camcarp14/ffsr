import { useState } from 'react';
import { MODE, db, useTable } from '../../lib/db.js';
import { useFlock } from '../../lib/useFlock.js';
import { SPECIES } from '../../lib/flock.js';
import { confetti } from '../../lib/confetti.js';
import BirdCard from '../../components/BirdCard.jsx';

const GROUPS = Object.keys(SPECIES).filter((g) => SPECIES[g].inMath).concat('Other');
const EXPS = ['Beginner-friendly', 'Some experience', 'Experienced homes only'];

const BLANK = {
  name: '',
  group: 'Macaw',
  species: '',
  age: '',
  sex: '',
  noise: 3,
  exp: 'Some experience',
  bonded: false,
  special: '',
  photo: '',
  bio: '',
  status: 'available',
};

function Editor({ bird, onClose }) {
  const [b, setB] = useState({ ...BLANK, ...bird });
  const set = (patch) => setB((prev) => ({ ...prev, ...patch }));

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => set({ photo: reader.result });
    reader.readAsDataURL(f);
  };

  const save = async () => {
    await db.upsert('birds', b);
    onClose();
  };

  const preview = {
    ...b,
    slug: b.id || 'preview',
    facts: b.group === 'Other' ? 'Conure' : b.group,
    photo: b.photo || '/birds/marco.jpg',
    species: b.species || b.group,
    age: b.age || 'Ask us',
  };

  return (
    <div className="team-editor">
      <div className="team-editor-form">
        <h2>{bird?.id ? `Editing ${bird.name}` : 'New bird'}</h2>
        <div className="fld-row">
          <label className="fld fld-grow">
            <span>Name</span>
            <input value={b.name} onChange={(e) => set({ name: e.target.value })} placeholder="Mango" />
          </label>
          <label className="fld">
            <span>Group</span>
            <select value={b.group} onChange={(e) => set({ group: e.target.value })}>
              {GROUPS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="fld-row">
          <label className="fld fld-grow">
            <span>Species</span>
            <input value={b.species} onChange={(e) => set({ species: e.target.value })} placeholder="Blue & Gold Macaw" />
          </label>
          <label className="fld">
            <span>Age</span>
            <input value={b.age} onChange={(e) => set({ age: e.target.value })} placeholder="~12 years" />
          </label>
          <label className="fld">
            <span>Sex</span>
            <input value={b.sex} onChange={(e) => set({ sex: e.target.value })} placeholder="Female (assumed)" />
          </label>
        </div>
        <div className="fld-row">
          <label className="fld fld-grow">
            <span>Volume — {b.noise}/5</span>
            <input type="range" min="1" max="5" value={b.noise} onChange={(e) => set({ noise: +e.target.value })} />
          </label>
          <label className="fld">
            <span>Best suited to</span>
            <select value={b.exp} onChange={(e) => set({ exp: e.target.value })}>
              {EXPS.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="team-toggle" style={{ alignSelf: 'end' }}>
            <input type="checkbox" checked={!!b.bonded} onChange={(e) => set({ bonded: e.target.checked })} />
            <i />
            <span>Bonded pair</span>
          </label>
        </div>
        <label className="fld">
          <span>Special notes (health, home requirements)</span>
          <input
            value={b.special}
            onChange={(e) => set({ special: e.target.value })}
            placeholder="No dogs · old wing injury, flies a little"
          />
        </label>
        <div className="fld-row">
          <label className="fld fld-grow">
            <span>Photo URL</span>
            <input value={b.photo} onChange={(e) => set({ photo: e.target.value })} placeholder="https://…" />
          </label>
          <label className="fld">
            <span>…or upload</span>
            <input type="file" accept="image/*" onChange={onFile} />
          </label>
        </div>
        <label className="fld">
          <span>Bio — write it like you'd introduce them to a friend</span>
          <textarea
            rows={7}
            value={b.bio}
            onChange={(e) => set({ bio: e.target.value })}
            placeholder={'Meet Mango.\n\nMango is a 12-year-old…'}
          />
        </label>
        <div className="team-editor-actions">
          <button className="btn btn-gold" onClick={save} disabled={!b.name.trim()}>
            Save bird
          </button>
          <button className="btn btn-line" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      <div className="team-editor-preview">
        <p className="fld-hint">Live preview — exactly how visitors will see it:</p>
        <div className="team-preview-card">
          <BirdCard bird={preview} onOpen={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default function TeamBirds() {
  const rows = useTable('birds');
  const { birds: liveBirds } = useFlock();
  const [editing, setEditing] = useState(null); // bird object or 'new'

  if (rows === null) {
    return (
      <div className="team-page">
        <p className="team-lead">Loading birds…</p>
      </div>
    );
  }

  const importFlock = async () => {
    for (const b of liveBirds || []) {
      await db.upsert('birds', {
        id: b.slug,
        name: b.name,
        group: b.group,
        species: b.species,
        age: b.age,
        sex: b.sex,
        noise: b.noise,
        exp: b.exp,
        bonded: !!b.bonded,
        special: b.special || '',
        photo: b.photo,
        bio: b.bio,
        status: 'available',
      });
    }
  };

  const markAdopted = async (b) => {
    confetti();
    await db.upsert('birds', { ...b, status: 'adopted' });
    await db.upsert('stories', {
      name: b.name,
      species: b.species,
      blurb: '',
      adopted_on: new Date().toISOString().slice(0, 10),
    });
  };

  if (editing) {
    return (
      <div className="team-page team-page-wide">
        <Editor bird={editing === 'new' ? null : editing} onClose={() => setEditing(null)} />
      </div>
    );
  }

  const active = rows.filter((b) => b.status !== 'adopted');
  const adopted = rows.filter((b) => b.status === 'adopted');

  return (
    <div className="team-page team-page-wide">
      <div className="team-page-head">
        <div>
          <h1>Birds</h1>
          <p className="team-lead">
            {MODE === 'supabase'
              ? 'Birds managed here are what the public site shows.'
              : 'The public site currently syncs from feathered-friends.com automatically. Manage birds here to see how it will work once Supabase is connected.'}
          </p>
        </div>
        <button className="btn btn-gold" onClick={() => setEditing('new')}>
          + Add a bird
        </button>
      </div>

      {rows.length === 0 && (
        <div className="team-card">
          <p>
            Nothing here yet. Start by pulling in the {liveBirds?.length || ''} birds
            currently listed on the website — then edit away.
          </p>
          <button className="btn btn-ink" style={{ marginTop: '1rem' }} onClick={importFlock} disabled={!liveBirds}>
            Import the current flock
          </button>
        </div>
      )}

      {active.length > 0 && (
        <div className="team-bird-list">
          {active.map((b) => (
            <div className="team-bird-row" key={b.id}>
              <img src={b.photo || '/birds/marco.jpg'} alt="" loading="lazy" />
              <div className="team-bird-who">
                <strong>{b.name}</strong>
                <span>
                  {b.species || b.group}
                  {b.status === 'hidden' && ' · hidden from site'}
                </span>
              </div>
              <div className="team-bird-actions">
                <button className="btn btn-line" onClick={() => setEditing(b)}>
                  Edit
                </button>
                <button className="btn btn-line" onClick={() => db.upsert('birds', { ...b, status: b.status === 'hidden' ? 'available' : 'hidden' })}>
                  {b.status === 'hidden' ? 'Unhide' : 'Hide'}
                </button>
                <button className="btn btn-gold" onClick={() => markAdopted(b)}>
                  Mark adopted 🎉
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {adopted.length > 0 && (
        <>
          <h2 className="team-subhead">Adopted 🎉</h2>
          <div className="team-bird-list">
            {adopted.map((b) => (
              <div className="team-bird-row team-bird-adopted" key={b.id}>
                <img src={b.photo || '/birds/marco.jpg'} alt="" loading="lazy" />
                <div className="team-bird-who">
                  <strong>{b.name}</strong>
                  <span>{b.species || b.group} · found their person</span>
                </div>
                <div className="team-bird-actions">
                  <button className="btn btn-line" onClick={() => db.upsert('birds', { ...b, status: 'available' })}>
                    Undo
                  </button>
                  <button className="team-del" onClick={() => db.remove('birds', b.id)} aria-label="Delete">
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
