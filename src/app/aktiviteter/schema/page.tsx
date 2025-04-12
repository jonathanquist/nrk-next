'use client';

import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';
import Daily from '@/components/Events/Schedule/ScheduleDaily';
import ScheduleLarge from '@/components/Events/Schedule/ScheduleLarge';
import ScheduleDaily from '@/components/Events/Schedule/ScheduleDaily';

export default function Page() {
  const { data: page, isLoading } = usePage(API.SCHEMA);

  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Schema'} />
      {/* <SinglePage page={page} isLoading={isLoading} /> */}
      <ScheduleDaily />
    </>
  );
}
