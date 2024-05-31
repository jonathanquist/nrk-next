import React, { useState } from 'react';
import { useViewport } from '@/hooks/useViewport';

import Image from 'next/image';
import StandardImg from '../../../public/images/hero_img.jpg';
import CalendarWidget from './CalendarWidget';

export default function Calendar() {
  const { breakpoint } = useViewport();

  return (
    <>
      <div className="bg-accent-500 flex flex-col items-center justify-center shadow-md md:shadow-none">
        <div className="hidden md:flex justify-center items-end relative w-full h-80">
          <div className="bg-primary-100 bg-opacity-75 w-full max-w-xl py-6 relative z-10 mb-12 backdrop-blur-sm flex item-center justify-center">
            <h1>Kalender</h1>
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
        {/* <div className="w-full">
          <ul className="overflow-x-auto custom-scroll flex w-screen md:w-full justify-between text-primary-100 py-3.5 md:py-6 px-2.5 md:px-10 font-cambria small text-2xl">
            <li>December</li>
          </ul>
        </div> */}
      </div>
      <div className="calendar-big">
        <CalendarWidget size={'lg'} />
      </div>
    </>
  );
}
