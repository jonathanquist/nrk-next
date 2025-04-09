'use client';

import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';
import Kontakt from '@/components/SinglePage/Pages/Kontakt';

export default function Page() {
  return (
    <>
      <Breadcrumb section="Ridskolan" current={'Kontakt'} />
      <Kontakt />
    </>
  );
}
