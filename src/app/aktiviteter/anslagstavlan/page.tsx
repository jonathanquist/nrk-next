'use client';

import { useSearchParams } from 'next/navigation';
import { useViewport } from '@/hooks/useViewport';

import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';

export default function Page() {
  const { breakpoint } = useViewport();

  return (
    <>
      {breakpoint && (
        <Breadcrumb section="Aktiviteter" current={'Anslagstavlan'} />
      )}
      <div className="card-base h-full">
        <Anslagstavlan />
      </div>
    </>
  );
}
