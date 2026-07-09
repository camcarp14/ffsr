import Hero from '../components/sections/Hero.jsx';
import Landings from '../components/sections/Landings.jsx';
import Mission from '../components/sections/Mission.jsx';
import Featured from '../components/sections/Featured.jsx';
import Promise from '../components/sections/Promise.jsx';
import Donate from '../components/sections/Donate.jsx';
import Visit from '../components/sections/Visit.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Landings />
      <Mission />
      <Featured />
      <Promise />
      <Donate />
      <Visit />
    </>
  );
}
