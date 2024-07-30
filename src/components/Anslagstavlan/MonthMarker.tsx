import { Separator } from '../UI';

interface MonthMarkerProps {
  date: string;
}

export default function MonthMarker({ date }: MonthMarkerProps) {
  const getMonthMarker = (postDate: string) => {
    const date = new Date(postDate);
    const monthYear = new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'long',
    }).format(date);
    return monthYear;
  };

  const monthMarker = getMonthMarker(date);

  return (
    <div className="flex items-center justify-start lg:w-full mb-6 lg:mb-12 group-first:mt-0 lg:mt-12 mt-2 lg:px-0">
      <Separator className="shrink-0 w-8 lg:w-32 mt-1" />
      <div className="text-accent-500 text-2xl small font-cambria capitalize w-56 flex justify-center shrink-0">
        <div>{monthMarker}</div>
      </div>
      <Separator className="shrink" />
    </div>
  );
}
