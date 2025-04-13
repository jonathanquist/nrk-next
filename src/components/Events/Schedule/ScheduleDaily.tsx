import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions } from "@fullcalendar/core";
import EventBar from "../EventBar";
import Loader from "@/components/Loader/Loader";
import { format } from "date-fns";
import { useEventSpan } from "@/hooks/useFetch";
import { getDay } from "@/lib/utils";

export default function ScheduleDaily() {
  const date = format(new Date(), "yyyy-MM-dd");

  const containerRef = useRef<HTMLDivElement>(null);
  const { data: eventsData, isLoading } = useEventSpan(date, date);

  const events = eventsData?.events || [];

  if (isLoading) return <Loader />;

  const visibleEvents = events.filter((event: any) => {
    return event.categories.some(
      (category: any) => category.slug === "bokning"
    );
  });

  // (event: any) => event.venue.slug === "lilla-ridhuset"
  const leftColumnEvents = visibleEvents.filter((event: any) =>
    event.tags.some((tag: any) => tag.slug === "lilla")
  );

  // (event: any) => event.venue.slug === "stora-ridhuset"
  const rightColumnEvents = visibleEvents.filter((event: any) =>
    event.tags.some((tag: any) => tag.slug === "stora")
  );

  const columnProps: CalendarOptions = {
    contentHeight: "auto",
    plugins: [timeGridPlugin],
    initialView: "timeGridDay",
    slotMinTime: "06:00:00",
    slotMaxTime: "23:00:00",
    slotLabelFormat: {
      hour: "2-digit",
      minute: undefined,
      hour12: false,
    },
    allDaySlot: false,
    locale: "sv",
    eventContent: (info: any) => (
      <EventBar info={info} size="d" isLoading={isLoading} />
    ),
    headerToolbar: false,
    dayHeaderContent: false,
  };

  return (
    <div className="h-full">
      <h1 className="text-center small font-cambria font-bold">
        {getDay(date)}
      </h1>
      <div className="flex items-center pt-2 pb-3 shadow-md">
        <span className="w-1/2 text-center small font-cambria text-lg">
          Lilla Ridhuset
        </span>

        <span className="w-1/2 text-center small font-cambria text-lg">
          Stora Ridhuset
        </span>
      </div>
      <div
        className="relative schedule-daily flex h-[calc(100dvh-116px)] overflow-y-auto custom-scroll"
        ref={containerRef}
      >
        {/* Left Column */}
        <div className="w-1/2 schedule-daily-left">
          <FullCalendar
            events={leftColumnEvents.map((event: any) => ({
              title: event.title,
              start: new Date(event.start_date),
              end: new Date(event.end_date),
              id: event.id,
              tags: event.tags.map((tag: any) => tag.slug),
            }))}
            {...columnProps}
          />
        </div>

        {/* Right Column */}
        <div className="w-1/2 schedule-daily-right">
          <FullCalendar
            events={rightColumnEvents.map((event: any) => ({
              title: event.title,
              start: new Date(event.start_date),
              end: new Date(event.end_date),
              id: event.id,
              tags: event.tags.map((tag: any) => tag.slug),
            }))}
            {...columnProps}
          />
        </div>
      </div>
    </div>
  );
}
