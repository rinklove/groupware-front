import React, { useEffect, useState } from 'react'
import { useTeam } from '../../hook/UseTeam'
import { useCourse } from '../../hook/UseCourse'
import useScheduleApi from '../../hook/UseScheduleApi'
import CustomCalendar from '../../common/CustomCalendar'
import ScheduleList from '../../schedule/ScheduleList'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import TeamScheduleForm from './TeamScheduleForm'

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2em;

  & > div {
    width: 100%;

    &:nth-child(2) {
      width: 60%;
    }
  }
`

const TeamScheduleList = () => {
  const { teamId } = useTeam()
  const { courseId } = useCourse();
  const {getTeamSchedulebyId, getCourseScheduleById } = useScheduleApi()
  const [teamSchedules, setTeamSchedules] = useState([])
  const [teamduration, setTeamDuration] = useState([]);
  const [courseduration, setCourseuration] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([])
  const [show, setShow] = useState(false)

  const convertToDuration = async (schedules) => {
    return schedules.map(schedule => {
      return {
        id: schedule.id,
        startAt: schedule.startAt,
        endAt: schedule.endAt
      };
    });
  };

  const fetchTeamSchedule = async () => {
    const res = await getTeamSchedulebyId(teamId)
    setTeamSchedules(res)
    setTeamDuration(convertToDuration(teamSchedules))
  }

  const fetchCourseSchedule = async () => {
    const res = await getCourseScheduleById(courseId)
    setCourseSchedules(res)
    setCourseuration(convertToDuration(courseSchedules))
  }

  useEffect(() => {
    if(teamId) {
      fetchTeamSchedule()
    }
  }, [teamId])

  useEffect(() => {
    if(courseId) {
      fetchCourseSchedule()
    }
  }, [courseId])


  return (
    <>
      <ContentWrapper>
        <div>
          <CustomCalendar
            courseList={courseduration}
            teamList={teamduration}
            width='100%'
          />
        </div>
        <div>
          <ScheduleList
            isTeamSchedule={false}
            title='코스 일정'
            data={courseSchedules}
          />
          <ScheduleList
            isTeamSchedule={true}
            title='팀 일정'
            data={teamSchedules}
          >
            <Button
              variant='link'
              size='sm'
              onClick={() => setShow(true)}
            >
            팀 일정 추가
            </Button>
          </ScheduleList>
        </div>
      </ContentWrapper>
      {
        show &&
        <TeamScheduleForm
          closeForm={() => setShow(false)}
          onAddSchedule={() => {
            fetchCourseSchedule()
            fetchTeamSchedule()
          }}
        />
      }
    </>
  )
}

export default TeamScheduleList
