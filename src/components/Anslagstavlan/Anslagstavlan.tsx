'use client';

import React from 'react';
import PostList from './PostList';
import PostListMobile from './PostListMobile';
import Header from '../Header';

import { useSite } from '@/contexts/SiteContext';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks/useViewport';
import { categories } from '@/lib/const';

interface AnsalgstavlanProps {
  page: any;
}

export default function Anslagstavlan({ page }: AnsalgstavlanProps) {
  const { currentCat, updateCurrentCat } = useSite();
  const { width } = useViewport();

  const handleClick = (id: string) => {
    updateCurrentCat(id);
  };

  return (
    <div className="card-base h-full">
      <Header
        variant="menu"
        title={page.title.rendered}
        image={page._embedded['wp:featuredmedia'][0].source_url}
      >
        <div className="w-full">
          <ul className="overflow-x-auto custom-scroll flex w-screen h-sm:w-[calc(100vw-140px)] lg:w-full justify-between text-primary-100 py-3.5 lg:py-6 px-2.5 lg:px-10 font-cambria small text-2xl">
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <li key={category.id}>
                  <button
                    onClick={() => handleClick(category.id)}
                    className={cn(
                      'px-3.5 whitespace-nowrap',
                      currentCat === category.id &&
                        'underline underline-offset-4'
                    )}
                  >
                    {category.name}
                  </button>
                </li>
                {index < categories.length - 1 && (
                  <li>
                    <div className="bg-primary-100 w-0.5 rounded-full h-full" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </Header>

      <div className="card-px pt-8 pb-6 lg:pb-12 lg:pt-24 overflow-y-auto h-[calc(100%-3.75rem)] custom-scroll">
        <div className="flex">
          {width > 1024 && <PostList />}
          {width < 1024 && <PostListMobile />}
        </div>
      </div>
    </div>
  );
}
