import React, { useState } from 'react'
import UserContainer from './user/UserContainer'
import styled from 'styled-components';
import MainLogo from './logo/MainLogo';
import MenuOffCanvas from './menu/MenuOffCanvas';


const StyledHeader = styled.div`
    display: flex;
    justify-content: space-around; /* 요소를 양 끝으로 배치 */
    align-items: center;
    padding: 0 1rem; /* 좌우에 여백 추가 */
    box-sizing: border-box;
    height: 80px; /* 헤더 높이 설정 */
    position: sticky; /* 상단에 고정 */
    top: 0; /* 상단에서 0 위치 */
    left: 0; /* 왼쪽에서 0 위치 */
    width: 100%; /* 전체 화면 너비 */
    background-color: white; /* 배경색 설정 */
    z-index: 1000; /* 다른 요소 위에 표시되도록 z-index 설정 */
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); /* 살짝 그림자 추가 */
`;

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <StyledHeader>
      <MenuOffCanvas
        onhide={handleClose}
        show={show}
        toggleShow={toggleShow}
      />
      <MainLogo/>
      <UserContainer toggleShow={toggleShow}/>
    </StyledHeader>
  )
}

export default Header
