import React from 'react'
import { ROUTES } from '../../constants/routes'
import CreatePage from './course/CreatePage'
import { Route, Routes } from 'react-router-dom'
import InvitePage from './course/InvitePage'
import WeedingPage from './course/WeedingPage'
import CreateProjectTeamPage from './course/CreateProjectTeamPage'

const CoursePage = () => {
  return (
    <Routes>
        <Route path={ROUTES.NEW} element={<CreatePage/>}/>
        <Route path={ROUTES.INVITE} element={<InvitePage/>}/>
        <Route path={ROUTES.WEEDING} element={<WeedingPage/>}/>
        <Route path={ROUTES.TEAM} element={<CreateProjectTeamPage/>}/>
    </Routes>
  )
}

export default CoursePage
