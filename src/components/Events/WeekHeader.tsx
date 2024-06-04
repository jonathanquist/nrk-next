export default function WeekHeader(info: any) {
  return (
    <div className="fc-daygrid-day-number text-xl font-light">
      {info.text[0].toUpperCase()}
    </div>
  );
}
