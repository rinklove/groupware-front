import React from 'react'
import { ROUTES } from '../../constants/routes'
import { Route, Routes } from 'react-router-dom'
import CourseStudyBoardList from './CourseStudyBoardList'

const CoursePage = () => {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.NOTICE} element={<CourseStudyBoardList />}/>
        <Route path={ROUTES.STUDY} element={<CourseStudyBoardList />}/>
      </Routes>
    </div>
  )
}

export default CoursePage
