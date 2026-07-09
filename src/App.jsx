import { lazy, Suspense, useEffect } from 'react';
import { useRoute } from './lib/router.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Adopt from './pages/Adopt.jsx';
import About from './pages/About.jsx';
import Faq from './pages/Faq.jsx';
import Learn from './pages/Learn.jsx';
import Events from './pages/Events.jsx';
import Boarding from './pages/Boarding.jsx';
import GetInvolved from './pages/GetInvolved.jsx';
import FormsPage from './pages/FormsPage.jsx';

/* the volunteer portal loads only when someone opens it */
const TeamPortal = lazy(() => import('./pages/team/TeamPortal.jsx'));

const PAGES = {
  '/': Home,
  '/adopt': Adopt,
  '/learn': Learn,
  '/events': Events,
  '/boarding': Boarding,
  '/about': About,
  '/faq': Faq,
  '/get-involved': GetInvolved,
  '/forms': FormsPage,
};

export default function App() {
  const route = useRoute();
  const donate = route === '/donate';
  const team = route.startsWith('/team');
  const Page = donate ? Home : PAGES[route] || Home;

  useEffect(() => {
    if (donate) {
      requestAnimationFrame(() =>
        document.getElementById('donate')?.scrollIntoView({ behavior: 'auto' })
      );
    } else if (!team || route === '/team') {
      window.scrollTo(0, 0);
    }
  }, [route, donate, team]);

  if (team) {
    return (
      <Suspense
        fallback={
          <div className="team-login">
            <div className="team-login-card">
              <p className="team-login-sub">Opening the portal…</p>
            </div>
          </div>
        }
      >
        <TeamPortal route={route} />
      </Suspense>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Header route={route} />
      <main id="main" className="pagefade" key={donate ? '/' : route}>
        <Page />
      </main>
      <Footer />
    </>
  );
}
