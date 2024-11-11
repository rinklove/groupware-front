import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';
import { useTeamApi } from '../hook/UseTeamApi';
import TeamList from './TeamList';
import { useCourse } from '../hook/UseCourse';

const TitleH4 = styled.h4`
  padding: 0.5em;
`;

const TeamContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  max-height: 30vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 1em;

  & > * {
    width: 70%;
  }
`;

const AdminCourseTeamContainer = ({courseId}) => {
  const [teams, setTeams] = useState([
    {"id": 1, "title": "제목1"},
    {"id": 2, "title": "제목1"},
    {"id": 3, "title": "제목1"},
    {"id": 4, "title": "제목1"},
    {"id": 5, "title": "제목1"},
    {"id": 6, "title": "제목1"},
    {"id": 7, "title": "제목1"},
    {"id": 8, "title": "제목1"},
    {"id": 9, "title": "제목1"},
    {"id": 10, "title": "제목1"},
    {"id": 11, "title": "제목1"},
    {"id": 12, "title": "제목1"},
    {"id": 13, "title": "제목1"},
    {"id": 14, "title": "제목1"}
  ])
  const { getAllTeamByCourse } = useTeamApi();

  useEffect(() => {
    const fetchData = async () => {
      if(!courseId) return;
      
      const res = await getAllTeamByCourse(courseId) 
      setTeams(res);
      console.log(res);
    }

    fetchData();
  }, [courseId])

  
  return (
    <>
      <TitleH4>모든 팀 목록</TitleH4>
      <TeamContainer>
        <TeamList teams={teams}/>
      </TeamContainer>
    </>
  )
}

export default AdminCourseTeamContainer
