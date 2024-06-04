import useFetch from '@/hooks/useFetch';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import { useViewport } from '@/hooks/useViewport';
import CalendarWidget from '../Events/Calendar/CalendarWidget';
import { IconArrowDouble, IconCall, IconSocialFacebook } from '../UI';

export default function WelcomeMobile() {
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

  if (breakpoint) {
    return (
      <div className="w-full flex justify-between gap-10 items-stretch">
        <div className="card-base card-px w-full flex flex-col gap-8 pt-16 pb-9 h-full md:desktop">
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
        <div className="card-base w-96 flex flex-col items-center justify-center">
          <div className="h-full w-full flex justify-between items-center pt-16 pb-9 flex-col">
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
  } else {
    // console.log(page);
    return (
      <div className="w-full flex flex-col pt-5 pb-8 px-6 h-full md:desktop">
        {/* <h1
          dangerouslySetInnerHTML={{ __html: pageMobile[0].title.rendered }}
          className="small"
        />
        <div
          dangerouslySetInnerHTML={{ __html: pageMobile[0].content.rendered }}
          className="mb-5 paragraph-l text-xl"
        /> */}
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
                Välkommen till denna pärla i Glasrikets östra del. Nybro
                Ridklubb har lärt ut ridsportens ädla konst sedan 1958.
              </p>
            </div>
            <Link href="tel:+4670882215" className="w-full">
              <Button
                className="justify-start rounded-xl text-base px-5 py-4 gap-5 mb-7 w-full"
                icon={<IconCall className="h-9 w-9" />}
              >
                <div className="flex flex-col items-start leading-none">
                  <span className="font-light">Telefon</span>0481-162 48
                </div>
              </Button>
            </Link>

            <Button
              className="justify-start rounded-xl text-base px-5 py-4 gap-5 w-full"
              icon={<IconSocialFacebook className=" h-9 w-9" />}
            >
              Följ oss på Facebook
            </Button>
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
}
