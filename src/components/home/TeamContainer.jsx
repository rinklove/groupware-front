import React, { useEffect } from 'react'
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 60vw;
`;

const TeamContainer = () => {

  useEffect(() => {
    //팀정보를 받아와. 
  }, []);
  
  return (
    <StyledDiv>
        {/* <TeamInfoNav/> */}
    </StyledDiv>
  )
}

export default TeamContainer
