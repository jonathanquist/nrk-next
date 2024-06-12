'use client';

import React, { useEffect } from 'react';
import CalendarWidget from '../Events/Calendar/CalendarWidget';
import Header from '../Header';
import { useSite } from '@/contexts/SiteContext';

interface CalendarProps {
  events: any;
}

export default function Calendar({ events }: CalendarProps) {
  const { updateEvents } = useSite();

  console.log('trig', events);

  useEffect(() => {
    console.log('Updating events', events);
    updateEvents(events);
  }, [updateEvents, events]);

  return (
    <div className="card-base">
      <Header variant="menu" title="Kalender" />
      <div className="calendar-large">
        <CalendarWidget size={'lg'} />
      </div>
    </div>
  );
}
