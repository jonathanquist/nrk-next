'use client';

import { useSearchParams } from 'next/navigation';
import { useViewport } from '@/hooks/useViewport';

import Breadcrumb from '@/components/UI/Breadcrumb/Breadcrumb';
import Schedule from '@/components/Schedule/Schedule';

export default function Page() {
  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Schema'} />
      <Schedule />
    </>
  );
}
