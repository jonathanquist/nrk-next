'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Page() {
  const params = useSearchParams();
  const path = usePathname();
  console.log(path);

  return (
    <div className="mt-8">
      <Breadcrumb section="Aktiviteter" current={'Schema'} />
      <div className="card-base mt-9">
        <p>{params!.get('slug')}</p>
      </div>
    </div>
  );
}
