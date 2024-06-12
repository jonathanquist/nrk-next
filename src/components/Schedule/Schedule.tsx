import React from 'react';

import ScheduleWidget from '../Events/Schedule/ScheduleWidget';
import Header from '../Header';

export default function Schedule() {
  return (
    <div className="card-base">
      <Header variant="menu" title="Schema" />
      <div className="schedule-big">
        <ScheduleWidget size={'lg'} />
      </div>
    </div>
  );
}
