import React from 'react'
import CustomCard from '../../common/CustomCard'
import { BASIC_ROUTE, ROUTES } from '../../../constants/routes'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components';

const StyledDiv = styled(Container)`
  margin-top: 3em;

  & > div {
    margin-top: 2em;
    height: 100%;
    overflow-y: auto;
  }
`;

const MainContainer = () => {
  return (
    <StyledDiv>
      <h2>관리자 메뉴</h2>
      <Container>
        {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
        <Row>
          <Col xs={12} md={12} lg={4}>
            <CustomCard
              title='코스 생성하기'
              innerText='수강생들을 등록하기 위한 코스 생성'
              href={`${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.COURSE}${ROUTES.NEW}`}
              hrefText='코스 생성하러 이동하기'
              width='100%'
            />
          </Col>
          <Col xs={12} md={12} lg={4}>
            <CustomCard
              title='코스에 수강생 등록하기'
              innerText='생성한 코스에 수강생을 초대하세요'
              href={`${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.COURSE}${ROUTES.INVITE}`}
              hrefText='코스에 수강생 등록하러 이동하기'
              width='100%'
            />
          </Col>
          <Col xs={12} md={12} lg={4}>
            <CustomCard
              title='수강생 제적하기'
              innerText='수강생 제적하기'
              href={`${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.COURSE}${ROUTES.INVITE}`}
              hrefText='코스에 수강생 등록하러 이동하기'
              width='100%'
            />
          </Col>
        </Row>
      </Container>
    </StyledDiv>
  )
}

export default MainContainer
