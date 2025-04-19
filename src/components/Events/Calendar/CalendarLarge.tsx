import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarDay from "./CalendarDay";
import FilterMenu from "../FilterMenu";
import EventBar from "../EventBar";
import WeekHeader from "../WeekHeader";
import { navButtons } from "../navButtons";
import {
  eventsFilter,
  getDayEvents,
  getDayInfo,
  getEventCategory,
} from "@/lib/utils";
import { format } from "date-fns";
import { useEventSpan } from "@/hooks/useFetch";

export default function CalendarLarge() {
  // const [eventID, setEventID] = useState<number | null>(null);
  const [currentDayEvents, setCurrentDayEvents] = useState<any[]>([]);
  const [dayInfo, setDayInfo] = useState({} as any);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: format(new Date(), "yyyy-MM-01"),
    end: format(new Date(), "yyyy-MM-31"),
  });

  const calendarRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: eventsData, isLoading } = useEventSpan(
    dateRange.start,
    dateRange.end
  );

  const events = eventsData?.events || [];

  const handleEventClick = (clickInfo: any) => {
    const id = parseInt(clickInfo.event._def.publicId, 10);
    // setEventID(id);
  };

  const handleDateClick = (clickInfo: any) => {
    setDayInfo(getDayInfo(clickInfo));
    setCurrentDayEvents(getDayEvents(clickInfo, events));
  };

  const visibleEvents = eventsFilter(events, filtered);

  return (
    <div className="relative" ref={containerRef}>
      <FullCalendar
        ref={calendarRef}
        contentHeight="auto"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        themeSystem="none"
        initialView="dayGridMonth"
        eventClick={(info) => handleEventClick(info)}
        weekNumbers={true}
        firstDay={1}
        headerToolbar={{
          left: "",
          center: "customPrevButton title customNextButton",
          right: "",
        }}
        customButtons={navButtons(calendarRef, setDayInfo, setCurrentDayEvents)}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        locale={"sv"}
        eventContent={(info) => (
          <EventBar info={info} size="lg" isLoading={isLoading} />
        )}
        weekNumberContent={(info) => `Vecka ${info.num}`}
        dayHeaderContent={(info) => WeekHeader(info)}
        events={visibleEvents.map((event: any) => ({
          title: event.title,
          start: new Date(event.start_date),
          end: new Date(event.end_date),
          id: event.id,
          category: getEventCategory(event),
        }))}
        dateClick={(info) => handleDateClick(info)}
        datesSet={(info) => {
          setDateRange({
            start: format(info.start, "yyyy-MM-dd"),
            end: format(info.end, "yyyy-MM-dd"),
          });
        }}
      />

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
