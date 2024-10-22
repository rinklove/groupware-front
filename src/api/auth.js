import { LOGIN,LOGOUT,USER,SEND_SIGNUP_FORM,SIGNUP, ROLE } from './url';
import { get, post } from './instance';
import { STATUS } from '../constants/errorCode';

//로그인
export const login = async (data) => {
    const res = await post(LOGIN, JSON.stringify(data));
    console.log(res);
    return res;
}

//회원가입
export const signup = async (data) => {
    const res = await post(SIGNUP, JSON.stringify(data));
    return res;
}

//해당 사용자의 관리자 여부 체크 
export const getUserRole = async () => {
    const res = await get(`${USER}${ROLE}`);
    if(res.status !== STATUS.OK) {
        throw res;
    }
    return res.data.result;
}

//로그아웃
export const logout = async () => {
    const res = await post(LOGOUT, null);
    return res;
}

//회원가입 폼 전송
export const sendSignupForm = async (data) => {
    const res = await post(SEND_SIGNUP_FORM, JSON.stringify(data));
    if (res.status !== STATUS.OK) {
        throw res;
      }
    return res.data;
}


//마이페이지 데이터 조회
export const getMyPage = async () => {
    const res = await get(USER);
    if(res.status !== STATUS.OK) {
        throw res;
    }
    return res.data;
}