import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';
import { COURSE_TEAM } from '../../api/url';
import { useTeamApi } from '../hook/UseTeamApi';

const TitleH4 = styled.h4`
  padding: 0.5em;
`;

const TeamContainer = styled.div`
  max-height: 30vh;
  overflow-y: auto;

  & > * {
    width: 100%;
    padding: 0.5em;
  }

  & > div.list-group {
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
      
      const res = await getAllTeamByCourse() 
      console.log(res);
    }

    fetchData();
  }, [courseId])

  
  return (
    <>
      <TitleH4>모든 팀 목록</TitleH4>
      <TeamContainer>
        <ListGroup>
        {
          teams.length > 0 ?
          teams.map(team =>           
            <ListGroup.Item 
              key={team.id}
              action variant='light'
            >
              {team.title}
            </ListGroup.Item>
          ) : 
            <ListGroup.Item 
              action variant='light'
            >
              팀 목록이 없습니다.
            </ListGroup.Item>
        }
        </ListGroup>
      </TeamContainer>
    </>
  )
}

export default AdminCourseTeamContainer
