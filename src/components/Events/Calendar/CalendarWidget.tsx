import React from 'react';

import useFetch from '@/hooks/useFetch';
import CalendarSmall from './CalendarSmall';
import CalendarLarge from './CalendarLarge';

interface CalendarProps {
  size?: string;
}

export default function CalendarWidget({ size = 'sm' }: CalendarProps) {
  const events: any = useFetch(
    'http://localhost/nrk/wp-json/tribe/events/v1/events'
  );

  if (!events) {
    return (
      <div className="p-4 w-full h-64">
        <div className="w-full bg-primary-500 rounded-xl h-full animate-pulse" />
      </div>
    );
  }

  return (
    <>
      {size === 'lg' && <CalendarLarge events={events} />}
      {size === 'sm' && <CalendarSmall events={events} />}
    </>
  );
}
