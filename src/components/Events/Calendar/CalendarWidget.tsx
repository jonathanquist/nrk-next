import React from 'react';

import CalendarSmall from './CalendarSmall';
import CalendarLarge from './CalendarLarge';

interface CalendarProps {
  size?: string;
}

export default function CalendarWidget({ size = 'sm' }: CalendarProps) {
  return (
    <>
      {size === 'lg' && <CalendarLarge />}
      {size === 'sm' && <CalendarSmall />}
    </>
  );
}
