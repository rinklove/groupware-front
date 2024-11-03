import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import TeamMainPage from './TeamMainPage'
import styled from 'styled-components'
import TeamInfo from '../../components/team/TeamInfo'
import TeamNavbar from '../../components/team/TeamNavbar'
import TeamBoardPage from './board/TeamBoardPage'
import TeamSettingPage from './TeamSettingPage'
import TeamSchedulePage from './schedule/TeamSchedulePage'

const ContentWrapper = styled.div`
  margin: auto;
  width: 90%;
  padding: 3em;
  min-height: 70vh;
`

const MainDiv = styled.div`
  text-align: right;
  margin: 0.5em;
  & > button {

    &:hover {
      color: #1a1f23;
    }
  }
`

const TeamPage = () => {
  const location = useLocation();
  const teamName = location.state?.teamName
  useEffect(() => {
    if(teamName) {
      localStorage.setItem("teamName" , location.state?.teamName)
    }
  })

  return (
    <ContentWrapper>
      <TeamInfo/>
      <TeamNavbar />
      <Routes>
        <Route path={`${ROUTES.MAIN}`} element={<TeamMainPage/>}/>
        <Route path={`${ROUTES.SETTING}`} element={<TeamSettingPage/>}/>
        <Route path={`${ROUTES.SCHEDULE}/*`} element={<TeamSchedulePage/>}/>
        <Route path={`${ROUTES.BOARD}/*`} element={<TeamBoardPage/>}/>
      </Routes>
    </ContentWrapper>
  )
}

export default TeamPage
