import React, { useState } from 'react';
import Link from 'next/link';
import CalendarWidget from '../Events/Calendar/CalendarWidget';
import { Button, IconCall, IconSocialFacebook } from '../UI';
import Loader from '../Loader/Loader';
import { API } from '@/lib/const';
import { usePage } from '@/hooks/useFetch';
import { sv } from 'date-fns/locale';
import { format } from 'date-fns';

export default function WelcomeMobile() {
  const [showCalendar, setShowCalendar] = useState(false);
  const { data: page, isLoading } = usePage(API.ALLMANT_MOBILE);

  if (isLoading) return <Loader />;

  const currentMonthName = format(new Date(), 'MMMM', { locale: sv });

  return (
    <div className="w-full flex flex-col pt-5 pb-8 px-6 h-full lg:desktop">
      {/* Header */}
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
          {/* <h1 className="small text-center pt-1.5">Kalender</h1> */}
          <h1 className="small text-center pt-1.5 capitalize">
            {currentMonthName}
          </h1>
          {showCalendar && (
            <div className="h-0.5 bg-primary-900 rounded-full w-5/6" />
          )}
        </button>
      </div>

      {/* Welcome text */}
      {!showCalendar ? (
        <div className="w-full flex justify-between items-center flex-col">
          <div className="paragraph-lg text-xl mb-8">
            <div
              dangerouslySetInnerHTML={{
                __html: page.content.rendered,
              }}
              className="mb-5 paragraph-lg text-xl"
            />
          </div>
          <Link href="tel:+4670882215" className="w-full">
            <Button
              className="justify-start rounded-xl text-base px-5 py-4 gap-5 mb-7 w-full"
              Icon={IconCall}
              iconClassName="h-9 w-9"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="font-light">Telefon</span>0481-162 48
              </div>
            </Button>
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=100080281802868"
            className="w-full"
          >
            <Button
              className="justify-start rounded-xl text-base px-5 py-4 gap-5 w-full"
              Icon={IconSocialFacebook}
              iconClassName="h-9 w-9"
            >
              Följ oss på Facebook
            </Button>
          </Link>
        </div>
      ) : (
        // Calendar
        <div className="w-full flex justify-between items-center flex-col h-full">
          <div className="calendar-small calendar-no-toolbar overflow-hidden w-full h-full">
            <CalendarWidget />
          </div>
        </div>
      )}
    </div>
  );
}
