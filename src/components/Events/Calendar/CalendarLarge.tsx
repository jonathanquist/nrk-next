import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarDay from './CalendarDay';
import FilterMenu from '../FilterMenu';
import EventBar from '../EventBar';
import WeekHeader from '../WeekHeader';
import { navButtons } from '../navButtons';
import { useSite } from '@/contexts/SiteContext';

export default function CalendarLarge() {
  const [eventID, setEventID] = useState<number | null>(null);
  const [currentDayEvents, setCurrentDayEvents] = useState<any[]>([]);
  const [dayInfo, setDayInfo] = useState({} as any);
  const [filtered, setFiltered] = useState<string[]>([]);

  const calendarRef = useRef<any>(null);

  const { events } = useSite();

  if (!events) {
    return <div>Loading...</div>;
  }

  const handleEventClick = (clickInfo: any) => {
    console.log('clickTest', clickInfo);
    const id = parseInt(clickInfo.event._def.publicId, 10);
    setEventID(id);
  };

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
    setCurrentDayEvents(clickedDateEvents);
    // return clickedDateEvents;
    // Now, you have an array of events for the clicked date (clickedDateEvents)
  };

  // const renderPost = () => {
  //   const blarg = events.events.find((event: any) => event.id === eventID);
  //   console.log('blarg', blarg);

  //   return (
  //     <div className="flex flex-col gap-2">
  //       {blarg.title}
  //       <p
  //         dangerouslySetInnerHTML={{ __html: blarg.description }}
  //         className="line-clamp-3 paragraph-s"
  //       />
  //     </div>
  //   );
  // };
  // console.log(events);

  const filteredEvents = {
    events: events.events.filter((event: any) => {
      return !filtered.includes(event.categories[0].slug);
    }),
  };

  return (
    <div className="relative">
      <FullCalendar
        ref={calendarRef}
        contentHeight="auto"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventClick={(info) => handleEventClick(info)}
        weekNumbers={true}
        firstDay={1}
        headerToolbar={{
          left: '',
          center: 'customPrevButton title customNextButton',
          right: '',
        }}
        customButtons={navButtons(calendarRef)}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        locale={'sv'}
        eventContent={(info) => EventBar({ info, size: 'lg' })}
        dayHeaderContent={(info) => WeekHeader(info)}
        events={filteredEvents.events.map((event: any) =>
          // console.log('event', event),
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
      {/* {eventID && renderPost()} */}
      {currentDayEvents.length > 0 && (
        <CalendarDay
          currentDayEvents={currentDayEvents}
          setCurrentDayEvents={setCurrentDayEvents}
          dayInfo={dayInfo}
        />
      )}
      <FilterMenu filtered={filtered} setFiltered={setFiltered} />
    </div>
  );
}
