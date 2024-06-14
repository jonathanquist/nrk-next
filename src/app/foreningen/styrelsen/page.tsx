import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { getPage } from '@/lib/api';

export default async function Page() {
  const page = await getPage('styrelsen');

  return (
    <>
      <Breadcrumb section="Föreningen" current={'Styrelsen'} />
      <SinglePage page={page} />
    </>
  );
}
