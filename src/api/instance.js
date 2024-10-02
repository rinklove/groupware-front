import axios from "axios";
import { BEARER } from "../constants/auth";
import { ACCESS_TOKEN } from "../constants/auth";

const basicRequest = axios.create({
    baseURL: process.env.REACT_APP_SERVER_IP, // 서버의 기본 URL을 지정
    withCredentials: true, // 쿠키를 포함해서 요청을 보냄
});

// 토큰 설정을 위한 인터셉터 추가
basicRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN); // TokenContext에서 token 가져오기
    if (token) {
      config.headers.Authorization = `${BEARER} ${token}`; // 토큰이 있을 때만 Authorization 헤더 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async (url) => {
    try {
        const res = await basicRequest.get(url);
        console.log(`GET 응답 결과: ${res}`);
        return res;
    } catch (error) {
        console.error(`GET 요청 에러: ${error}`);
        throw error;
    }
}

export const post = async (url, data) => {
    try {
        const res = await basicRequest.post(url, data);  // 데이터를 함께 전송
        console.log(`POST 응답 결과: ${res}`);
        return res;
    } catch (error) {
        console.error(`POST 요청 에러: ${error}`);
        throw error;
    }
}
