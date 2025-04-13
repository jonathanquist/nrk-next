import { cn, getEventColor } from "@/lib/utils";
import Loader from "../Loader/Loader";

interface EventBarProps {
  info: any;
  size: string;
  isLoading?: boolean;
}

interface BarProp {
  category: string;
  title?: string;
}

interface ScheduleBarProp {
  tag?: string;
  title: string;
}

const LargeEventBar = ({ category, title }: BarProp) => (
  <div className="fc-event-title">
    <div
      className={cn(
        category === "annat" ? "text-accent-500" : "text-primary-100",
        "px-2 py-1 rounded-md overflow-hidden font-cambria text-center w-full h-full align-middle flex items-center"
      )}
      style={{ backgroundColor: getEventColor(category) }}
    >
      <span className="flex-shrink-0">{category[0].toUpperCase()}</span>
      <span className="ml-1 leading-none text-xs truncate font-thin inline-block max-w-full">
        | {title}
      </span>
    </div>
  </div>
);

const SmallEventBar = ({ category }: BarProp) => (
  <div
    className="fc-event-title w-full h-1.5 sm:h-2 group-[.calendar-no-toolbar]:h-1.5 rounded-md"
    style={{ backgroundColor: getEventColor(category) }}
  />
);

const ScheduleEventBar = ({ title }: ScheduleBarProp) => (
  <div className="fc-event-title">
    <div
      className={cn(
        "text-primary-900 bg-primary-300 px-2 py-1 rounded-md overflow-hidden font-fira small text-center w-full h-full justify-center flex items-center"
      )}
      // style={{ backgroundColor: getEventColor("") }}
    >
      <span className="ml-1 leading-none text-base truncate inline-block whitespace-break-spaces max-w-full">
        {title}
      </span>
    </div>
  </div>
);

export default function EventBar({
  info,
  size = "sm",
  isLoading,
}: EventBarProps) {
  const category = info.event._def.extendedProps.category;
  const title = info.event._def.title;

  if (isLoading) return <Loader />;

  return (
    <>
      {size === "lg" && <LargeEventBar category={category} title={title} />}
      {size === "sm" && <SmallEventBar category={category} />}
      {size === "d" && <ScheduleEventBar title={title} />}
    </>
  );
}
