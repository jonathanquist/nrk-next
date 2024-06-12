'use client';

import Hero from './Hero';
import Posts from './Posts';
import Social from './Social';
import Sponsors from './Sponsors';
import { usePost } from '@/contexts/PostContext';
import { useViewport } from '@/hooks/useViewport';
import WelcomeDesktop from './WelcomeDesktop';
import WelcomeMobile from './WelcomeMobile';
import { useEffect } from 'react';

interface HomeProps {
  posts: any;
  pages: any;
}

export default function Homepage({ posts, pages }: HomeProps) {
  const { breakpoint } = useViewport();
  const { updatePosts, updatePages } = usePost();

  useEffect(() => {
    updatePosts(posts);
    updatePages(pages);
  }, [updatePages, updatePosts, posts, pages]);

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
