import React, { useState } from 'react';
import PostList from './PostList';
import StandardImg from '../../../public/images/hero_img.jpg';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function Anslagstavlan() {
  const params = useSearchParams();
  const [tag, setTag] = useState(params.get('tag') || '');

  //console.log('hate', params, params.get('tag'), tag);

  return (
    <div>
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
                onClick={() => setTag('')}
                className={`${!tag && 'underline underline-offset-4'}`}
              >
                Alla
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li>
              <button
                onClick={() => setTag('3')}
                className={`${tag === '3' && 'underline underline-offset-4'}`}
              >
                Tävlingar
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li>
              <button
                onClick={() => setTag('6')}
                className={`${tag === '6' && 'underline underline-offset-4'}`}
              >
                Kurser
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li>
              <button
                onClick={() => setTag('4')}
                className={`${tag === '4' && 'underline underline-offset-4'}`}
              >
                Daglig Verksamhet
              </button>
            </li>
            <li>
              <div className="bg-primary-100 w-0.5 rounded-full h-full" />
            </li>
            <li>
              <button
                onClick={() => setTag('5')}
                className={`${tag === '5' && 'underline underline-offset-4'}`}
              >
                Bus
              </button>
            </li>
            {/* <li>
            <button onClick={() => setTag('')}>Övrigt</button>
          </li> */}
          </ul>
        </div>
      </div>
      <div className="card-px pb-12 pt-24">
        <PostList tag={tag} />
      </div>
    </div>
  );
}
