'use client';

import { useSearchParams } from 'next/navigation';
import { useViewport } from '@/hooks/useViewport';

import Breadcrumb from '@/components/Breadcrumb';
import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';

export default function Page() {
  const { breakpoint } = useViewport();
  const params = useSearchParams();

  return (
    <>
      {breakpoint && (
        <div className="mt-8 mb-9">
          <Breadcrumb section="Föreningen" current={'Om Oss'} />
        </div>
      )}
      <div className="card-base">
        <p>{params!.get('slug')}</p>
      </div>
    </>
  );
}
