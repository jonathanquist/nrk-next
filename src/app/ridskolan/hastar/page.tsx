'use client';

import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';

export default function Page() {
  const { data: page, isLoading } = usePage(API.HASTAR);

  return (
    <>
      <Breadcrumb section="Ridskolan" current={'Våra Hästar'} />
      <SinglePage page={page} isLoading={isLoading} />
    </>
  );
}
