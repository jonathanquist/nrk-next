'use client';

import { useSearchParams } from 'next/navigation';
import { useViewport } from '@/hooks/useViewport';

import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import Schedule from '@/components/Schedule/Schedule';

export default function Page() {
  const { breakpoint } = useViewport();
  const params = useSearchParams();

  return (
    <>
      {breakpoint && <Breadcrumb section="Aktiviteter" current={'Schema'} />}
      <div className="card-base">
        <Schedule />
      </div>
    </>
  );
}
