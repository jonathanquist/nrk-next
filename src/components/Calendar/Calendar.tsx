import React from 'react';
import { useViewport } from '@/hooks/useViewport';

import CalendarWidget from '../Events/Calendar/CalendarWidget';
import Header from '../Header';

export default function Calendar() {
  const { breakpoint } = useViewport();

  return (
    <>
      <Header variant="menu" title="Kalender" />
      <div className="calendar-large">
        <CalendarWidget size={'lg'} />
      </div>
    </>
  );
}
