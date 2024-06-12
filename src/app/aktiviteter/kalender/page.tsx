import Calendar from '@/components/Calendar/Calendar';
import { Breadcrumb } from '@/components/UI';
import { getEvents } from '@/lib/api';

export default async function Page() {
  const events = await getEvents();
  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Kalender'} />
      <Calendar events={events} />
    </>
  );
}
