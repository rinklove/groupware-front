import React, { useContext, useState } from 'react'
import CustomButton  from '../../common/CustomButton'
import { BASIC_ROUTE, ROUTES } from '../../../constants/routes';
import { TokenContext } from '../../../contexts/TokenContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/UseAuth';
import useSideBar from '../../hook/UseSideBar';

const LogoutContainer = () => {
  const { removeToken } = useContext(TokenContext);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { closeSidebar } = useSideBar()

  const handleLogout = async () => {
    if (isFetching) {
      alert('잠시만 기다려주세요');
      return;
    }
  
    setIsFetching(true);
    try {
      const res = await logout();
      removeToken();
      closeSidebar(); // 로그아웃 시 Sidebar 닫기
      alert('로그아웃 완료');
      navigate(ROUTES.HOME);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

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
      
    </>
  )
}

export default LogoutContainer
