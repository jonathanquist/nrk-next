'use client';

import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';

export default function Page() {
  const { data: page, isLoading } = usePage(API.MEDLEM);

  return (
    <>
      <Breadcrumb section="Föreningen" current={'Bli Medlem'} />
      <SinglePage page={page} isLoading={isLoading} />
    </>
  );
}
