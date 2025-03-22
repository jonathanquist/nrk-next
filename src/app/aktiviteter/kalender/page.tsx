'use client';

import Calendar from '@/components/Calendar/Calendar';
import Loader from '@/components/Loader/Loader';
import { Breadcrumb } from '@/components/UI';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';

export default function Page() {
  const { data: page, isLoading } = usePage(API.KALENDER);

  if (isLoading) return <Loader />;

  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Kalender'} />
      <Calendar page={page} />
    </>
  );
}
