import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTeamApi } from '../hook/UseTeamApi'
import { useTeam } from '../hook/UseTeam'

const ContentWrapper = styled.div`
  padding: 2em;
  background-color: #ffffff; /* 배경색 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 자연스러운 그림자 */
  border-radius: 8px; /* 모서리 둥글게 */
`

const UserDiv = styled.div`
  

  & > span:not(span:first-child) {
    display: inline;
    margin-right: 0.5em;
  }
`

const TeamInfo = () => {
  const [members, setMembers] = useState([])
  const { getTeamMember } = useTeamApi()
  const { teamId } = useTeam()
  const teamName = localStorage.getItem("teamName")

  const fetchData = async () => {
    try {
      const res = await getTeamMember(teamId)
      console.log(`res = `, res);
      setMembers(res)
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (teamId) {
      fetchData();
    }
  }, [teamId]);
  
  return (
    <ContentWrapper>
      <h3>{teamName}</h3>
      <div>
        <UserDiv>
          <span>팀 구성원</span>
          <div className="vr mx-2" />
          {
            members.length > 0 ?
            members.map(member => 
              <span
                key={member.id}
              >{member.name}</span>
            )
            :
            null
          }
        </UserDiv>
      </div>
    </ContentWrapper>
  )
}

export default TeamInfo
