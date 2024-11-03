import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import styled from 'styled-components'

const StyledNavbar = styled(Navbar)`
  margin-top: 1em;
`

const TeamNavbar = () => {
  const location = useLocation()
  return (
    <StyledNavbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="me-auto">
          <Nav.Link 
            as={Link}
            to={`${ROUTES.TEAM}${ROUTES.BOARD}${ROUTES.LIST}`}
            className={location.pathname === `${ROUTES.TEAM}${ROUTES.BOARD}${ROUTES.LIST}` ? 'active' : ''}
          >
            팀 게시글
          </Nav.Link>
          <Nav.Link 
            as={Link}
            to={`${ROUTES.TEAM}${ROUTES.SCHEDULE}${ROUTES.LIST}`}
            className={location.pathname === `${ROUTES.TEAM}${ROUTES.SCHEDULE}${ROUTES.LIST}` ? 'active' : ''}
          >
            일정
          </Nav.Link>
          <Nav.Link 
            as={Link}
            to={`${ROUTES.TEAM}${ROUTES.SETTING}`}
            className={location.pathname === `${ROUTES.TEAM}${ROUTES.SETTING}` ? 'active' : ''}
          >
            팀 설정
          </Nav.Link>
          {
            location.pathname !== `${ROUTES.TEAM}${ROUTES.MAIN}` &&
            <Nav.Link 
              as={Link}
              to={`${ROUTES.TEAM}${ROUTES.MAIN}`}
            >
              팀 메인화면으로 이동하기
            </Nav.Link>
          }
        </Nav>
      </Container>
    </StyledNavbar>
  )
}

export default TeamNavbar
