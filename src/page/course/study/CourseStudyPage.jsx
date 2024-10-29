import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CourseStudyBoardListPage from './CourseStudyBoardListPage'
import { ROUTES } from '../../../constants/routes'
import StudyWritePage from './StudyWritePage'

const CourseStudyPage = ({ isAdmin }) => {
  return (
    <Routes>
      <Route path={ROUTES.LIST} element={<CourseStudyBoardListPage isAdmin={isAdmin}/>}/>
      <Route path={ROUTES.WRITE} element={<StudyWritePage />}/>
    </Routes>
  )
}

export default CourseStudyPage
