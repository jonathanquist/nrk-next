import React, { useState } from 'react';
import PostList from './PostList';
import StandardImg from '../../../public/images/hero_img.jpg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { usePost } from '@/hooks/PostContext';

export default function Anslagstavlan() {
  const params = useSearchParams();
  const [tag, setTag] = useState(params.get('tag') || '');
  const { updateTag, currentTag } = usePost();

  //console.log('hate', params, params.get('tag'), tag);

  return (
    <>
      <div className="bg-accent-500 flex flex-col items-center justify-center">
        <div className="flex justify-center items-end relative w-full h-80">
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
        <div className="card-px w-full">
          <ul className="flex w-full justify-between text-primary-100 py-6 px-10 font-cambria small text-2xl">
            <li>
              <button
                onClick={() => updateTag('')}
                className={`${!currentTag && 'underline underline-offset-4'}`}
              >
                Alla
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li>
              <button
                onClick={() => updateTag('3')}
                className={`${
                  currentTag === '3' && 'underline underline-offset-4'
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
                onClick={() => updateTag('6')}
                className={`${
                  currentTag === '6' && 'underline underline-offset-4'
                }`}
              >
                Kurser
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li>
              <button
                onClick={() => updateTag('4')}
                className={`${
                  currentTag === '4' && 'underline underline-offset-4'
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
                onClick={() => updateTag('5')}
                className={`${
                  currentTag === '5' && 'underline underline-offset-4'
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
      <div className="card-px pb-12 pt-24">
        <PostList />
      </div>
    </>
  );
}
