'use client';

import React, { useEffect } from 'react';
import CalendarWidget from '../Events/Calendar/CalendarWidget';
import Header from '../Header';
import { useSite } from '@/contexts/SiteContext';
import { useViewport } from '@/hooks/useViewport';

interface CalendarProps {
  page: any;
}

export default function Calendar({ page }: CalendarProps) {
  const { width } = useViewport();

  return (
    <div className="card-base h-full">
      <Header
        variant="menu"
        title={page.title.rendered}
        image={page._embedded['wp:featuredmedia'][0].source_url}
      />
      <div className="calendar-large hidden lg:block  lg:h-sm:block">
        {width > 1025 && <CalendarWidget size={'lg'} />}
      </div>
      <div className="calendar-small lg:hidden h-full">
        {width < 1024 && <CalendarWidget />}
      </div>
    </div>
  );
}
