'use client';

import { useSearchParams } from 'next/navigation';
import { useViewport } from '@/hooks/useViewport';

import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';

export default function Page() {
  const params = useSearchParams();

  return (
    <>
      <Breadcrumb section="Föreningen" current={'Sektioner'} />
      <div className="card-base">
        <p>{params!.get('slug')}</p>
      </div>
    </>
  );
}
