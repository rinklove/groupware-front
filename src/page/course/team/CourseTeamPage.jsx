import React from 'react'
import CourseTeamListPage from './CourseTeamListPage'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import CourseTeamCreatePage from './CourseTeamCreatePage'

const CourseTeamPage = ({isAdmin}) => {
  return (
    <Routes>
      <Route path={ROUTES.LIST} element={<CourseTeamListPage isAdmin={isAdmin}/>}/>
      <Route path={ROUTES.NEW} element={<CourseTeamCreatePage/>}/>
    </Routes>
  )
}

export default CourseTeamPage
