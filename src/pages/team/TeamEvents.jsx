import { useState } from 'react';
import { db, useTable } from '../../lib/db.js';

const BLANK = { title: '', date: '', time: '10:00', location: 'Feathered Friends Sanctuary, Edgerton WI', blurb: '', published: true };

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export default function TeamEvents() {
  const rows = useTable('events');
  const [form, setForm] = useState(null); // null | event-ish object
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  if (rows === null) {
    return (
      <div className="team-page">
        <p className="team-lead">Loading events…</p>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = rows.filter((e) => (e.starts_at || '').slice(0, 10) >= today).sort((a, b) => a.starts_at.localeCompare(b.starts_at));
  const past = rows.filter((e) => (e.starts_at || '').slice(0, 10) < today);

  const openEdit = (e) =>
    setForm({
      ...e,
      date: (e.starts_at || '').slice(0, 10),
      time: (e.starts_at || 'T10:00').slice(11, 16) || '10:00',
    });

  const save = async () => {
    const { date, time, ...rest } = form;
    await db.upsert('events', { ...rest, starts_at: `${date}T${time || '10:00'}:00` });
    setForm(null);
  };

  return (
    <div className="team-page team-page-wide">
      <div className="team-page-head">
        <div>
          <h1>Events</h1>
          <p className="team-lead">
            Posted events appear on the public Events page next to the Facebook
            feed — trim days, open houses, fundraisers.
          </p>
        </div>
        <button className="btn btn-gold" onClick={() => setForm({ ...BLANK })}>
          + Post an event
        </button>
      </div>

      {form && (
        <div className="team-card">
          <div className="fld-row">
            <label className="fld fld-grow">
              <span>What's happening?</span>
              <input value={form.title} onChange={(e) => set({ title: e.target.value })} placeholder="Spring trim day" />
            </label>
            <label className="fld">
              <span>Date</span>
              <input type="date" value={form.date} onChange={(e) => set({ date: e.target.value })} />
            </label>
            <label className="fld">
              <span>Time</span>
              <input type="time" value={form.time} onChange={(e) => set({ time: e.target.value })} />
            </label>
          </div>
          <label className="fld">
            <span>Where</span>
            <input value={form.location} onChange={(e) => set({ location: e.target.value })} />
          </label>
          <label className="fld">
            <span>The details</span>
            <textarea
              rows={4}
              value={form.blurb}
              onChange={(e) => set({ blurb: e.target.value })}
              placeholder="Wing, beak, and nail trims — $10 per bird, first come first served…"
            />
          </label>
          <label className="team-toggle">
            <input type="checkbox" checked={form.published !== false} onChange={(e) => set({ published: e.target.checked })} />
            <i />
            <span>{form.published !== false ? 'Visible on the public site' : 'Draft — team only'}</span>
          </label>
          <div className="team-editor-actions">
            <button className="btn btn-gold" onClick={save} disabled={!form.title.trim() || !form.date}>
              {form.id ? 'Save changes' : 'Post event'}
            </button>
            <button className="btn btn-line" onClick={() => setForm(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <h2 className="team-subhead">Upcoming</h2>
      {upcoming.length === 0 && <p className="team-empty">Nothing on the calendar — the birds are between engagements.</p>}
      {upcoming.map((e) => (
        <div className="team-event-row" key={e.id}>
          <div className="team-event-when num">{fmt(e.starts_at)}</div>
          <div className="team-bird-who">
            <strong>
              {e.title}
              {e.published === false && ' · draft'}
            </strong>
            <span>{e.location}</span>
          </div>
          <div className="team-bird-actions">
            <button className="btn btn-line" onClick={() => openEdit(e)}>
              Edit
            </button>
            <button className="team-del" onClick={() => db.remove('events', e.id)} aria-label="Delete event">
              ✕
            </button>
          </div>
        </div>
      ))}

      {past.length > 0 && (
        <>
          <h2 className="team-subhead">Past</h2>
          {past.map((e) => (
            <div className="team-event-row team-event-past" key={e.id}>
              <div className="team-event-when num">{fmt(e.starts_at)}</div>
              <div className="team-bird-who">
                <strong>{e.title}</strong>
                <span>{e.location}</span>
              </div>
              <button className="team-del" onClick={() => db.remove('events', e.id)} aria-label="Delete event">
                ✕
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
