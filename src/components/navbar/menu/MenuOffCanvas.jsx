import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Nav } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import { BASIC_ROUTE, ROUTES } from '../../../constants/routes';

const options = [
  {
    name: 'Enable both scrolling & backdrop',
    scroll: true,
    backdrop: true,
  },
];

const CustomOffcanvas = styled(Offcanvas)`
    background-color: #212529; /* 원하는 배경색으로 변경 */
    color: #fff; /* 텍스트 색상 변경 */
`;

const CustomOffcanvasHeader = styled(Offcanvas.Header)`
    background-color: #212529; /* 헤더 배경색 변경 */
    color: #fff; /* 헤더 텍스트 색상 변경 */

    .btn-close {
        filter: invert(1); /* 색상을 밝게 변경 */
    }
`;

const CustomNav = styled(Nav)`
    flex-direction: column; /* Nav를 세로로 정렬 */
    .nav-link {
        color: #fff;
        &:hover {
            color: #adb5bd; /* 호버 시 색상 변경 */
        }
    }
`;

const MenuOffCanvas = ({ onhide, show, toggleShow, ...props }) => {
  
  return (
    <>
      <CustomOffcanvas 
        show={show} 
        onHide={onhide} 
				scroll={options[0].scroll} // 스크롤 옵션 적용
        backdrop={options[0].backdrop} // 배경 옵션 적용
        {...props}
      >
        <CustomOffcanvasHeader closeButton>
          <Offcanvas.Title>사용자 메뉴</Offcanvas.Title>
        </CustomOffcanvasHeader>
        	<Offcanvas.Body>
						<CustomNav>
							<Nav.Link href={`${BASIC_ROUTE}${ROUTES.TEAM}`}>팀</Nav.Link>
							<Nav.Link href={`${BASIC_ROUTE}${ROUTES.CHAT}`}>채팅방</Nav.Link>
							<Nav.Link href={`${BASIC_ROUTE}${ROUTES.NOTICE}`}>공지사항</Nav.Link>
							<Nav.Link href={`${BASIC_ROUTE}${ROUTES.STUDY}`}>스터디 모집</Nav.Link>
							<Nav.Link href={`${BASIC_ROUTE}${ROUTES.ADMIN}${ROUTES.MAIN}`}>관리자 메뉴</Nav.Link>
          </CustomNav>
        </Offcanvas.Body>
      </CustomOffcanvas>
    </>
  );
}

export default MenuOffCanvas;
