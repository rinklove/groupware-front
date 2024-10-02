import React from 'react'
import HomeCarosel from '../components/home/HomeCarosel'
import HomeContainer from '../components/home/HomeContainer'
import WelcomeContainer from '../components/home/WelcomeContainer'

const Home = () => {
  return (
    <div>
      <HomeCarosel/>
      <WelcomeContainer/>
      <HomeContainer/>
    </div>
  )
}

export default Home
