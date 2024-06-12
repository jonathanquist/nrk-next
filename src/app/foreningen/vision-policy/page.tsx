'use client';

import { useSearchParams } from 'next/navigation';
import { useViewport } from '@/hooks/useViewport';

import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';
import SinglePage from '@/components/SinglePage/SinglePage';

export default function Page() {
  const { breakpoint } = useViewport();
  const params = useSearchParams();

  return (
    <>
      {breakpoint && (
        <Breadcrumb section="Föreningen" current={'Vision & Policy'} />
      )}
      <div className="card-base">
        {/* <p>{params!.get('slug')}</p> */}
        <SinglePage slug="vision-policy" />
      </div>
    </>
  );
}
