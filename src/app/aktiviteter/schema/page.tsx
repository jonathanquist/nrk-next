'use client';

import Schedule from '@/components/Schedule/Schedule';
import { Breadcrumb } from '@/components/UI';

export default function Page() {
  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Schema'} />
      <Schedule />
    </>
  );
}
