'use client';

import Calendar from '@/components/Calendar/Calendar';
import { Breadcrumb } from '@/components/UI';

export default function Page() {
  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Kalender'} />
      <Calendar />
    </>
  );
}
