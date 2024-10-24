import React from 'react'
import { LOGIN, LOGOUT, ROLE, SEND_SIGNUP_FORM, SIGNUP, USER } from '../../api/url';
import { useApi } from './UseApi';
import { HttpStatusCode } from 'axios';

export const useAuth = () => {
  const { get, post } = useApi();

  //로그인
  const login = async (data) => {
    const res = await post(LOGIN, data);
    console.log(res);
    return res;
  }

  //회원가입
  const signup = async (data) => {
    const res = await post(SIGNUP, data);
    return res;
  }

  //해당 사용자의 관리자 여부 체크 
  const getUserRole = async () => {
    const res = await get(`${USER}${ROLE}`);
    return res;
  }

  //로그아웃
  const logout = async () => {
    const res = await post(LOGOUT, null);
    return res;
  }

  //회원가입 폼 전송
  const sendSignupForm = async (data) => {
    const res = await post(SEND_SIGNUP_FORM, data);

    if (res.status !== HttpStatusCode.Ok) {
        throw res;
      }
    return res.data;
  }


  //마이페이지 데이터 조회
  const getMyPage = async () => {
    const res = await get(USER);
    return res;
  }

  return { login, signup, getUserRole, logout, sendSignupForm, getMyPage }
}

