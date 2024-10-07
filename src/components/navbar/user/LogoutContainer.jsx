import React from 'react'
import CustomButton  from '../../common/CustomButton'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { BASIC_ROUTE, ROUTES } from '../../../constants/routes';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1.5em; // 아이콘 크기 설정
    cursor: pointer; // 마우스 포인터가 올라갔을 때 손가락 모양으로 변경
`;

const LogoutContainer = ({toggleShow}) => {
  return (
    <>
      <CustomButton
        variant='link'
        innerText='로그아웃'
        onclick={() => console.log(`로그아웃 함수 넣어야 함`)}
      />
      <CustomButton
        variant='link'
        innerText='마이페이지'
        href={`${BASIC_ROUTE}${ROUTES.EDIT}`}
      />
      <StyledFontAwesomeIcon icon={faBars} onClick={toggleShow}/>
    </>
  )
}

export default LogoutContainer
