import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { getPage } from '@/lib/api';

export default async function Page() {
  const page = await getPage('om-oss');

  return (
    <>
      <Breadcrumb section="Föreningen" current={'Om Oss'} />
      <SinglePage page={page} />
    </>
  );
}
