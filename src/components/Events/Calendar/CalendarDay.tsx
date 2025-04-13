import Link from "next/link";

import {
  cn,
  decodeHtmlEntities,
  eventsFilter,
  getDay,
  getEventCategory,
  getEventColor,
} from "@/lib/utils";
import { IconClose } from "../../UI";
import { EventDialog } from "../EventDialog";

interface CalendarDayProps {
  currentDayEvents: any[];
  setCurrentDayEvents: (value: any[]) => void;
  dayInfo: {
    x: number;
    y: number;
    date: string;
  };
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function CalendarDay({
  currentDayEvents,
  setCurrentDayEvents,
  dayInfo,
  containerRef,
}: CalendarDayProps) {
  // Calculate adjusted left position
  const calculateLeftPosition = () => {
    const container = containerRef.current;
    if (!container) return dayInfo.x;

    const containerRect = container.getBoundingClientRect();
    const modalWidth = 288; // Width of the modal (w-64 in Tailwind = 16rem = 256px)
    const padding = 6; // Add some padding to avoid touching the edges

    let left = dayInfo.x;

    // Prevent overflow on the left
    if (left - modalWidth / 2 < containerRect.left + padding) {
      left = containerRect.left + padding + modalWidth / 2;
    }

    // Prevent overflow on the right
    if (left + modalWidth / 2 > containerRect.right - padding) {
      left = containerRect.right - padding - modalWidth / 2;
    }

    return left;
  };

  const visibleEvents = eventsFilter(currentDayEvents);

  return (
    <div
      className={cn(
        "absolute rounded-xl font-cambria text-center z-50 overflow-hidden pt-2.5 w-72 px-6 pb-11 bg-primary-500 -translate-x-1/2 shadow-md flex flex-col"
      )}
      style={{ top: dayInfo.y + 6, left: calculateLeftPosition() }}
    >
      <div className="w-full flex justify-end">
        <button onClick={() => setCurrentDayEvents([])}>
          <IconClose className="w-4 h-4 hover:opacity-80" />
        </button>
      </div>
      <span className="bold font-cambria small font-semibold mt-[3px] pl-0.5 mb-2 text-xl">
        {getDay(dayInfo.date)}
      </span>
      {visibleEvents.map((event: any, index: number) => {
        const category = getEventCategory(event);
        return (
          <EventDialog key={index} info={event}>
            <div className="group flex rounded-2xl p-1.5 gap-2.5 w-full mt-6 bg-primary-300 shadow-md">
              <div
                className={cn(
                  category === "annat" ? "text-accent-500" : "text-primary-100",
                  "flex justify-center items-center text-2xl w-8 font-bold shrink-0 rounded-l-xl"
                )}
                style={{
                  backgroundColor: getEventColor(category),
                }}
              >
                {category.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col w-full pr-2 py-1">
                <span className="font-bold text-left font-fira small text-lg line-clamp-2 leading-tight">
                  {decodeHtmlEntities(event.title)}
                </span>
                <p
                  dangerouslySetInnerHTML={{ __html: event.description }}
                  className="paragraph-sm text-left font-fira line-clamp-2"
                />
                <div className="w-full flex justify-end">
                  <span className="font-bold text-left text-lg small font-fira text-primary-900 underline-offset-4 group-hover:underline">
                    Läs mer
                  </span>
                </div>
              </div>
            </div>
          </EventDialog>
        );
      })}
    </div>
  );
}
