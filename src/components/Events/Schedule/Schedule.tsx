import React, { useEffect, useState } from "react";
import { format, getWeek, set } from "date-fns";
import { IconBack, IconNext } from "../../UI";
import Filter from "../FilterMenu";
import { useEventSpan } from "@/hooks/useFetch";
import Loader from "@/components/Loader/Loader";

export default function Schedule({ size = "lg" }: { size?: string }) {
  const [week, setWeek] = useState(getWeek(new Date()));
  const [scheduleItems, setScheduleItems] = useState<any>(null);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: format(new Date(), "yyyy-MM-01"),
    end: format(new Date(), "yyyy-MM-31"),
  });

  const { data: eventsData, isLoading } = useEventSpan(
    dateRange.start,
    dateRange.end
  );

  //eslint-disable-next-line
  const events = eventsData?.events || [];

  useEffect(() => {
    if (!events) return;

    const eventsInWeek = events.filter((event: any) => {
      const start_date = new Date(event.start_date);
      return getWeek(start_date) === week;
    });

    setScheduleItems(eventsInWeek);
  }, [week, events]);

  if (isLoading) return <Loader />;

  events.map((event: any) => {
    const start_date = new Date(event.start_date);
    const weekNumber = getWeek(start_date);
    console.log(`Event ${event.title} is in week ${weekNumber}`);
  });

  if (size === "lg") {
    return (
      <div className="relative">
        <div className="w-full bg-accent-500 text-primary-100 justify-between items-center flex">
          <div />
          <div className="flex items-center">
            <div>
              <IconBack />
            </div>
            <div>{"v." + week}</div>
            <div>
              <IconNext />
            </div>
          </div>
          <div>
            <Filter filtered={filtered} setFiltered={setFiltered} />
          </div>
        </div>
      </div>
    );
  }

  if (size === "sm") {
    return <>Hej</>;
  }
}
