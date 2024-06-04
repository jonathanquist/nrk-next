import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useFetch from '@/hooks/useFetch';
import { cn, getEventColor } from '@/lib/utils';
import CalendarDay from './CalendarDay';
import FilterMenu from '../FilterMenu';
import EventBar from '../EventBar';
import WeekHeader from '../WeekHeader';

interface SmallCalendarProps {
  events: any;
}

export default function CalendarSmall({ events }: SmallCalendarProps) {
  const [currentDay, setCurrentDay] = useState<any[]>([]);
  const [dayInfo, setDayInfo] = useState({} as any);

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
    console.log(
      'Events for the clicked date:',
      clickedDateEvents,
      clickInfo.date.getDate(),
      clickInfo.dayEl.offsetTop,
      clickInfo.dayEl.offsetLeft
    );
    setDayInfo({
      y: clickInfo.dayEl.offsetTop + 132,
      x: clickInfo.dayEl.offsetLeft + clickInfo.dayEl.offsetWidth / 2,
      date: clickInfo.date.getDate(),
    });
    setCurrentDay(clickedDateEvents);
    // return clickedDateEvents;
    // Now, you have an array of events for the clicked date (clickedDateEvents)
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
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
