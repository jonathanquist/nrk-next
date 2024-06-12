import React from 'react';
import { useViewport } from '@/hooks/useViewport';

import CalendarWidget from '../Events/Calendar/CalendarWidget';
import Header from '../Header';

export default function Calendar() {
  return (
    <div className="card-base">
      <Header variant="menu" title="Kalender" />
      <div className="calendar-large">
        <CalendarWidget size={'lg'} />
      </div>
    </div>
  );
}
