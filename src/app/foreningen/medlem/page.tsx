import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { getPage } from '@/lib/api';

export default async function Page() {
  const page = await getPage('medlem');

  return (
    <>
      <Breadcrumb section="Föreningen" current={'Bli Medlem'} />
      <SinglePage page={page} />
    </>
  );
}
