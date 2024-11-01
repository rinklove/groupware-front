import React, { useEffect, useState } from 'react'
import { useTeamApi } from '../hook/UseTeamApi'
import styled from 'styled-components'
import TeamList from './TeamList';

const Title = styled.span`
  padding: 0.5em;
  display: block;
  text-align: center;
  font-size: 1.2em;
  font-weight: 700;
`;

const TeamListDiv = styled.div`
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

const MyTeamContainer = () => {

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
  const { getMyTeamInfo } = useTeamApi();
  const fetchMyTeam = async () => {
    const res = await getMyTeamInfo()
    console.log(`내팀 목록`, res)
    setTeams(res)
  }
  useEffect(() => {
    fetchMyTeam()
  }, [])
  return (
    <>
      <Title>내 팀 목록</Title>
      <TeamListDiv>
        <TeamList
          teams={teams}
        />
      </TeamListDiv>
    </>
  )
}

export default MyTeamContainer
