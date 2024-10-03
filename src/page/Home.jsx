import React, { useContext } from 'react'
import { TokenContext } from '../contexts/TokenContext'
import NotUserHomePage from './NotUserHomePage'
import UserHomePage from './UserHomePage'
import HomeCarousel from '../components/home/HomeCarosel'

const Home = () => {
  const { token } = useContext(TokenContext);

  return (
    <div>
      <HomeCarousel/>
      {token ? <UserHomePage/> : <NotUserHomePage/> }
    </div>
  )
}

export default Home
