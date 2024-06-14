import { Breadcrumb } from '@/components/UI';
import { getPage, getPages } from '@/lib/api';
import Ubildningsplan from '@/components/SinglePage/Pages/Utbildningsplan';

export default async function Page() {
  const pages = await getPages([
    'utbildningsplan',
    'utbildningsplan-lek-och-lar',
    'utbildningsplan-junior',
    'utbildningsplan-vuxen',
    'utbildningsplan-special',
  ]);
  const page = await getPage('utbildningsplan');

  return (
    <>
      <Breadcrumb section="Ridskolan" current={'Utbildningsplan'} />
      <Ubildningsplan pages={pages} />
    </>
  );
}
