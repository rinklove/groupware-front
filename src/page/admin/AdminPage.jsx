import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import MainPage from './MainPage'
import AdminCoursePage from './course/AdminCoursePage'
import AdminCourseTeamPage from './team/AdminCourseTeamPage'
import AdminAttendanceListPage from './attendance/AdminAttendanceListPage'


const AdminPage = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage/>}/>
        <Route path={`${ROUTES.COURSE}/*`} element={<AdminCoursePage/>}/>
        <Route path={`${ROUTES.TEAM}/*`} element={<AdminCourseTeamPage/>}/>
        <Route path={`${ROUTES.ATTENDANCE}${ROUTES.LIST}`} element={<AdminAttendanceListPage/>}/>
      </Routes>
    </>
  )
}

export default AdminPage
