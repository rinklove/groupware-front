import React from 'react'
import TeamContainer from '../components/home/TeamContainer'
import ChatContainer from '../components/home/ChatContainer'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 100vw;
  display: flex;
`;

const UserHomePage = () => {
  return (
    <StyledDiv>
      <TeamContainer/>
      <ChatContainer/>
    </StyledDiv>
  )
}

export default UserHomePage
