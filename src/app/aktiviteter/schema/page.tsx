import Schedule from '@/components/Schedule/Schedule';
import { Breadcrumb } from '@/components/UI';
import { getEvents } from '@/lib/api';

export default async function Page() {
  const events = await getEvents();

  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Schema'} />
      <Schedule events={events} />
    </>
  );
}
