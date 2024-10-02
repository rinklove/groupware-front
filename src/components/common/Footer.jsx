import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
    background-color: #0f1317;
    width: 100%;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & span {
        font-size: 1.5em;
        color: #ffffff;
        margin: 0.3em 0.5em;
    }
`;
const Footer = () => {
  return (
    <StyledFooter>
      <span>1팀</span>
      <div>
        <span>김민우 </span>
        <span>류희수</span>
        <span>박상혁</span>
        <span>이준호</span>
        <span>조믿음</span>
      </div>
    </StyledFooter>
  )
}

export default Footer
