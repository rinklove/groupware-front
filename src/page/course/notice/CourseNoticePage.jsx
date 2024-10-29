import React from 'react'
import { ROUTES } from '../../../constants/routes'
import { Route, Routes } from 'react-router-dom'
import CourseNoticeBoardListPage from './CourseNoticeBoardListPage'

const CourseNoticePage = ({isAdmin}) => {
  return (
    <Routes>
      <Route path={ROUTES.LIST} element={<CourseNoticeBoardListPage isAdmin={isAdmin}/>}/>
    </Routes>
  )
}

export default CourseNoticePage
