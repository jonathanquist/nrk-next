import React, { useState } from 'react';
import { useViewport } from '@/hooks/useViewport';

import Image from 'next/image';
import StandardImg from '../../../public/images/hero_img.jpg';
import ScheduleWidget from '../Events/Schedule/ScheduleWidget';

export default function Schedule() {
  const { breakpoint } = useViewport();

  return (
    <>
      <div className="bg-accent-500 flex flex-col items-center justify-center shadow-md md:shadow-none">
        <div className="hidden md:flex justify-center items-end relative w-full h-80">
          <div className="bg-primary-100 bg-opacity-75 w-full max-w-xl py-6 relative z-10 mb-12 backdrop-blur-sm flex item-center justify-center">
            <h1>Schema</h1>
          </div>
          <Image
            src={StandardImg}
            alt="logo"
            sizes="100%"
            fill
            className="z-0 object-center object-cover"
          />
        </div>
      </div>
      <div className="schedule-big">
        <ScheduleWidget size={'lg'} />
      </div>
    </>
  );
}
