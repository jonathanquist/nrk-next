'use client';

import Schedule from '@/components/Schedule/Schedule';
import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';

export default function Page() {
  const { data: page, isLoading } = usePage(API.SCHEMA);

  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Schema'} />
      {/* <Schedule events={events} /> */}
      <SinglePage page={page} isLoading={isLoading} />
    </>
  );
}
