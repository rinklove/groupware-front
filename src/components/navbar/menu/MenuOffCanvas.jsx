import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { BASIC_ROUTE, ROUTES } from '../../../constants/routes';
import { useLocation } from 'react-router-dom';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1.5em;
    cursor: pointer;
`;

const SidebarToggle = styled.div`
  position: fixed; /* 고정 위치 */
  top: 10px; /* 상단 고정 */
  left: ${(props) => (props.show ? '250px' : '10px')}; /* 사이드바가 보일 때 위치 조정 */
  z-index: 1040;
  color: #0f1317;
  transition: left 0.3s ease; /* 위치 이동 애니메이션 */
  margin: 1em;
`;

const CustomOffcanvas = styled.div`
  width: 250px; /* 너비 조정 */
  height: 100vh; /* 전체 화면 높이 설정 */
  background-color: #1A2333;
  color: #fff;
  position: fixed; /* 고정 위치 */
  top: 0; /* 상단 고정 */
  left: 0; /* 좌측 고정 */
  transform: translateX(${(props) => (props.show ? '0' : '-100%')}); /* 사이드바의 이동 애니메이션 */
  transition: transform 0.3s ease;
  z-index: 1030; /* 다른 요소 위에 표시되도록 z-index 설정 */
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

const MenuOffCanvas = ({ showSidebar, toggleSidebar }) => {
  const location = useLocation(); // 현재 경로를 가져옴
  useEffect(() => {

  }, [])

  return (
    <>
      <SidebarToggle show={showSidebar} onClick={toggleSidebar}>
        <StyledFontAwesomeIcon icon={faBars} />
      </SidebarToggle>
      <CustomOffcanvas show={showSidebar}>
        <div>
          <h5>사용자 메뉴</h5>
        </div>
        <CustomNav>
          <Nav.Link
            href={`${BASIC_ROUTE}${ROUTES.TEAM}`}
            className={location.pathname === `${BASIC_ROUTE}${ROUTES.TEAM}` ? 'active' : ''}
          >
            팀
          </Nav.Link>
          <Nav.Link
            href={`${BASIC_ROUTE}${ROUTES.CHAT}`}
            className={location.pathname === `${BASIC_ROUTE}${ROUTES.CHAT}` ? 'active' : ''}
          >
            채팅방
          </Nav.Link>
          <Nav.Link
            href={`${BASIC_ROUTE}${ROUTES.COURSE}${ROUTES.NOTICE}${ROUTES.LIST}`}
            className={location.pathname === `${BASIC_ROUTE}${ROUTES.COURSE}${ROUTES.NOTICE}${ROUTES.LIST}` ? 'active' : ''}
          >
            공지사항
          </Nav.Link>
          <Nav.Link
            href={`${BASIC_ROUTE}${ROUTES.COURSE}${ROUTES.STUDY}${ROUTES.LIST}`}
            className={location.pathname === `${BASIC_ROUTE}${ROUTES.COURSE}${ROUTES.STUDY}${ROUTES.LIST}` ? 'active' : ''}
          >
            스터디 모집
          </Nav.Link>
          <Nav.Link
            href={`${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.MAIN}`}
            className={location.pathname === `${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.MAIN}` ? 'active' : ''}
          >
            관리자 메뉴
          </Nav.Link>
        </CustomNav>
      </CustomOffcanvas>
    </>
  );
};

export default MenuOffCanvas;
