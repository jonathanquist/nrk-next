import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import EventBar from '../EventBar';
import WeekHeader from '../WeekHeader';
import { useSite } from '@/contexts/SiteContext';

import CalendarDayMobile from './CalendarDayMobile';
import { navButtons } from '../navButtons';
import Loader from '@/components/Loader/Loader';
import { getDayEvents, getDayInfo } from '@/lib/utils';

export default function CalendarSmall() {
  // const [currentDay, setCurrentDay] = useState<any[]>([])
  const [currentDayEvents, setCurrentDayEvents] = useState<any[]>([]);
  const [dayInfo, setDayInfo] = useState({} as any);

  const calendarRef = useRef<any>(null);
  const { events } = useSite();

  if (!events) return <Loader />;

  const handleDateClick = (clickInfo: any) => {
    setDayInfo(getDayInfo(clickInfo));
    setCurrentDayEvents(getDayEvents(clickInfo, events));
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
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
          center: 'customPrevButton title customNextButton',
          right: '',
        }}
        customButtons={navButtons(calendarRef)}
        eventContent={(info) => EventBar({ info, size: 'sm' })}
        dayHeaderContent={(info) => WeekHeader(info)}
        events={events.events.map((event: any) => ({
          title: event.title,
          start: new Date(event.start_date),
          end: new Date(event.end_date),
          id: event.id,
          category: event.categories[0].slug,
        }))}
        dateClick={(info) => handleDateClick(info)}
      />
      {currentDayEvents.length > 0 && (
        <CalendarDayMobile
          currentDayEvents={currentDayEvents}
          setCurrentDayEvents={setCurrentDayEvents}
          dayInfo={dayInfo}
        />
      )}
    </>
  );
}
