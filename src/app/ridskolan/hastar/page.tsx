import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { getPage } from '@/lib/api';

export default async function Page() {
  const page = await getPage('hastar');

  return (
    <>
      <Breadcrumb section="Ridskolan" current={'Våra Hästar'} />
      <SinglePage page={page} />
    </>
  );
}
