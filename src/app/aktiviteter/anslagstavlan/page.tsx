'use client';

import { useSearchParams } from 'next/navigation';
import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';
import Breadcrumb from '@/components/Breadcrumb';

export default function Page() {
  const params = useSearchParams();
  //console.log('hut', params.get('slug'));
  return (
    <div className="mt-8">
      <Breadcrumb section="Aktiviteter" current={'Anslagstavlan'} />
      <div className="card-base mt-9">
        <Anslagstavlan />
      </div>
    </div>
  );
}
