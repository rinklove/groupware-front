import React, { useContext, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BASIC_ROUTE, ROUTES } from '../../../constants/routes';
import { Link, useLocation } from 'react-router-dom';
import { TokenContext } from '../../../contexts/TokenContext';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1.5em;
    cursor: pointer;
`;

const SidebarToggle = styled.div`
  position: fixed; /* 고정 위치 */
  top: 10px; /* 상단 고정 */
  left: ${({show}) => (show ? '250px' : '10px')}; /* 사이드바가 보일 때 위치 조정 */
  z-index: 1040;
  color: #0f1317;
  transition: left 0.3s ease; /* 위치 이동 애니메이션 */
  margin: 1em;
`;

const CustomOffcanvas = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #1A2333;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(${({ show }) => (show ? '0' : '-100%')}); /* 애니메이션 */
  transition: transform 0.3s ease;
  z-index: 1030;
  padding: 2em;
`;

const CustomNav = styled(Nav)`
  flex-direction: column;
  .nav-link {
    color: #fff;
    &:hover {
      color: #1A2333;
      background-color: #adb5bd;
    }
    &.active {
      color: #1A2333; /* 선택된 링크의 색상 */
      background-color: #adb5bd; /* 선택된 링크의 배경색 */
    }
  }
`;

const MenuOffCanvas = ({ show, toggleSidebar }) => {
  const location = useLocation(); // 현재 경로를 가져옴
  const { token } = useContext(TokenContext);
  
  return (
    <>
      {
        token &&
        <SidebarToggle show={show} onClick={toggleSidebar}>
          <StyledFontAwesomeIcon icon={faBars} />
        </SidebarToggle>
      }
      <CustomOffcanvas show={show}>
        <div>
          <h5>코스 내 이동하기</h5>
        </div>
        <CustomNav>
          <Nav.Link
            as={Link}
            to={`${ROUTES.COURSE}${ROUTES.TEAM}${ROUTES.LIST}`}
            className={location.pathname === `${ROUTES.COURSE}${ROUTES.TEAM}${ROUTES.LIST}` ? 'active' : ''}
          >
            팀
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={`${ROUTES.COURSE}${ROUTES.ATTENDANCE}${ROUTES.LIST}`}
            className={location.pathname === `${ROUTES.COURSE}${ROUTES.ATTENDANCE}${ROUTES.LIST}` ? 'active' : ''}
          >
            출결
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={`${BASIC_ROUTE}${ROUTES.CHAT}`}
            className={location.pathname === `${BASIC_ROUTE}${ROUTES.CHAT}` ? 'active' : ''}
          >
            채팅방
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={`${ROUTES.COURSE}${ROUTES.NOTICE}${ROUTES.LIST}`}
            className={location.pathname === `${ROUTES.COURSE}${ROUTES.NOTICE}${ROUTES.LIST}` ? 'active' : ''}
          >
            공지사항
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={`${ROUTES.COURSE}${ROUTES.STUDY}${ROUTES.LIST}`}
            className={location.pathname === `${ROUTES.COURSE}${ROUTES.STUDY}${ROUTES.LIST}` ? 'active' : ''}
          >
            스터디 모집
          </Nav.Link>
          <Nav.Link
            as={Link}
            to={`${ROUTES.ADMIN}${ROUTES.MAIN}`}
            className={location.pathname === `${ROUTES.ADMIN}${ROUTES.MAIN}` ? 'active' : ''}
          >
            관리자 메뉴
          </Nav.Link>
        </CustomNav>
      </CustomOffcanvas>
    </>
  );
};

export default MenuOffCanvas;