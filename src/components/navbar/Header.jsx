import React from 'react'
import UserContainer from './user/UserContainer'
import styled from 'styled-components';
import MainLogo from './logo/MainLogo';


const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between; /* 요소를 양 끝으로 배치 */
    align-items: center;
    padding: 0 1rem; /* 좌우에 여백 추가 */
    box-sizing: border-box;
    height: 80px; /* 헤더 높이 설정 */
`;

const Header = () => {
  return (
    <StyledHeader>
      <MainLogo/>
      <UserContainer/>
    </StyledHeader>
  )
}

export default Header
