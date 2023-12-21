import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePost } from '@/hooks/PostContext';
import { useViewport } from '@/hooks/useViewport';

import Image from 'next/image';
import PostList from './PostList';
import PostListMobile from './PostListMobile';
import StandardImg from '../../../public/images/hero_img.jpg';

export default function Anslagstavlan() {
  const params = useSearchParams();
  const [cat, setCat] = useState(params.get('cat') || '');
  const { breakpoint } = useViewport();
  const { updateCat, currentCat } = usePost();

  //console.log('hate', params, params.get('tag'), tag);

  return (
    <>
      <div className="bg-accent-500 flex flex-col items-center justify-center overflow-x-hidden shadow-md md:shadow-none">
        <div className="hidden md:flex justify-center items-end relative w-full h-80">
          <div className="bg-primary-100 bg-opacity-75 w-full max-w-xl py-6 relative z-10 mb-12 backdrop-blur-sm flex item-center justify-center">
            <h1>Anslagstavlan</h1>
          </div>
          {/* <Image
            src={StandardImg}
            alt="featured"
            sizes="100%"
            fill
            className="object-center object-cover"
          /> */}
          <Image
            src={StandardImg}
            alt="logo"
            sizes="100%"
            fill
            className="z-0 object-center object-cover"
          />
        </div>
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
      </div>
      <div className="card-px pt-8 pb-6 md:pb-12 md:pt-24 overflow-y-auto h-[calc(100%-3.75rem)] custom-scroll">
        {breakpoint ? <PostList /> : <PostListMobile />}
      </div>
    </>
  );
}
