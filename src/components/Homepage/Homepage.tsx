'use client';

import Hero from './Hero';
import Posts from './Posts';
import Social from './Social';
import Sponsors from './Sponsors';
import { useSite } from '@/contexts/SiteContext';
import WelcomeDesktop from './WelcomeDesktop';
import WelcomeMobile from './WelcomeMobile';
import { useEffect } from 'react';
import { Separator } from '../UI';
import { usePosts } from '@/hooks/useFetch';

export default function Homepage() {
  const { data: posts = [], isLoading } = usePosts(undefined, 1, 5);
  return (
    <>
      <div className="hidden lg:block h-full">
        <Hero posts={posts} isLoading={isLoading} />
        <WelcomeDesktop />
        <Posts posts={posts} isLoading={isLoading} />
        <div className="px-44 py-4">
          <Separator />
        </div>
        <Social />
        <Sponsors />
      </div>
      <div className="flex lg:hidden h-full w-full">
        <div className="card-base w-full flex flex-col overflow-y-auto justify-start items-start h-full">
          <Hero posts={posts} isLoading={isLoading} />
          <WelcomeMobile />
        </div>
      </div>
    </>
  );
}
