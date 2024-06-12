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
    <div className="flex items-center justify-start md:w-full mb-6 md:mb-20 group-first:mt-0 md:mt-12 mt-2 md:px-0">
      <div className="h-1 w-8 md:w-32 bg-primary-500 rounded-full mt-1 shrink-0" />
      <div className="text-accent-500 text-2xl small font-cambria capitalize w-56 flex justify-center shrink-0">
        <div>{monthMarker}</div>
      </div>
      <div className="h-1 bg-primary-500 rounded-full w-full" />
    </div>
  );
}
