'use client';

import { useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@/components/UI';

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
