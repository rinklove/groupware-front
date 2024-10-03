import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import MainPage from './MainPage'

const AdminPage = () => {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.ADMIN_MAIN} element={<MainPage/>}/>
      </Routes>
    </div>
  )
}

export default AdminPage
