/* ============================================================
   TEAM DATA LAYER — one API, two backends.

   · DEMO (default): everything lives in this browser's
     localStorage. Full functionality, zero setup — changes stay
     on this device. The portal's "bypass" login uses this.
   · SUPABASE: set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
     (see .env.example and supabase/schema.sql) and the same API
     talks to a real database with magic-link volunteer logins.
   ============================================================ */
import { useEffect, useState } from 'react';

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const MODE = SUPA_URL && SUPA_KEY ? 'supabase' : 'demo';

/* ---------- supabase client (lazy — demo users never load it) ---------- */
let supaPromise = null;
const supa = () => {
  if (!supaPromise) {
    supaPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(SUPA_URL, SUPA_KEY)
    );
  }
  return supaPromise;
};

/* ---------- tiny event bus so React hooks refresh on writes ---------- */
const listeners = new Map(); // table -> Set<fn>
const notify = (table) => (listeners.get(table) || []).forEach((fn) => fn());
const listen = (table, fn) => {
  if (!listeners.has(table)) listeners.set(table, new Set());
  listeners.get(table).add(fn);
  return () => listeners.get(table).delete(fn);
};

/* ---------- demo backend ---------- */
const LS = (table) => `ffsr-team-${table}`;
const readLS = (table) => {
  try {
    return JSON.parse(localStorage.getItem(LS(table))) || [];
  } catch {
    return [];
  }
};
const writeLS = (table, rows) => {
  localStorage.setItem(LS(table), JSON.stringify(rows));
  notify(table);
};

const demoBackend = {
  async list(table) {
    return readLS(table);
  },
  async upsert(table, row) {
    const rows = readLS(table);
    const id = row.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));
    const next = { ...row, id, updated_at: new Date().toISOString() };
    const i = rows.findIndex((r) => r.id === id);
    if (i >= 0) rows[i] = next;
    else rows.push(next);
    writeLS(table, rows);
    return next;
  },
  async remove(table, id) {
    writeLS(table, readLS(table).filter((r) => r.id !== id));
  },
};

/* ---------- supabase backend (same shape) ---------- */
const supaBackend = {
  async list(table) {
    const c = await supa();
    const { data, error } = await c.from(table).select('*').order('updated_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  async upsert(table, row) {
    const c = await supa();
    const { data, error } = await c.from(table).upsert({ ...row, updated_at: new Date().toISOString() }).select().single();
    if (error) throw error;
    notify(table);
    return data;
  },
  async remove(table, id) {
    const c = await supa();
    const { error } = await c.from(table).delete().eq('id', id);
    if (error) throw error;
    notify(table);
  },
};

export const db = MODE === 'supabase' ? supaBackend : demoBackend;

/* ---------- react hook: live table rows ---------- */
export function useTable(table) {
  const [rows, setRows] = useState(null);
  useEffect(() => {
    let on = true;
    const load = () => db.list(table).then((r) => on && setRows(r)).catch(() => on && setRows([]));
    load();
    const off = listen(table, load);
    return () => {
      on = false;
      off();
    };
  }, [table]);
  return rows; // null while loading
}

/* ============================================================
   AUTH — magic links on Supabase, a labeled bypass in demo.
   ============================================================ */
const BYPASS_KEY = 'ffsr-team-bypass';
const authListeners = new Set();
const notifyAuth = () => authListeners.forEach((fn) => fn());

export const auth = {
  mode: MODE,
  async getUser() {
    if (MODE === 'demo') {
      return sessionStorage.getItem(BYPASS_KEY)
        ? { email: 'volunteer@demo', name: 'Demo volunteer', demo: true }
        : null;
    }
    const c = await supa();
    const { data } = await c.auth.getUser();
    return data.user ? { email: data.user.email } : null;
  },
  /* is this signed-in email on the approved volunteers list? */
  async isApproved(user) {
    if (!user) return false;
    if (MODE === 'demo') return true;
    const c = await supa();
    const { data } = await c.from('volunteers').select('email').eq('email', user.email).maybeSingle();
    return !!data;
  },
  async signInMagic(email) {
    const c = await supa();
    const { error } = await c.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/#/team` },
    });
    if (error) throw error;
  },
  bypass() {
    sessionStorage.setItem(BYPASS_KEY, '1');
    notifyAuth();
  },
  async signOut() {
    if (MODE === 'demo') sessionStorage.removeItem(BYPASS_KEY);
    else (await supa()).auth.signOut();
    notifyAuth();
  },
  onChange(fn) {
    authListeners.add(fn);
    if (MODE === 'supabase') supa().then((c) => c.auth.onAuthStateChange(() => notifyAuth()));
    return () => authListeners.delete(fn);
  },
};

export function useAuth() {
  const [state, setState] = useState({ loading: true, user: null, approved: false });
  useEffect(() => {
    let on = true;
    const load = async () => {
      const user = await auth.getUser();
      const approved = await auth.isApproved(user);
      if (on) setState({ loading: false, user, approved });
    };
    load();
    const off = auth.onChange(load);
    return () => {
      on = false;
      off();
    };
  }, []);
  return state;
}

/* ============================================================
   PUBLIC-SITE HOOKS — read team-managed content with graceful
   fallbacks so the public site never renders empty.
   ============================================================ */
export function useNotice(fallback) {
  const rows = useTable('notices');
  const main = rows?.find((r) => r.id === 'main');
  if (!rows || !main) return fallback;
  return main.active ? main.message : null; // null = hide the bar
}

export function useRates(fallback) {
  const rows = useTable('rates');
  if (!rows || rows.length === 0) return fallback;
  return [...rows].sort((a, b) => (a.price || 0) - (b.price || 0));
}

export function useUpcomingEvents() {
  const rows = useTable('events');
  if (!rows) return [];
  const today = new Date().toISOString().slice(0, 10);
  return rows
    .filter((e) => e.published && e.starts_at && e.starts_at.slice(0, 10) >= today)
    .sort((a, b) => a.starts_at.localeCompare(b.starts_at));
}
