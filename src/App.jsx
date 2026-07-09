import Header from './components/Header.jsx';
import Hero from './components/sections/Hero.jsx';
import Landings from './components/sections/Landings.jsx';
import Mission from './components/sections/Mission.jsx';
import Flock from './components/sections/Flock.jsx';
import Promise from './components/sections/Promise.jsx';
import Donate from './components/sections/Donate.jsx';
import Involved from './components/sections/Involved.jsx';
import Visit from './components/sections/Visit.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <Landings />
        <Mission />
        <Flock />
        <Promise />
        <Donate />
        <Involved />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
