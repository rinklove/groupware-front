import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/navbar/Header'
import { ROUTES } from '../constants/routes'
import Home from './Home'
import LoginPage from './LoginPage'
import EditPage from './EditPage'
import Footer from '../components/common/Footer'
import styled from 'styled-components'
import AdminPage from './admin/AdminPage'
import CoursePage from './course/CoursePage'

const StyledDiv = styled.div`
  
  & > div:nth-child(2) {
    min-height: 70vh;
  }
`;

const WebPage = () => {
  return (
    <StyledDiv>
      <Header/>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
        <Route path={ROUTES.EDIT} element={<EditPage/>}/>
        <Route path={`${ROUTES.COURSE}/*`} element={<CoursePage/>}/>
        <Route path={`${ROUTES.ADMIN}/*`} element={<AdminPage/>}/>
      </Routes>
      <Footer/>
    </StyledDiv>
  )
}

export default WebPage
