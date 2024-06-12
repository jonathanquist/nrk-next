'use client';

import React, { useEffect } from 'react';
import ScheduleWidget from '../Events/Schedule/ScheduleWidget';
import Header from '../Header';
import { useSite } from '@/contexts/SiteContext';

interface ScheduleProps {
  events: any;
}

export default function Schedule({ events }: ScheduleProps) {
  const { updateEvents } = useSite();

  useEffect(() => {
    updateEvents(events);
  }, [updateEvents, events]);

  return (
    <div className="card-base">
      <Header variant="menu" title="Schema" />
      <div className="schedule-large">
        <ScheduleWidget size={'lg'} />
      </div>
    </div>
  );
}
