import React from 'react';
import CourseBoardContainer from '../components/home/CourseBoardContainer';
import CalenderContainer from '../components/home/CalenderContainer';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const ContainerDiv = styled.div`
  width: 100vw;
  padding: 0;
  overflow-x: hidden;

  & > div.container {
    width: 80vw; /* 너비를 80vw로 조정하여 조금 더 좁게 만듦 */
  }
`;

const StyledCol = styled(Col)`
  margin: 2em 0;
`;

const UserHomePage = () => {
  return (
    <ContainerDiv>
      <Container fluid>
        <Row>
          {/* 첫 번째 줄: 공지사항과 캘린더 */}
          <StyledCol md={12} xl={5}>
            <CourseBoardContainer />
          </StyledCol>
          <StyledCol md={12} xl={7}>
            <CalenderContainer />
          </StyledCol>
        </Row>
        {/* <Row>
          <StyledCol md={12} xl={5}>
            <CourseBoardContainer />
          </StyledCol>
          <StyledCol md={12} xl={7}>
            <CalenderContainer />
          </StyledCol>
        </Row> */}
      </Container>
    </ContainerDiv>
  );
};

export default UserHomePage;
