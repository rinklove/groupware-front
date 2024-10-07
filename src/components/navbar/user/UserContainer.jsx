import React, { useContext } from 'react'
import { TokenContext } from '../../../contexts/TokenContext'
import LogoutContainer from './LogoutContainer';
import LoginContainer from './LoginContainer';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const UserContainer = ({toggleShow}) => {
  const {token} = useContext(TokenContext);

  return (
    <StyledDiv>
      {
        token ? 
        <LogoutContainer
          toggleShow= {toggleShow}
        /> : 
        <LoginContainer/>
      }
    </StyledDiv>
  )
}

export default UserContainer
