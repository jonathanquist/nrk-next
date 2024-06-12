import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePost } from '@/contexts/PostContext';
import { useViewport } from '@/hooks/useViewport';

import PostList from './PostList';
import PostListMobile from './PostListMobile';
import Header from '../Header';
import { cn } from '@/lib/utils';

export default function Anslagstavlan() {
  const { updateCat, currentCat } = usePost();

  const categories = [
    { id: '', name: 'Alla' },
    { id: '8', name: 'Tävlingar' },
    { id: '7', name: 'Kurser' },
    { id: '9', name: 'Daglig Verksamhet' },
    { id: '10', name: 'Bus' },
  ];

  return (
    <div className="card-base h-full">
      <Header variant="menu" title="Anslagstavlan">
        <div className="w-full">
          <ul className="overflow-x-auto custom-scroll flex w-screen md:w-full justify-between text-primary-100 py-3.5 md:py-6 px-2.5 md:px-10 font-cambria small text-2xl">
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <li key={category.id}>
                  <button
                    onClick={() => updateCat(category.id)}
                    className={cn(
                      'px-3.5',
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
            {/* <li>
            <button onClick={() => updateTag('')}>Övrigt</button>
          </li> */}
          </ul>
        </div>
      </Header>

      <div className="card-px pt-8 pb-6 md:pb-12 md:pt-24 overflow-y-auto h-[calc(100%-3.75rem)] custom-scroll">
        <div className="hidden lg:flex">
          <PostList />
        </div>
        <div className="flex lg:hidden">
          <PostListMobile />
        </div>
      </div>
    </div>
  );
}
