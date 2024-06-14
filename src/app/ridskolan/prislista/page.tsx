import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { getPage } from '@/lib/api';

export default async function Page() {
  const page = await getPage('prislista');

  return (
    <>
      <Breadcrumb section="Ridskolan" current={'Prislista'} />
      <SinglePage page={page} />
    </>
  );
}
