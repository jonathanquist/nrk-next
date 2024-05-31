import Link from 'next/link';

import { cn, getEventColor } from '@/lib/utils';
import { IconClose } from '../UI';

interface CalendarDayProps {
  currentDay: any[];
  setCurrentDay: (value: any[]) => void;
  dayInfo: {
    x: number;
    y: number;
    date: number;
  };
}

export default function CalendarDay({
  currentDay,
  setCurrentDay,
  dayInfo,
}: CalendarDayProps) {
  console.log('1', currentDay, '2', setCurrentDay, '4', dayInfo);

  return (
    <div
      className="absolute rounded-xl font-cambria text-center z-50 overflow-hidden pt-2.5 w-64 px-6 pb-11 bg-primary-500 -translate-x-1/2 shadow-md flex flex-col"
      style={{ top: dayInfo.y, left: dayInfo.x }}
    >
      <div className="w-full flex justify-end">
        <button onClick={() => setCurrentDay([])}>
          <IconClose className="w-4 h-4" />
        </button>
      </div>
      <span className="bold uppercase font-fira mt-3 mb-2 text-xl">
        {dayInfo.date}
      </span>
      {currentDay.map((event: any, index: number) => (
        <div
          key={index}
          className="flex rounded-2xl p-1.5 gap-2.5 w-full mt-6 bg-primary-300 shadow-md"
        >
          <div
            key={index}
            className={cn(
              event.categories[0].slug === 'annat'
                ? 'text-accent-500'
                : 'text-primary-100',
              'flex justify-center items-center text-2xl w-8 font-bold shrink-0 rounded-l-xl'
            )}
            style={{ backgroundColor: getEventColor(event.categories[0].slug) }}
          >
            {event.categories[0].slug.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col w-full pr-2">
            <span className="font-bold text-left font-fira small text-lg line-clamp-2 ">
              {event.title}
            </span>
            <p
              dangerouslySetInnerHTML={{ __html: event.description }}
              className="line-clamp-2 paragraph-s text-left font-fira"
            />
            <div className="w-full flex justify-end">
              <Link
                href="#"
                className="font-bold text-left text-lg small font-fira "
              >
                Läs mer
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
