import React, { useContext, useState } from 'react'
import CustomButton  from '../../common/CustomButton'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { BASIC_ROUTE, ROUTES } from '../../../constants/routes';
import { TokenContext } from '../../../contexts/TokenContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/UseAuth';

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1.5em; // 아이콘 크기 설정
    cursor: pointer; // 마우스 포인터가 올라갔을 때 손가락 모양으로 변경
`;

const LogoutContainer = ({toggleShow}) => {
  const { removeToken } = useContext(TokenContext);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    if(isFetching) {
      alert(`잠시만 기디려주세요`);
    }
    setIsFetching(true);
    try {
      const res = await logout()
      removeToken();
      alert('로그아웃 완료')
      navigate(ROUTES.HOME);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <>
      <CustomButton
        variant='link'
        innerText='로그아웃'
        onClick={handleLogout}
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
