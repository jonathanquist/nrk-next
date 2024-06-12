import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePost } from '@/contexts/PostContext';
import { useViewport } from '@/hooks/useViewport';

import PostList from './PostList';
import PostListMobile from './PostListMobile';
import Header from '../Header';

export default function Anslagstavlan() {
  const params = useSearchParams();
  const [cat, setCat] = useState(params.get('cat') || '');
  const { breakpoint } = useViewport();
  const { updateCat, currentCat } = usePost();

  return (
    <>
      <Header variant="menu" title="Anslagstavlan">
        <div className="w-full">
          <ul className="overflow-x-auto custom-scroll flex w-screen md:w-full justify-between text-primary-100 py-3.5 md:py-6 px-2.5 md:px-10 font-cambria small text-2xl">
            <li>
              <button
                onClick={() => updateCat('')}
                className={`px-3.5 ${
                  !currentCat && 'underline underline-offset-4'
                }`}
              >
                Alla
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li>
              <button
                onClick={() => updateCat('8')}
                className={`px-3.5 ${
                  currentCat === '8' && 'underline underline-offset-4'
                }`}
              >
                Tävlingar
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li>
              <button
                onClick={() => updateCat('7')}
                className={`px-3.5 ${
                  currentCat === '7' && 'underline underline-offset-4'
                }`}
              >
                Kurser
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li className="whitespace-nowrap">
              <button
                onClick={() => updateCat('9')}
                className={`px-3.5 ${
                  currentCat === '9' && 'underline underline-offset-4'
                }`}
              >
                Daglig Verksamhet
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li>
              <button
                onClick={() => updateCat('10')}
                className={`px-3.5 ${
                  currentCat === '10' && 'underline underline-offset-4'
                }`}
              >
                Bus
              </button>
            </li>
            {/* <li>
            <button onClick={() => updateTag('')}>Övrigt</button>
          </li> */}
          </ul>
        </div>
      </Header>

      <div className="card-px pt-8 pb-6 md:pb-12 md:pt-24 overflow-y-auto h-[calc(100%-3.75rem)] custom-scroll">
        {breakpoint ? <PostList /> : <PostListMobile />}
      </div>
    </>
  );
}
