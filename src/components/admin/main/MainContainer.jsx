import React, { useState } from 'react'
import CustomCard from '../../common/CustomCard'
import { BASIC_ROUTE, ROUTES } from '../../../constants/routes'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components';
import CreateForm from '../course/CreateForm';
import CustomButton from '../../common/CustomButton';
import ManageCourseModal from '../course/ManageCourseModal';

const StyledDiv = styled(Container)`
  margin-top: 3em;
  box-sizing: border-box;

  & > h2 {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  & > div.container { //컨테이네
    margin-top: 1em 0;
    height: 100%;
    
    & > h4 {
      margin-top: 1em;
    }
  }
`;

const MainContainer = () => {
  const [showCourseModal, setCourseModal] = useState(false);

  return (
    <StyledDiv>
      <h2>관리자 메뉴</h2>
      <Container>
        <h4>코스</h4>
        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row>
          <Col xs={12} md={12} lg={6} className='col'>
            <CustomCard
              title='코스 생성하기'
              innerText='수강생들을 등록하기 위한 코스 생성'
              width='100%'
            >
              <CreateForm/>
            </CustomCard>
          </Col>
          <Col xs={12} md={12} lg={6} className='col'>
            <CustomCard
              title='코스 관리하기'
              innerText='생성한 코스를 삭제또는 수정하세요.'
            >
              <CustomButton
                type='button'
                variant='success'
                innerText='코스 관리하기'
                color='#ffffff'
                onClick={() => setCourseModal(true)}
              />
              <ManageCourseModal
                show={showCourseModal}
                handleClose={() => setCourseModal(false)}
              />
            </CustomCard>
          </Col>
        </Row>
        <h4>수강생</h4>
        <Row>
          <Col xs={12} md={12} lg={4} className='col'>
            <CustomCard
              title='코스에 수강생 등록하기'
              innerText='생성한 코스에 수강생을 초대하세요'
              href={`${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.COURSE}${ROUTES.INVITE}`}
              hrefText='코스에 수강생 등록하러 이동하기'
              width='100%'
            />
          </Col>
          <Col xs={12} md={12} lg={4} >
            <CustomCard
              title='수강생 제적하기'
              innerText='수강생 제적하기'
              href={`${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.COURSE}${ROUTES.INVITE}`}
              hrefText='코스에 수강생 등록하러 이동하기'
              width='100%'
            />
          </Col>
          <Col xs={12} md={12} lg={4} >
            <CustomCard
              title='프로젝트 팀 생성하기'
              innerText='프로젝트 팀을 만들어보세요!'
              href={`${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.COURSE}${ROUTES.TEAM}`}
              hrefText='프로젝트 팀 생성'
              width='100%'
            />
          </Col>
        </Row>
      </Container>
    </StyledDiv>
  )
}

export default MainContainer
