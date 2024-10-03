import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../components/navbar/Header'
import { ROUTES } from '../constants/routes'
import Home from './Home'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import Footer from '../components/common/Footer'
import styled from 'styled-components'
import AdminPage from './admin/AdminPage'

const StyledDiv = styled.div`
  
  & > div:nth-child(2) {
    min-height: 60vh;
  }
`;


const WebPage = () => {
  return (
    <StyledDiv>
      <Header/>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
        <Route path={ROUTES.SIGNUP} element={<SignupPage/>}/>
        <Route path={ROUTES.ADMIN_MAIN} element={<AdminPage/>}/>
      </Routes>
      <Footer/>
    </StyledDiv>
  )
}

export default WebPage
