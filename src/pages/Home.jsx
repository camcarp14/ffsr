import Hero from '../components/sections/Hero.jsx';
import Mission from '../components/sections/Mission.jsx';
import Featured from '../components/sections/Featured.jsx';
import Reality from '../components/sections/Reality.jsx';
import Donate from '../components/sections/Donate.jsx';
import Visit from '../components/sections/Visit.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Featured />
      <Reality />
      <Donate />
      <Visit />
    </>
  );
}
