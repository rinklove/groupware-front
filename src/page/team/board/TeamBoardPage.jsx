import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import TeamBoardListPage from './TeamBoardListPage'
import TeamBoardWritePage from './TeamBoardWritePage'
import TeamBoardInfoPage from './TeamBoardInfoPage'

const TeamBoardPage = () => {
  return (
    <Routes>
      <Route path={`${ROUTES.LIST}`} element={<TeamBoardListPage/> }/>
      <Route path={`${ROUTES.INFO}`} element={<TeamBoardInfoPage/> }/>
      <Route path={`${ROUTES.WRITE}`} element={<TeamBoardWritePage/> }/>
    </Routes>
  )
}

export default TeamBoardPage
