import Featured from './Featured';
import Hero from './Hero';
import Welcome from './Welcome';
import Posts from './Posts';
import Social from './Social';
import Sponsors from './Sponsors';

export default function Homepage() {
  return (
    <>
      <Hero />
      <Welcome />
      <Posts />
      <div className="px-44">
        <div className="h-1 w-full my-4 bg-primary-500" />
      </div>
      <Social />
      {/* <Featured /> */}
      <Sponsors />
    </>
  );
}
