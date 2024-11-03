import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from '../../constants/routes'
import AttendanceListPage from './AttendanceListPage'

const ContentWrapper = styled.div`
  min-height: 70vh;
`

const AttendancePage = () => {
  return (
    <ContentWrapper>
      <Routes>
        <Route path={`${ROUTES.LIST}`} element={<AttendanceListPage/>}/>
      </Routes>
    </ContentWrapper>
  )
}

export default AttendancePage
