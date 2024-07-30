import Calendar from '@/components/Calendar/Calendar';
import { Breadcrumb } from '@/components/UI';
import { getEvents, getPage } from '@/lib/api';

export default async function Page() {
  const events = await getEvents();
  const page = await getPage('kalender');
  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Kalender'} />
      <Calendar page={page} events={events} />
    </>
  );
}
