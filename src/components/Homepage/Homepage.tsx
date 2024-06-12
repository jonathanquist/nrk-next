'use client';

import Hero from './Hero';
import Posts from './Posts';
import Social from './Social';
import Sponsors from './Sponsors';
import { useSite } from '@/contexts/SiteContext';
import WelcomeDesktop from './WelcomeDesktop';
import WelcomeMobile from './WelcomeMobile';
import { useEffect } from 'react';

interface HomeProps {
  posts: any;
  pages: any;
  events: any;
}

export default function Homepage({ posts, pages, events }: HomeProps) {
  const { updatePosts, updatePages, updateEvents } = useSite();

  useEffect(() => {
    updatePosts(posts);
    updatePages(pages);
    updateEvents(events);
  }, [updatePages, updatePosts, updateEvents, posts, pages, events]);

  return (
    <>
      <div className="hidden lg:block h-full">
        <Hero />
        <WelcomeDesktop />
        <Posts />
        <div className="px-44">
          <div className="h-1 w-full my-4 bg-primary-500" />
        </div>
        <Social />

        <Sponsors />
      </div>
      <div className="flex lg:hidden h-full">
        <div className="card-base w-full flex flex-col overflow-y-auto justify-start items-start h-full">
          <Hero />

          <WelcomeMobile />
        </div>
      </div>
    </>
  );
}
