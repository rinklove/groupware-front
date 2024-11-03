import React, { useContext, useEffect, useState } from 'react';
import { ROUTES } from '../../constants/routes';
import { Route, Routes } from 'react-router-dom';
import CourseNoticePage from './notice/CourseNoticePage';
import CourseStudyPage from './study/CourseStudyPage';
import styled from 'styled-components';
import { useAuth } from '../../components/hook/UseAuth';
import { TokenContext } from '../../contexts/TokenContext';
import CourseBoardInfoPage from './CourseBoardInfoPage';
import CourseTeamPage from './team/CourseTeamPage';
import AdminCourseSelector from '../../components/common/AdminCourseSelector';
import AttendancePage from '../attendance/AttendancePage';

const ContentWrapper = styled.div`
  margin: auto;
  min-height: 70vh;
  width: 70%;
  min-width: 1000px;
`;

const CoursePage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { token } = useContext(TokenContext);
  const { getUserRole } = useAuth();

  useEffect(() => {
    const getRole = async () => {
      if (!token) return;

      try {
        const res = await getUserRole();
        console.log(res);
        setIsAdmin(res.isAdmin);
      } catch (e) {
        console.error(e);
      }
    };

    getRole();
  }, [token, getUserRole]);

  return (
    <ContentWrapper>
      {
        isAdmin && 
        <AdminCourseSelector onCourseChange={(newCourseId) => console.log(newCourseId)} /> // courseId에 따라 필요한 동작을 수행
      }
      <Routes>
        <Route path={`${ROUTES.NOTICE}/*`} element={<CourseNoticePage isAdmin={isAdmin}/>}/>
        <Route path={`${ROUTES.STUDY}/*`} element={<CourseStudyPage isAdmin={isAdmin}/>}/>
        <Route path={`${ROUTES.TEAM}/*`} element={<CourseTeamPage isAdmin={isAdmin}/>}/>
        <Route path={`${ROUTES.ATTENDANCE}/*`} element={<AttendancePage isAdmin={isAdmin}/>}/>
        <Route path={`${ROUTES.BOARD}${ROUTES.INFO}`} element={<CourseBoardInfoPage/>}/>
      </Routes>
    </ContentWrapper>
  );
};

export default CoursePage;
