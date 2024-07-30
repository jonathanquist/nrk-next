import React, { useEffect, useState } from 'react';
import { getWeek, set } from 'date-fns';
import { IconBack, IconNext } from '../../UI';
import Filter from '../FilterMenu';
import { useSite } from '@/contexts/SiteContext';

export default function ScheduleDaily({ size = 'sm' }: { size?: string }) {
  const [week, setWeek] = useState(getWeek(new Date()));
  const [scheduleItems, setScheduleItems] = useState<any>(null);
  const [filtered, setFiltered] = useState<string[]>([]);

  const { events } = useSite();

  useEffect(() => {
    if (!events) {
      return;
    }

    const eventsInWeek = events.events.filter((event: any) => {
      const start_date = new Date(event.start_date);
      return getWeek(start_date) === week;
    });

    setScheduleItems(eventsInWeek);
  }, [week, events]);

  if (!events) {
    return (
      <div className="w-full bg-primary-300 rounded-xl h-16 animate-pulse m-4" />
    );
  }

  console.log(scheduleItems);

  events.events.map((event: any) => {
    const start_date = new Date(event.start_date);
    const weekNumber = getWeek(start_date);
    console.log(`Event ${event.title} is in week ${weekNumber}`);
  });

  if (size === 'lg') {
    return (
      <div className="relative">
        <div className="w-full bg-accent-500 text-primary-100 justify-between items-center flex">
          <div />
          <div className="flex items-center">
            <div>
              <IconBack />
            </div>
            <div>{'v.' + week}</div>
            <div>
              <IconNext />
            </div>
          </div>
          <div className="">
            <Filter filtered={filtered} setFiltered={setFiltered} />
          </div>
        </div>
      </div>
    );
  }

  if (size === 'sm') {
    return <>Hej</>;
  }
}
