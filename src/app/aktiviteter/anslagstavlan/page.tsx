'use client';

import { useSearchParams } from 'next/navigation';
import { useViewport } from '@/hooks/useViewport';

import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';

export default function Page() {
  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Anslagstavlan'} />
      <Anslagstavlan />
    </>
  );
}
