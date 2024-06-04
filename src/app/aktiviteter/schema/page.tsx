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
      {breakpoint && (
        <div className="mt-8 mb-9">
          <Breadcrumb section="Aktiviteter" current={'Schema'} />
        </div>
      )}
      <div className="card-base">
        <Schedule />
      </div>
    </>
  );
}
