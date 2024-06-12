import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { getPage, getPosts } from '@/lib/api';

export default async function Page() {
  const page = await getPage('vision-policy');

  return (
    <>
      <Breadcrumb section="Föreningen" current={'Vision & Policy'} />
      <SinglePage page={page} />
    </>
  );
}
