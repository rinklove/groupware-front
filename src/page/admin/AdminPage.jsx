import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import MainPage from './MainPage'
import CoursePage from './CoursePage'

const AdminPage = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainPage/>}/>
        <Route path={ROUTES.COURSE} element={<CoursePage/>}/>
      </Routes>
    </>
  )
}

export default AdminPage
