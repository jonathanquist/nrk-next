import { cn, getEventColor } from '@/lib/utils';

interface EventBarProps {
  info: any;
  size: string;
}

interface BarProp {
  category: string;
}

const LargeEventBar = ({ category }: BarProp) => (
  <div className="fc-event-title px-1">
    <div
      className={cn(
        category === 'annat' ? 'text-accent-500' : 'text-primary-100',
        'px-2 py-1 rounded-md overflow-hidden font-cambria text-center'
      )}
      style={{ backgroundColor: getEventColor(category) }}
    >
      {category[0].toUpperCase()}
    </div>
  </div>
);

const SmallEventBar = ({ category }: BarProp) => (
  <div
    className="fc-event-title w-full h-1 rounded-full"
    style={{ backgroundColor: getEventColor(category) }}
  />
);

export default function EventBar({ info, size = 'sm' }: EventBarProps) {
  const category = info.event._def.extendedProps.category;

  return (
    <>
      {size === 'lg' && <LargeEventBar category={category} />}
      {size === 'sm' && <SmallEventBar category={category} />}
    </>
  );
}
