'use client';

import { Breadcrumb } from '@/components/UI';
import Ubildningsplan from '@/components/SinglePage/Pages/Utbildningsplan';

export default function Page() {
  return (
    <>
      <Breadcrumb section="Ridskolan" current={'Utbildningsplan'} />
      <Ubildningsplan />
    </>
  );
}
