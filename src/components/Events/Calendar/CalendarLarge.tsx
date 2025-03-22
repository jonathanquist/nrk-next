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
import Loader from '@/components/Loader/Loader';
import { getDayEvents, getDayInfo } from '@/lib/utils';

export default function CalendarLarge() {
  const [eventID, setEventID] = useState<number | null>(null);
  const [currentDayEvents, setCurrentDayEvents] = useState<any[]>([]);
  const [dayInfo, setDayInfo] = useState({} as any);
  const [filtered, setFiltered] = useState<string[]>([]);

  const calendarRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { events } = useSite();

  if (!events) return <Loader />;

  const handleEventClick = (clickInfo: any) => {
    console.log('clickTest', clickInfo);
    const id = parseInt(clickInfo.event._def.publicId, 10);
    setEventID(id);
  };

  const handleDateClick = (clickInfo: any) => {
    setDayInfo(getDayInfo(clickInfo));
    setCurrentDayEvents(getDayEvents(clickInfo, events));
  };

  const filteredEvents = {
    events: events.events.filter((event: any) => {
      return !filtered.includes(event.categories[0].slug);
    }),
  };

  return (
    <div className="relative" ref={containerRef}>
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
          containerRef={containerRef}
        />
      )}
      <FilterMenu filtered={filtered} setFiltered={setFiltered} />
    </div>
  );
}
