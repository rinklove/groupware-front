import React, { useEffect, useState } from 'react'
import { useTeamApi } from '../../hook/UseTeamApi'
import styled from 'styled-components'
import WaitingTeamInfo from './WaitingTeamInfo';

const ContentWrapper = styled.div`

`;

const StudyTeamApprovalContainer = ({isAdmin}) => {
  const [teams, setTeams] = useState([])
  const { getWatingTeamListForAdmin } = useTeamApi();

  const fetchData = async () => {
    try {
      const res = await getWatingTeamListForAdmin()
      console.log(res);
      setTeams(res)
    } catch ({response}) {
      const {code, message} = response.data
      console.error(message);
      
    }
    
  }

  useEffect(() => {
    if(isAdmin) {
      fetchData()
    }
  }, [isAdmin])

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
