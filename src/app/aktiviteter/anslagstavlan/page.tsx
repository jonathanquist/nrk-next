'use client';

import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';
import Loader from '@/components/Loader/Loader';
import { Breadcrumb } from '@/components/UI';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';

export default function Page() {
  const { data: page, isLoading } = usePage(API.ANSLAGSTAVLAN);

  if (isLoading) return <Loader />;

  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Anslagstavlan'} />
      <Anslagstavlan page={page} />
    </>
  );
}
