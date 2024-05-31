import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useFetch from '@/hooks/useFetch';
import { cn, getEventColor } from '@/lib/utils';
import CalendarDay from './CalendarDay';
import FilterMenu from './FilterMenu';
import Filter from './Filter';

export default function CalendarWidget({ size = 'sm' }: { size?: string }) {
  const [eventID, setEventID] = useState<number | null>(null);
  const [currentDay, setCurrentDay] = useState<any[]>([]);
  const [dayInfo, setDayInfo] = useState({} as any);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<string[]>([]);

  const calendarRef = useRef<any>(null);

  const events: any = useFetch(
    'http://localhost/nrk/wp-json/tribe/events/v1/events'
  );

  if (!events) {
    return (
      <div className="w-full bg-primary-300 rounded-xl h-16 animate-pulse m-4" />
    );
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
    setCurrentDay(clickedDateEvents);
    // return clickedDateEvents;
    // Now, you have an array of events for the clicked date (clickedDateEvents)
  };

  const renderPost = () => {
    const blarg = events.events.find((event: any) => event.id === eventID);
    console.log('blarg', blarg);

    return (
      <div className="flex flex-col gap-2">
        {blarg.title}
        <p
          dangerouslySetInnerHTML={{ __html: blarg.description }}
          className="line-clamp-3 paragraph-s"
        />
      </div>
    );
  };

  console.log(dayInfo, currentDay);

  const renderEvent = (info: any) => {
    const category = info.event._def.extendedProps.category;
    return (
      <div className="fc-event-title px-1">
        <div
          className={cn(
            category === 'annat' ? 'text-accent-500' : 'text-primary-100',
            'px-2 py-1 rounded-md overflow-hidden font-cambria text-center'
          )}
          style={{ backgroundColor: getEventColor(category) }}
        >
          {category[0].toUpperCase()}
        </div>
      </div>
    );
  };

  const renderHeaderWeek = (info: any) => {
    return (
      <div className="fc-daygrid-day-number text-xl font-light">
        {info.text[0].toUpperCase()}
      </div>
    );
  };

  const customHeaderButtons = {
    customPrevButton: {
      text: '', // Set an empty string to hide the default text
      click: () => {
        {
          const calendarApi = calendarRef?.current?.getApi();
          calendarApi.prev();
        }
      },
      icon: 'custom',
    },
    customNextButton: {
      text: '', // Set an empty string to hide the default text
      click: () => {
        {
          const calendarApi = calendarRef?.current?.getApi();
          calendarApi.next();
        }
      },
      icon: 'custom',
    },
    customSettingsButton: {
      text: '', // Set an empty string to hide the default text
      click: () => {
        {
          console.log('test');
          setFilterOpen(true);
        }
      },
      icon: 'custom',
    },
  };

  const filteredEvents = {
    events: events.events.filter((event: any) => {
      // if (filtered.length === 0) {
      //   return true;
      // }
      return !filtered.includes(event.categories[0].slug);
    }),
  };

  if (size === 'lg') {
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
          customButtons={customHeaderButtons}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          locale={'sv'}
          eventContent={(info) => renderEvent(info)}
          dayHeaderContent={(info) => renderHeaderWeek(info)}
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
        {currentDay.length > 0 && (
          <CalendarDay
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
            dayInfo={dayInfo}
          />
        )}
        <Filter filtered={filtered} setFiltered={setFiltered} />
      </div>
    );
  }

  if (size === 'sm') {
    return (
      <>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          eventClick={(info) => handleEventClick(info)}
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
          eventContent={(info) => renderEvent(info)}
          dayHeaderContent={(info) => renderHeaderWeek(info)}
          events={events.events.map(
            (event: any) => (
              console.log('event', event),
              {
                title: event.title,
                start: new Date(event.start_date),
                end: new Date(event.end_date),
                id: event.id,
                category: event.categories[0].slug,
              }
            )
          )}
        />
      </>
    );
  }
}
