import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/navbar/Header';
import { ROUTES } from '../constants/routes';
import Home from './Home';
import LoginPage from './LoginPage';
import EditPage from './EditPage';
import Footer from '../components/common/Footer';
import AdminPage from './admin/AdminPage';
import CoursePage from './course/CoursePage';
import MenuOffCanvas from '../components/navbar/menu/MenuOffCanvas';
import styled from 'styled-components';
import TeamPage from './team/TeamPage';
import useSideBar from '../components/hook/UseSideBar';
import ChatPage from './chat/ChatPage';

const ContentWrapper = styled.div`
  margin-left: ${({ showSidebar }) => (showSidebar ? '250px' : '0')}; /* 사이드바가 열릴 때 본문 너비 조정 */
  transition: margin-left 0.3s ease; /* 애니메이션 효과 */

  & > div:nth-child(2) {
    box-sizing: border-box;
  }
`;

const WebPageContent = () => {
  const {showSidebar, toggleSidebar} = useSideBar()
  return (
    <>
      <MenuOffCanvas show={showSidebar} toggleSidebar={toggleSidebar} />
      <ContentWrapper showSidebar={showSidebar}>
        <Header />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.EDIT} element={<EditPage />} />
          <Route path={`${ROUTES.COURSE}/*`} element={<CoursePage />} />
          <Route path={`${ROUTES.TEAM}/*`} element={<TeamPage />} />
          <Route path={`${ROUTES.ADMIN}/*`} element={<AdminPage />} />
        </Routes>
        <Footer />
      </ContentWrapper>
    </>
  );
};

export default WebPageContent;
