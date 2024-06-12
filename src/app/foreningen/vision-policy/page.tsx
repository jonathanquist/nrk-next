'use client';

import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import SinglePage from '@/components/SinglePage/SinglePage';

export default function Page() {
  return (
    <>
      <Breadcrumb section="Föreningen" current={'Vision & Policy'} />
      <SinglePage slug="vision-policy" />
    </>
  );
}
