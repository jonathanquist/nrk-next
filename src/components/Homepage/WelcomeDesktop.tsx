import Link from 'next/link';
import React from 'react';

import CalendarWidget from '../Events/Calendar/CalendarWidget';
import { ButtonOld, IconArrowDouble } from '../UI';
import { useSite } from '@/contexts/SiteContext';
import Loader from '../Loader/Loader';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';

export default function WelcomeDesktop() {
  const { data: page, isLoading } = usePage(API.ALLMANT);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex justify-between gap-10 items-stretch">
      {/* Blurb */}
      <div className="card-base card-px pt-16 pb-9  w-full flex flex-col gap-8  h-full lg:desktop">
        <h1
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          className="small"
        />
        <div
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
          className="mb-5 paragraph-lg wordpress-content"
        />
        <Link href="/ridskolan/kontakt">
          <ButtonOld
            className=""
            size={'md'}
            icon={<IconArrowDouble className="rotate-90 h-5 w-5" />}
          >
            Kontakta Oss
          </ButtonOld>
        </Link>
      </div>

      {/* Calendar */}
      <div className="card-base card-px w-96 pt-16 pb-9 shrink-0 flex flex-col items-center justify-center">
        <div className="h-full w-full flex justify-between items-center gap-8 flex-col">
          <div className="calendar-small calendar-no-toolbar overflow-hidden w-full h-full">
            <CalendarWidget />
          </div>
          <Link href="/aktiviteter/kalender">
            <ButtonOld
              className=""
              size={'md'}
              icon={<IconArrowDouble className="rotate-90 h-5 w-5" />}
            >
              Se hela kalendern
            </ButtonOld>
          </Link>
        </div>
      </div>
    </div>
  );
}
