import React from 'react'
import { ROUTES } from '../../../constants/routes'
import { Route, Routes } from 'react-router-dom'
import CreatePage from './CreatePage'
import InvitePage from './InvitePage'
import WeedingPage from './WeedingPage'
import CreateProjectTeamPage from './CreateProjectTeamPage'

const AdminCoursePage = () => {
  return (
    <Routes>
        <Route path={ROUTES.NEW} element={<CreatePage/>}/>
        <Route path={ROUTES.INVITE} element={<InvitePage/>}/>
        <Route path={ROUTES.WEEDING} element={<WeedingPage/>}/>
        <Route path={ROUTES.TEAM} element={<CreateProjectTeamPage/>}/>
    </Routes>
  )
}

export default AdminCoursePage
