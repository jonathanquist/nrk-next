import Featured from './Featured';
import Hero from './Hero';
import Welcome from './WelcomeDesktop';
import Posts from './Posts';
import Social from './Social';
import Sponsors from './Sponsors';
import { useViewport } from '@/hooks/useViewport';
import WelcomeDesktop from './WelcomeDesktop';
import WelcomeMobile from './WelcomeMobile';

export default function Homepage() {
  const { breakpoint } = useViewport();

  if (breakpoint === 'xl') {
    return (
      <>
        <Hero />
        <WelcomeDesktop />
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
      <div className="card-base w-full flex flex-col overflow-y-auto justify-start items-start h-full">
        <Hero />
        {/* <Welcome /> */}
        <WelcomeMobile />
      </div>
    );
  }
}
