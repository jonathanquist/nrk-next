import Link from 'next/link';
import React from 'react';

import CalendarWidget from '../Events/Calendar/CalendarWidget';
import { Button, IconArrowDouble } from '../UI';
import Loader from '../Loader/Loader';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

export default function WelcomeDesktop() {
  const { data: page, isLoading } = usePage(API.ALLMANT);

  if (isLoading) return <Loader />;

  const currentMonthName = format(new Date(), 'MMMM', { locale: sv });

  const title = page.title.rendered;

  return (
    <div className="w-full flex justify-between gap-10 items-stretch">
      {/* Blurb */}
      <div className="card-base card-px pt-16 pb-9  w-full flex flex-col gap-8  h-full lg:desktop">
        <h1 className="small">{title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
          className="mb-5 paragraph-lg wordpress-content"
        />
        <Link href="/ridskolan/kontakt" className="flex gap-4">
          <Button Icon={IconArrowDouble} iconClassName="rotate-90 h-5 w-5">
            Kontakta oss
          </Button>
        </Link>
      </div>

      {/* Calendar */}
      <div className="card-base card-px w-96 pt-16 pb-9 shrink-0 flex flex-col items-center justify-center">
        <div className="h-full w-full flex justify-between items-center gap-8 flex-col">
          <h1 className="small">{currentMonthName}</h1>
          <div className="calendar-small group calendar-no-toolbar overflow-hidden w-full h-full">
            <CalendarWidget />
          </div>
          <Link href="/aktiviteter/kalender">
            <Button Icon={IconArrowDouble} iconClassName="rotate-90 h-5 w-5">
              Se hela kalendern
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
