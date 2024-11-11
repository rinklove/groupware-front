import React, { useEffect, useState } from 'react'
import useScheduleApi from '../../components/hook/UseScheduleApi';
import useBoardApi from '../../components/hook/UseBoardApi';
import BoardList from '../../components/board/BoardList';
import styled from 'styled-components';
import CustomCalendar from '../../components/common/CustomCalendar';
import ScheduleContainer from '../../components/home/ScheduleContainer';
import { useTeam } from '../../components/hook/UseTeam';
import { useNavigate } from 'react-router-dom';

const TitleH4 = styled.h4`
  margin-top: 2em;
`

const CalendarDiv = styled.div`
  display: flex;
  padding: 1em;
`

const TeamMainPage = () => {
  const [schedules, setSchedules] = useState([])
  const [teamBoards, setTeamBoards] = useState([])
  const [teamDuration, setTeamDuration] = useState([])
  const navigate = useNavigate();
  const { teamId } = useTeam()
  const { getTeamSchedulebyId } = useScheduleApi();
  const { getTeamBoard } = useBoardApi()

  const convertToDuration = async (schedules) => {
    return schedules.map(schedule => {
      return {
        id: schedule.id,
        startAt: schedule.startAt,
        endAt: schedule.endAt
      };
    });
  };

  const fetchData = async () => {
    try {
      const scheduleRes = await getTeamSchedulebyId(teamId)
      setSchedules(scheduleRes)
      setTeamDuration(convertToDuration(schedules))
      const boardRes = await getTeamBoard(teamId)
      setTeamBoards(boardRes)

    } catch (e) {
      console.error(e);
      
      // if(response.data.code === 403) {
      //   alert(response.data.message);
      //   navigate(-1)
      // }
    }
  }
  useEffect(() => {
    if (teamId) {
      fetchData();
    }
  }, [teamId]);
  

  const [value, setValue] = useState(new Date());
  const tileDisabled = () => {
    return false;
  };

  return (
    <div>
      <TitleH4>팀 게시글</TitleH4>
      <BoardList
        data={teamBoards}
      />
      <TitleH4>팀 일정</TitleH4>
      <CalendarDiv>
        <CustomCalendar
          teamList={teamDuration}
          onChange={setValue} 
          value={value}
          tileDisabled={tileDisabled}
          width='60%' /* 넓이는 유연하게 설정 */
        />
        <ScheduleContainer
          isTeamSchedule={true}
          data={schedules}
          width='40%' /* 넓이는 유연하게 설정 */
        />
      </CalendarDiv>
    </div>
  )
}

export default TeamMainPage
