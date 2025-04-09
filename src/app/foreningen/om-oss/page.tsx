'use client';

import { Breadcrumb } from '@/components/UI';
import SinglePage from '@/components/SinglePage/SinglePage';
import { usePage } from '@/hooks/useFetch';
import { API } from '@/lib/const';
import OmOss from '@/components/SinglePage/Pages/OmOss';

export default function Page() {
  return (
    <>
      <Breadcrumb section="Föreningen" current={'Om Oss'} />
      <OmOss />
    </>
  );
}
