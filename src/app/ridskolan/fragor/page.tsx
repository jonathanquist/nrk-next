import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { getPage } from '@/lib/api';

export default async function Page() {
  const page = await getPage('fragor');

  return (
    <>
      <Breadcrumb section="Ridskolan" current={'Frågor'} />
      <SinglePage page={page} />
    </>
  );
}
