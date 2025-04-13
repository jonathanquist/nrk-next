import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import EventBar from "../EventBar";
import WeekHeader from "../WeekHeader";

import CalendarDayMobile from "./CalendarDayMobile";
import { navButtons } from "../navButtons";
import {
  eventsFilter,
  getDayEvents,
  getDayInfo,
  getEventCategory,
} from "@/lib/utils";
import { format } from "date-fns";
import { useEventSpan } from "@/hooks/useFetch";

export default function CalendarSmall() {
  const [currentDayEvents, setCurrentDayEvents] = useState<any[]>([]);
  const [dayInfo, setDayInfo] = useState({} as any);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: format(new Date(), "yyyy-MM-01"),
    end: format(new Date(), "yyyy-MM-31"),
  });

  const calendarRef = useRef<any>(null);

  const { data: eventsData, isLoading } = useEventSpan(
    dateRange.start,
    dateRange.end
  );

  const events = eventsData?.events || [];

  const handleDateClick = (clickInfo: any) => {
    setDayInfo(getDayInfo(clickInfo));
    setCurrentDayEvents(getDayEvents(clickInfo, events));
  };

  const visibleEvents = eventsFilter(events);

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        contentHeight="auto"
        initialView="dayGridMonth"
        firstDay={1}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        locale={"sv"}
        headerToolbar={{
          left: "",
          center: "customPrevButton title customNextButton",
          right: "",
        }}
        customButtons={navButtons(calendarRef, setDayInfo, setCurrentDayEvents)}
        eventContent={(info) => (
          <EventBar info={info} size="sm" isLoading={isLoading} />
        )}
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
        <CalendarDayMobile
          currentDayEvents={currentDayEvents}
          setCurrentDayEvents={setCurrentDayEvents}
          dayInfo={dayInfo}
        />
      )}
    </>
  );
}
