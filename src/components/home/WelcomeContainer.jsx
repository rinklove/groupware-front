import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    width: 100%;
    height: 20vh;
    background-color: #ffffff;;
    display: flex;
    justify-content: center;
    align-items: center;

    & > h3 {
        text-align: center;    
    }
`;

const WelcomeContainer = () => {
  return (
    <StyledDiv>
      <h3>데브코스 그룹웨어, 데브웨어(Dev-Ware)입니다.</h3>
    </StyledDiv>
  )
}

export default WelcomeContainer
