import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일을 적용
import CustomCalendar from '../common/CustomCalendar';
import ScheduleContainer from './ScheduleContainer';
import useScheduleApi from '../hook/UseScheduleApi';
import { useCourse } from '../hook/UseCourse';

const CalendarWrapper = styled.div`
margin: auto;
  display: flex;
  flex-direction: column;
  padding: 2em;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  max-width: 900px;

  & > h4 {
    text-align: center;
    width: 100%;
    background-color: #66d9f4;
    margin: 0 0.5em;
    margin-bottom: 0.5em;
    padding: 0.3em 0.5em;
  }
`;

const CalendarDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%; 
  flex: 1; /* 부모의 높이를 동일하게 나누기 위해 flex 사용 */
`;

const CalenderContainer = ({isAdmin}) => {
  const [value, setValue] = useState(new Date());
  const {getCourseScheduleById, getCourseScheduleByIdForAdmin} = useScheduleApi();
  const [data, setData] = useState([])
  const {courseId} = useCourse();

  const tileDisabled = () => {
    return false;
  };

  const fetchUserData = async () => {
    if(courseId){
      const res = await getCourseScheduleById(courseId)
      setData(res)
    }
  }

  const fetchAdminData = async () => {
    const res = await getCourseScheduleByIdForAdmin(courseId)
    setData(res)
    console.log(`관리자 res`, res);
    
  }

  useEffect(() => {
    if(!isAdmin && !courseId) return;
    if (!isAdmin && courseId) {
      fetchUserData();
    } else if (isAdmin && courseId) {
      fetchAdminData();
    }
  }, [courseId]);

  return (
    <CalendarWrapper>
      <h4>코스 일정</h4>
      <CalendarDiv>
        {/* CustomCalendar와 ScheduleContainer가 flex로 동일한 높이를 가짐 */}
        <CustomCalendar 
          onChange={setValue} 
          value={value}
          tileDisabled={tileDisabled}
          width='65%' /* 넓이는 유연하게 설정 */
        />
        <ScheduleContainer
          isTeamSchedule={false}
          isAdmin={isAdmin}
          data={data}
          width='35%' /* 넓이는 유연하게 설정 */
        />
      </CalendarDiv>
    </CalendarWrapper>
  );
};

export default CalenderContainer;
