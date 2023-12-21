import Featured from './Featured';
import Hero from './Hero';
import Welcome from './Welcome';
import Posts from './Posts';
import Social from './Social';
import Sponsors from './Sponsors';
import { useViewport } from '@/hooks/useViewport';
import WelcomeTemp from './WelcomeTemp';

export default function Homepage() {
  const { breakpoint } = useViewport();

  if (breakpoint) {
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
  } else {
    return (
      <div className="card-base flex flex-col overflow-y-auto justify-start items-start h-full">
        <Hero />
        {/* <Welcome /> */}
        <WelcomeTemp />
      </div>
    );
  }
}
