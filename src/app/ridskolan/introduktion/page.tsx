'use client';

import { useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@/components/UI';

export default function Page() {
  const params = useSearchParams();

  return (
    <>
      <Breadcrumb section="Ridskolan" current={'Introduktion'} />
      <div className="card-base">
        <p>{params!.get('slug')}</p>
      </div>
    </>
  );
}
