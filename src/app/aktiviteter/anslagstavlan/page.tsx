'use client';

import Anslagstavlan from '@/components/Anslagstavlan/Anslagstavlan';
import { Breadcrumb } from '@/components/UI';

export default function Page() {
  return (
    <>
      <Breadcrumb section="Aktiviteter" current={'Anslagstavlan'} />
      <Anslagstavlan />
    </>
  );
}
