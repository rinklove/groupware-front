import axios from "axios";
import { BEARER, ACCESS_TOKEN } from "../constants/auth";

// 기본 Axios 인스턴스 생성
const basicRequest = axios.create({
    baseURL: "http://localhost:8080/api", // 서버의 기본 URL을 지정
    headers: {
        "Content-Type": 'application/json'
    }
});

// 토큰 설정을 위한 인터셉터 추가
basicRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN); // TokenContext에서 token 가져오기
        if (token) {
            config.headers.Authorization = `${BEARER}${token}`; // 토큰이 있을 때만 Authorization 헤더 추가
        }
        return config;
    },
    (error) => 
        Promise.reject(error)
);

// GET 요청 함수
export const get = async (url) => {
    try {
        const res = await basicRequest.get(url);
        console.log(`GET 응답 결과:`, res.data); // 응답 데이터 출력
        return res; // 응답 데이터만 반환
    } catch (error) {
        // 에러 핸들링: 응답이 있을 경우, 응답 데이터를 출력
        console.error(`GET 요청 에러:`, error.response ? error.response.data : error.message);
        return error.response;
    }
}

// POST 요청 함수
export const post = async (url, data) => {
    try {
        const res = await basicRequest.post(url, data);
        console.log(`POST 응답 결과:`, res.data); // 응답 데이터 출력
        return res; 
    } catch (error) {
        // 에러 핸들링: 응답이 있을 경우, 응답 데이터를 출력
        console.error(`POST 요청 에러:`, error.response ? error.response.data : error.message);
        return error.response;
    }
}

//PATCH 요청 함수
export const patch = async (url, data) => {
    try {
        const res = await basicRequest.patch(url, data);
        console.log(`PATCH 응답 결과(res.data):`, res.data); // 응답 데이터 출력
        return res; 
    } catch (error) {
        // 에러 핸들링: 응답이 있을 경우, 응답 데이터를 출력
        console.error(`POST 요청 에러:`, error.response ? error.response.data : error.message);
        return error.response;
    }
}
