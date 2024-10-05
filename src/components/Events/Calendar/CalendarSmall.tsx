import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import EventBar from '../EventBar';
import WeekHeader from '../WeekHeader';
import { useSite } from '@/contexts/SiteContext';

import CalendarDayMobile from './CalendarDayMobile';

export default function CalendarSmall() {
  // const [currentDay, setCurrentDay] = useState<any[]>([])
  const [currentDayEvents, setCurrentDayEvents] = useState<any[]>([]);
  const [dayInfo, setDayInfo] = useState({} as any);

  const { events } = useSite();

  if (!events) {
    return <div>Loading...</div>;
  }

  const handleDateClick = (clickInfo: any) => {
    const clickedDateStart = new Date(clickInfo.date);
    clickedDateStart.setHours(0, 0, 0, 0);

    // Set the time of the clicked date to the end of the day
    const clickedDateEnd = new Date(clickInfo.date);
    clickedDateEnd.setHours(23, 59, 59, 999);

    const clickedDateEvents = events.events.filter((event: any) => {
      const eventStartDate = new Date(event.start_date);
      const eventEndDate = new Date(event.end_date);

      // Check if the clicked date is within the entire day of the event
      return (
        eventStartDate <= clickedDateEnd && clickedDateStart <= eventEndDate
      );
    });
    setDayInfo({
      y: clickInfo.dayEl.offsetTop + 132,
      x: clickInfo.dayEl.offsetLeft + clickInfo.dayEl.offsetWidth / 2,
      date: clickInfo.date.getDate(),
    });
    setCurrentDayEvents(clickedDateEvents);
  };

  return (
    <>
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
