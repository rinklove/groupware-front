import React from 'react'
import ScheduleList from '../schedule/ScheduleList';

const ScheduleContainer = ({ data, width, isTeamSchedule, isAdmin }) => {
  return (
    <ScheduleList
      isAdmin={isAdmin}
      isTeamSchedule={isTeamSchedule}
      data={data}
      width={width}
    />
  );
};

export default ScheduleContainer;
