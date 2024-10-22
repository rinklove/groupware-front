import React, { useEffect, useState } from 'react'
import TeamCard from './TeamCard';
import { getAllTeamByCourse } from '../../api/team';
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';

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
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"},
    {"id": 1, "title": "제목1"}
  ])

  useEffect(() => {
    const fetchData = async () => {
      if(!courseId) return;

      const res = await getAllTeamByCourse(courseId)
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
