import useFetch from '@/hooks/useFetch';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import { useViewport } from '@/hooks/useViewport';
import CalendarWidget from '../Events/Calendar/CalendarWidget';
import { IconArrowDouble, IconCall, IconSocialFacebook } from '../UI';

export default function WelcomeDesktop() {
  const [showCalendar, setShowCalendar] = useState(false);
  const { breakpoint } = useViewport();
  const page: any = useFetch(
    'http://localhost/nrk/wp-json/wp/v2/pages/?slug=allmant'
  );
  const calendar: any = useFetch(
    'http://localhost/nrk/wp-json/wp/v2/pages/?slug=calendarmini'
  );
  const pageMobile: any = useFetch(
    'http://localhost/nrk/wp-json/wp/v2/pages/?slug=allmant-mobile'
  );

  if (!page || !pageMobile) {
    return <div>Loading...</div>;
  }

  // console.log(page);
  return (
    <div className="w-full flex justify-between gap-10 items-stretch">
      {/* Blurb */}
      <div className="card-base card-px pt-16 pb-9  w-full flex flex-col gap-8  h-full md:desktop">
        <h1
          dangerouslySetInnerHTML={{ __html: page[0].title.rendered }}
          className="small"
        />
        <div
          dangerouslySetInnerHTML={{ __html: page[0].content.rendered }}
          className="mb-5 paragraph-l"
        />
        <Link href="/posts">
          <Button
            className=""
            size={'md'}
            icon={<IconArrowDouble className="rotate-90 h-5 w-5" />}
          >
            Kontakta Oss
          </Button>
        </Link>
      </div>

      {/* Calendar */}
      <div className="card-base card-px w-96 pt-16 pb-9 shrink-0 flex flex-col items-center justify-center">
        <div className="h-full w-full flex justify-between items-center gap-8 flex-col">
          {/* <div
            dangerouslySetInnerHTML={{ __html: calendar[0].content.rendered }}
            className="mb-5 paragraph-l"
          /> */}
          <div className="calendar-small overflow-hidden w-full h-full">
            <CalendarWidget />
          </div>
          <Link href="/aktiviteter/kalender">
            <Button
              className=""
              size={'md'}
              icon={<IconArrowDouble className="rotate-90 h-5 w-5" />}
            >
              Se hela kalendern
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
