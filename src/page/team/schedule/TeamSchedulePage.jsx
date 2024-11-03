import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import TeamScheduleListPage from './TeamScheduleListPage'

const TeamSchedulePage = () => {
  return (
    <div>
      <Routes>
        <Route path={`${ROUTES.LIST}`} element={<TeamScheduleListPage/>} />
      </Routes>
    </div>
  )
}

export default TeamSchedulePage
