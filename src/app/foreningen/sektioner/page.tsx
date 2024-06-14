import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { getPage } from '@/lib/api';

export default async function Page() {
  const page = await getPage('sektioner');

  return (
    <>
      <Breadcrumb section="Föreningen" current={'Sektioner'} />
      <SinglePage page={page} />
    </>
  );
}
