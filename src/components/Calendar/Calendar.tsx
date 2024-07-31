'use client';

import React, { useEffect } from 'react';
import CalendarWidget from '../Events/Calendar/CalendarWidget';
import Header from '../Header';
import { useSite } from '@/contexts/SiteContext';

interface CalendarProps {
  page: any;
  events: any;
}

export default function Calendar({ page, events }: CalendarProps) {
  const { updateEvents } = useSite();

  // console.log('trig', events);

  useEffect(() => {
    console.log('Updating events', events);
    updateEvents(events);
  }, [updateEvents, events]);

  return (
    <div className="card-base h-full">
      <Header
        variant="menu"
        title={page[0].title.rendered}
        image={page[0]._embedded['wp:featuredmedia'][0].source_url}
      />
      <div className="calendar-large hidden md:block md:h-sm:block">
        <CalendarWidget size={'lg'} />
      </div>
      <div className="calendar-small md:hidden h-full pt-8">
        <CalendarWidget />
      </div>
    </div>
  );
}
