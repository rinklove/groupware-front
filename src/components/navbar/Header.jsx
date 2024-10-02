import React from 'react'
import Logo from './logo/Logo'
import UserContainer from './user/UserContainer'
import styled from 'styled-components';


const StyledHeader = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo/>
      <UserContainer/>
    </StyledHeader>
  )
}

export default Header
