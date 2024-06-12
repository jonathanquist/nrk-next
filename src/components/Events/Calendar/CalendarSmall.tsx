import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import EventBar from '../EventBar';
import WeekHeader from '../WeekHeader';
import { useSite } from '@/contexts/SiteContext';

export default function CalendarSmall() {
  // const [currentDay, setCurrentDay] = useState<any[]>([]);
  // const [dayInfo, setDayInfo] = useState({} as any);

  const { events } = useSite();

  const handleDateClick = (clickInfo: any) => {
    console.log('hi', clickInfo);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      contentHeight="auto"
      initialView="dayGridMonth"
      firstDay={1}
      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }}
      locale={'sv'}
      headerToolbar={{
        left: '',
        center: '',
        right: '',
      }}
      eventContent={(info) => EventBar({ info, size: 'sm' })}
      dayHeaderContent={(info) => WeekHeader(info)}
      events={events.events.map((event: any) =>
        //console.log('event', event),
        ({
          title: event.title,
          start: new Date(event.start_date),
          end: new Date(event.end_date),
          id: event.id,
          category: event.categories[0].slug,
        })
      )}
      dateClick={(info) => handleDateClick(info)}
    />
  );
}
