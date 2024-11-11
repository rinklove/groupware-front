import React from 'react'
import { ROUTES } from '../../../constants/routes'
import { Route, Routes } from 'react-router-dom'
import CourseNoticeBoardListPage from './CourseNoticeBoardListPage'
import NoticeWritePage from './NoticeWritePage'

const CourseNoticePage = ({isAdmin}) => {
  return (
    <Routes>
      <Route path={ROUTES.LIST} element={<CourseNoticeBoardListPage isAdmin={isAdmin}/>}/>
      <Route path={ROUTES.WRITE} element={<NoticeWritePage />}/>
    </Routes>
  )
}

export default CourseNoticePage
