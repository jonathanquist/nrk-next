import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventBar from '../EventBar';
import WeekHeader from '../WeekHeader';
import Loader from '@/components/Loader/Loader';
import { format } from 'date-fns';
import { useEventSpan } from '@/hooks/useFetch';

export default function ScheduleDaily() {
  const [date, setDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  const scheduleRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: eventsData, isLoading } = useEventSpan(date, date);

  const events = eventsData?.events || [];

  if (isLoading) return <Loader />;

  const filteredEvents = {
    events: events.filter((event: any) => {
      return event.categories.some(
        (category: any) => category.slug === 'bokning'
      );
    }),
  };

  return (
    <div className="relative card-base schedule-daily" ref={containerRef}>
      <FullCalendar
        ref={scheduleRef}
        contentHeight="auto"
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        slotMinTime="06:00:00"
        slotMaxTime="23:00:00"
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false, // Use 24-hour format for time labels
        }}
        allDaySlot={false}
        // eventClick={(info) => handleEventClick(info)}
        // weekNumbers={true}
        // firstDay={1}
        headerToolbar={{
          left: '',
          center: 'title',
          right: '',
        }}
        // customButtons={navButtons(scheduleRef, setDayInfo, setCurrentDayEvents)}
        // eventTimeFormat={{
        //   hour: '2-digit',
        //   minute: '2-digit',
        //   hour12: false,
        // }}
        locale={'sv'}
        eventContent={(info) => EventBar({ info, size: 'lg', isLoading })}
        dayHeaderContent={(info) => WeekHeader(info)}
        events={filteredEvents.events.map((event: any) => ({
          title: event.title,
          start: new Date(event.start_date),
          end: new Date(event.end_date),
          id: event.id,
          category: event.categories[0].slug,
        }))}
        // dateClick={(info) => handleDateClick(info)}
        // slotLabelContent={(arg) => {
        //   console.log(arg);
        //   if (arg.view.currentStart.getDay() === 1) {
        //     return {
        //       html: `<div>${arg.date.getHours()}</div>`,
        //     };
        //   } else {
        //     return null;
        //   }
        // }}
      />
      {/* {eventID && renderPost()} */}
      {/* {currentDayEvents.length > 0 && (
        <CalendarDay
          currentDayEvents={currentDayEvents}
          setCurrentDayEvents={setCurrentDayEvents}
          dayInfo={dayInfo}
          containerRef={scheduleRef}
        />
      )} */}
    </div>
  );
}
