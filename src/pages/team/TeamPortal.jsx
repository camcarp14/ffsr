import { useState } from 'react';
import { MODE, auth, useAuth } from '../../lib/db.js';
import TeamShell from './TeamShell.jsx';

/* ============================================================
   TEAM PORTAL — /#/team
   Supabase mode: approved volunteers sign in with a magic link.
   Demo mode (no Supabase yet): a clearly-labeled bypass button.
   ============================================================ */

function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState(null);

  const magic = async (e) => {
    e.preventDefault();
    try {
      await auth.signInMagic(email.trim());
      setSent(true);
    } catch (ex) {
      setErr(ex.message);
    }
  };

  return (
    <div className="team-login">
      <div className="team-login-card">
        <img src="/logo-seal.svg" alt="" width="72" height="72" />
        <h1>Team portal</h1>
        <p className="team-login-sub">
          Where volunteers keep the site in sync with the sanctuary — birds,
          events, notices, and rates.
        </p>

        {MODE === 'supabase' ? (
          sent ? (
            <p className="team-login-ok">
              Check your email — your sign-in link is on its way. It'll bring
              you right back here.
            </p>
          ) : (
            <form className="team-login-form" onSubmit={magic}>
              <label className="fld">
                <span>Volunteer email</span>
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button className="btn btn-gold" type="submit">
                Email me a sign-in link
              </button>
              {err && <p className="team-login-err">{err}</p>}
              <p className="team-login-note">
                No password to remember. Access is limited to approved
                volunteers — ask the sanctuary to add your email to the list.
              </p>
            </form>
          )
        ) : (
          <div className="team-login-form">
            <button className="btn btn-gold" onClick={() => auth.bypass()}>
              Enter the portal — demo bypass
            </button>
            <p className="team-login-note">
              <strong>Demo mode:</strong> Supabase isn't connected yet, so
              there's no real login. Everything inside works — changes save to{' '}
              <em>this browser only</em>. When you're ready to launch, connect
              Supabase (instructions in Settings) and this screen becomes a
              magic-link sign-in for approved volunteers.
            </p>
          </div>
        )}

        <a className="team-login-back" href="#/">
          ← Back to the public site
        </a>
      </div>
    </div>
  );
}

function Pending() {
  return (
    <div className="team-login">
      <div className="team-login-card">
        <img src="/logo-seal.svg" alt="" width="72" height="72" />
        <h1>Almost there</h1>
        <p className="team-login-sub">
          You're signed in, but this email isn't on the approved volunteer
          list yet. Ask the sanctuary to add you — then refresh this page.
        </p>
        <button className="btn btn-line" onClick={() => auth.signOut()}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function TeamPortal({ route }) {
  const { loading, user, approved } = useAuth();

  if (loading) {
    return (
      <div className="team-login">
        <div className="team-login-card">
          <p className="team-login-sub">Opening the portal…</p>
        </div>
      </div>
    );
  }
  if (!user) return <Login />;
  if (!approved) return <Pending />;
  return <TeamShell route={route} user={user} />;
}
