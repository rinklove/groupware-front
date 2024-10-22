import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import MainPage from './MainPage'
import AdminCoursePage from './course/AdminCoursePage'


const AdminPage = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage/>}/>
        <Route path={`${ROUTES.COURSE}/*`} element={<AdminCoursePage/>}/>
      </Routes>
    </>
  )
}

export default AdminPage
