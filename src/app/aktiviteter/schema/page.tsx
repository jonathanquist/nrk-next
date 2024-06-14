import Schedule from '@/components/Schedule/Schedule';
import SinglePage from '@/components/SinglePage/SinglePage';
import { Breadcrumb } from '@/components/UI';
import { getEvents, getPage } from '@/lib/api';

export default async function Page() {
  const events = await getEvents();
  const page = await getPage('schema');

  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Schema'} />
      {/* <Schedule events={events} /> */}
      <SinglePage page={page} />
    </>
  );
}
