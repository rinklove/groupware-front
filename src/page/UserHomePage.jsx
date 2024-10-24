import React, { useContext, useEffect, useState } from 'react';
import CourseBoardContainer from '../components/home/CourseBoardContainer';
import CalenderContainer from '../components/home/CalenderContainer';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import TeamContainer from '../components/home/TeamContainer';
import CourseContainer from '../components/course/CourseContainer';
import { TokenContext } from '../contexts/TokenContext';
import { useAuth } from '../components/hook/UseAuth';

const ContainerDiv = styled.div`
  width: 95vw;
  padding: 0;
  overflow-x: hidden;
  margin: auto;

  & > div.container {
    width: 80vw; /* 너비를 80vw로 조정하여 조금 더 좁게 만듦 */
  }
`;

const StyledCol = styled(Col)`
  margin: 2em 0;
  box-sizing: border-box;
  
`;

const UserHomePage = () => {
  const[isAdmin, setIsAdmin] = useState(false);
  const[courseId, setCourseId] = useState(null);
  const { token } = useContext(TokenContext)
  const { getUserRole } = useAuth();
  
  useEffect(() => {
    const getRole = async () => {
      if(!token) return

      try {
        const res = await getUserRole()
        console.log(res);
        
        setIsAdmin(res.isAdmin);
      } catch (e) {
        console.error(e);
      }
    }

    getRole();
  }, []);

  const changeCourse = (value) => {
    console.log(value)
    if(value < 1) return;
    setCourseId(value)
  }

  return (
    <ContainerDiv>
      <Container fluid>
        {
          isAdmin && 
          <Row>
            <Col md={12} xl={12}>
              <CourseContainer
                isAdmin={isAdmin}
                onSelect={(e) => changeCourse(e)}
              />
            </Col>
          </Row>
        }
        {
          (courseId || !isAdmin) &&
          <Row>
            {/* 첫 번째 줄: 공지사항과 캘린더 */}
            <StyledCol md={12} xl={5}>
              <CourseBoardContainer
                courseId={courseId}
                isAdmin={isAdmin}
              />
            </StyledCol>
            <StyledCol md={12} xl={7}>
               <CalenderContainer 
                courseId={courseId} 
                isAdmin={isAdmin}
              />
            </StyledCol>
          </Row>
        }
        {
          courseId && 
          <Row>
            <StyledCol md={12} xl={5}>
              <TeamContainer
                isAdmin={isAdmin}
                courseId={courseId}
              />
            </StyledCol>
            <StyledCol md={12} xl={6}>
              {/* <CalenderContainer /> */}
            </StyledCol>
          </Row>
        }
      </Container>
    </ContainerDiv>
  );
};

export default UserHomePage;
