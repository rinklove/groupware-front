import React from 'react'
import ScheduleList from '../schedule/ScheduleList';

const ScheduleContainer = ({ data, width }) => {
  return (
    <ScheduleList
      data={data}
      width={width}
    />
  );
};

export default ScheduleContainer;
