import React, { useEffect, useState } from 'react'
import { useTeamApi } from '../../hook/UseTeamApi'
import styled from 'styled-components'
import WaitingTeamInfo from './WaitingTeamInfo';

const ContentWrapper = styled.div`

`;

const StudyTeamApprovalContainer = () => {
  const [teams, setTeams] = useState([])
  const { getWatingTeamListForAdmin } = useTeamApi();

  const fetchData = async () => {
    const res = await getWatingTeamListForAdmin()
    console.log(res);
    
    setTeams(res)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <ContentWrapper>
      {
        teams.length > 0 ?
        teams.map(team => 
          <WaitingTeamInfo
            key={team.id}
            data={team}
            onUpdate={() => {
              fetchData()
            }}
          />
        )
        :
        <span>요청한 팀 목록이 없습니다.</span>
      }
    </ContentWrapper>
  )
}

export default StudyTeamApprovalContainer
