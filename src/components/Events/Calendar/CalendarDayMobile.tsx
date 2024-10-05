import Link from 'next/link';

import { cn, decodeHtmlEntities, getEventColor } from '@/lib/utils';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../UI';
import { useState } from 'react';
import { EventMobile } from '../EventMobile';

interface CalendarDayMobileProps {
  currentDayEvents: any[];
  setCurrentDayEvents: (value: any[]) => void;
  dayInfo: {
    x: number;
    y: number;
    date: number;
  };
}

export default function CalendarDayMobile({
  currentDayEvents,
  setCurrentDayEvents,
  dayInfo,
}: CalendarDayMobileProps) {
  const [focusedEvent, setFocusedEvent] = useState<any>(null);

  return (
    <Dialog
      open={!!currentDayEvents}
      onOpenChange={() => {
        setCurrentDayEvents([]);
        setFocusedEvent(null);
      }}
    >
      <DialogTrigger asChild>
        <button style={{ display: 'none' }}></button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dayInfo.date}</DialogTitle>
        </DialogHeader>
        <div className="h-96 overflow-y-auto custom-scroll">
          {!focusedEvent &&
            currentDayEvents.map((event: any, index: number) => (
              <button
                onClick={() => setFocusedEvent(event)}
                key={index}
                className="h-fit w-full"
              >
                <div className="group flex rounded-2xl p-1.5 gap-2.5 w-full mt-6 bg-primary-100 shadow-md">
                  <div
                    className={cn(
                      event.categories[0].slug === 'annat'
                        ? 'text-accent-500'
                        : 'text-primary-100',
                      'flex justify-center items-center text-2xl w-8 font-bold shrink-0 rounded-l-xl'
                    )}
                    style={{
                      backgroundColor: getEventColor(event.categories[0].slug),
                    }}
                  >
                    {event.categories[0].slug.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col w-full pr-2">
                    <span className="font-bold text-left font-fira small text-lg line-clamp-2 ">
                      {decodeHtmlEntities(event.title)}
                    </span>
                    <p
                      dangerouslySetInnerHTML={{ __html: event.description }}
                      className="paragraph-sm text-left font-fira"
                    />
                    <div className="w-full flex justify-end">
                      <span className="font-bold text-left text-lg small font-fira text-primary-900 underline-offset-4 group-hover:underline">
                        Läs mer
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          {focusedEvent && (
            <EventMobile info={focusedEvent} action={setFocusedEvent} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
