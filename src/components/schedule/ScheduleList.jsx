import React, { useEffect, useState } from 'react'
import { Badge, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import ScheduleInfo from './ScheduleInfo';
import useScheduleApi from '../hook/UseScheduleApi';
import { useCourse } from '../hook/UseCourse';
import { useTeam } from '../hook/UseTeam';

const ScheduleDiv = styled.div`
  width: ${({width}) => (width || '100%')};
  height: fit-content;
  max-height: 400px;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  margin-left: 1em;
  padding: 1em;

  & > div:first-child {
    display: flex;
  }
`;


const ScheduleList = ({ data, width, isTeamSchedule, isAdmin = false, title = '일정 목록', children}) => {

  const [fetchedData, setFetchedData] = useState([]);
  const {getCourseScheduleById, getTeamSchedulebyId} = useScheduleApi();
  const { courseId } = useCourse();
  const { teamId } = useTeam()

  const fetchData = async () => {
    const res = await isTeamSchedule ? 
        getTeamSchedulebyId(teamId)
        : getCourseScheduleById(courseId)

      setFetchedData(res);
  }

  useEffect(() => {
    setFetchedData(data)
  }, [data])

  return (
    <ScheduleDiv width={width} className="overflow-auto">
      <div>
        <h5>{title}</h5>
        <div>{children}</div>
      </div>
      <ListGroup>
        {
          fetchedData.length > 0 ? (
          fetchedData.map((per) => (
            <ScheduleInfo
              key={per.id}
              isAdmin={isAdmin}
              isTeamSchedule={isTeamSchedule}
              data={per}
              updateData={() => fetchData()}
            />
          ))
        ) : (
          <ListGroup.Item>
            <span>일정이 없습니다.</span>
          </ListGroup.Item>
        )}
      </ListGroup>
    </ScheduleDiv>
  );
};

export default ScheduleList
