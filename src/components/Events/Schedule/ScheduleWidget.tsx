import React from 'react';

import useFetch from '@/hooks/useFetch';
import ScheduleLarge from './ScheduleLarge';

interface ScheduleProps {
  size?: string;
}

export default function CalendarWidget({ size = 'sm' }: ScheduleProps) {
  return <>{size === 'lg' && <ScheduleLarge />}</>;
}
