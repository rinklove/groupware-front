import React from 'react'
import CommonBoardContainer from '../components/home/CommonBoardContainer'
import CalenderContainer from '../components/home/CalenderContainer'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 100vw;
  display: flex;
`;

const UserHomePage = () => {
  return (
    <StyledDiv>
      <CommonBoardContainer/>
      <CalenderContainer/>
    </StyledDiv>
  )
}

export default UserHomePage
