import React, { useContext } from 'react'
import { TokenContext } from '../../../contexts/TokenContext'
import LogoutContainer from './LogoutContainer';
import LoginContainer from './LoginContainer';

const UserContainer = () => {
  const {token} = useContext(TokenContext);

  return (
    <div>
      {
        token ? <LogoutContainer/> : <LoginContainer/>
      }
    </div>
  )
}

export default UserContainer
