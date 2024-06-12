import Link from 'next/link';
import React, { useState } from 'react';

import CalendarWidget from '../Events/Calendar/CalendarWidget';
import {
  ButtonOld,
  IconArrowDouble,
  IconCall,
  IconSocialFacebook,
} from '../UI';
import { useSite } from '@/contexts/SiteContext';

export default function WelcomeMobile() {
  const [showCalendar, setShowCalendar] = useState(false);
  const { pages } = useSite();

  if (!pages) {
    return <div>Loading...</div>;
  }

  // console.log(page);
  return (
    <div className="w-full flex flex-col pt-5 pb-8 px-6 h-full md:desktop">
      <h1
        dangerouslySetInnerHTML={{
          __html: pages['allmant-mobile'].title.rendered,
        }}
        className="small"
      />
      <div
        dangerouslySetInnerHTML={{
          __html: pages['allmant-mobile'].content.rendered,
        }}
        className="mb-5 paragraph-l text-xl"
      />
      <div className="flex justify-between items-start mb-8">
        <button
          onClick={() => setShowCalendar(false)}
          className="w-full py-1 flex flex-col items-center"
        >
          <h1 className="small text-center pt-1.5">Allmänt</h1>
          {!showCalendar && (
            <div className="h-0.5 bg-primary-900 rounded-full w-5/6" />
          )}
        </button>
        <div className="h-full bg-accent-500 rounded-full w-1" />
        <button
          onClick={() => setShowCalendar(true)}
          className="w-full py-1 flex flex-col items-center"
        >
          <h1 className="small text-center pt-1.5">Kalender</h1>
          {showCalendar && (
            <div className="h-0.5 bg-primary-900 rounded-full w-5/6" />
          )}
        </button>
      </div>
      {!showCalendar ? (
        <div className="w-full flex justify-between items-center flex-col">
          <div className="paragraph-l text-xl mb-16">
            <p>
              Välkommen till denna pärla i Glasrikets östra del. Nybro Ridklubb
              har lärt ut ridsportens ädla konst sedan 1958.
            </p>
          </div>
          <Link href="tel:+4670882215" className="w-full">
            <ButtonOld
              className="justify-start rounded-xl text-base px-5 py-4 gap-5 mb-7 w-full"
              icon={<IconCall className="h-9 w-9" />}
            >
              <div className="flex flex-col items-start leading-none">
                <span className="font-light">Telefon</span>0481-162 48
              </div>
            </ButtonOld>
          </Link>

          <ButtonOld
            className="justify-start rounded-xl text-base px-5 py-4 gap-5 w-full"
            icon={<IconSocialFacebook className=" h-9 w-9" />}
          >
            Följ oss på Facebook
          </ButtonOld>
        </div>
      ) : (
        <div className="w-full flex justify-between items-center flex-col h-full">
          {/* <div
              dangerouslySetInnerHTML={{
                __html: calendar[0].content.rendered,
              }}
              className="flex justify-center h-full items-center"
            /> */}
          <div className="calendar-small overflow-hidden w-full h-full">
            <CalendarWidget />
          </div>
        </div>
      )}
    </div>
  );
}
