'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();

  return (
    <div className="mt-8">
      <Breadcrumb section="Ridskolan" current={'Hästar'} />
      <div className="card-base mt-9">
        <p>{params!.get('slug')}</p>
      </div>
    </div>
  );
}
