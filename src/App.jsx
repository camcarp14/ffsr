import { useEffect } from 'react';
import { useRoute } from './lib/router.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Adopt from './pages/Adopt.jsx';
import About from './pages/About.jsx';
import Faq from './pages/Faq.jsx';
import Learn from './pages/Learn.jsx';
import GetInvolved from './pages/GetInvolved.jsx';
import FormsPage from './pages/FormsPage.jsx';

const PAGES = {
  '/': Home,
  '/adopt': Adopt,
  '/learn': Learn,
  '/about': About,
  '/faq': Faq,
  '/get-involved': GetInvolved,
  '/forms': FormsPage,
};

export default function App() {
  const route = useRoute();
  const donate = route === '/donate';
  const Page = donate ? Home : PAGES[route] || Home;

  useEffect(() => {
    if (donate) {
      requestAnimationFrame(() =>
        document.getElementById('donate')?.scrollIntoView({ behavior: 'auto' })
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, [route, donate]);

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
