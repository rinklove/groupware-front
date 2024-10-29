import React, { useState, useMemo, useContext, createContext } from "react";
import axios, { HttpStatusCode } from "axios";
import { ACCESS_TOKEN, BEARER, REFRESH_TOKEN } from "../constants/auth";
import { TokenContext } from "../contexts/TokenContext";

// ApiContext 생성
export const ApiContext = createContext();

const baseURL = "http://localhost:8080/api";

export const ApiProvider = ({ children }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { token, saveToken } = useContext(TokenContext);
    const [failedQueue, setFailedQueue] = useState([]);

    // Axios 인스턴스 생성
    const basicRequest = useMemo(() => {
        const request = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-Type": "application/json",
            },
        });

        // 요청 인터셉터
        request.interceptors.request.use(
          (config) => {
            // token을 다시 확인하여 localStorage에서 가져오기
            const currentToken = token || localStorage.getItem(ACCESS_TOKEN);
            if (currentToken) {
              config.headers.Authorization = `${BEARER}${currentToken}`;
            }
            return config;
          },
          (error) => Promise.reject(error)
        );

        // 응답 인터셉터
        request.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (!originalRequest) return Promise.reject(error);

                // 이미 재시도한 요청인지 확인
                if (originalRequest._retry) {
                    return Promise.reject(error);
                }

                // Unauthorized 에러 처리
                if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            setFailedQueue((prevQueue) => [...prevQueue, { resolve, reject }]);
                        })
                            .then((newToken) => {
                                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                                return axios(originalRequest); // 여기서 axios 직접 호출
                            })
                            .catch((err) => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    setIsRefreshing(true);

                    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                    if (refreshToken) {
                        try {
                            const res = await axios({
                                method: "get",
                                url: `${baseURL}/reissue-token`,
                                headers: {
                                    "Authorization-refresh": `${BEARER}${refreshToken}`,
                                },
                            });

                            const newAccessToken = res.headers["authorization"];
                            const newRefreshToken = res.headers["authorization-refresh"];

                            saveToken(newAccessToken, newRefreshToken);

                            // 큐에 있는 요청 처리
                            processQueue(null, newAccessToken);

                            // 기존 요청에 새로운 토큰 적용하여 재시도
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axios(originalRequest); // 원래 요청을 다시 보냄
                        } catch (refreshError) {
                            processQueue(refreshError);
                            return Promise.reject(refreshError);
                        } finally {
                            setIsRefreshing(false);
                        }
                    }
                }
                return Promise.reject(error);
            }
        );

        return request;
    }, [token]);

    // 큐에 있는 요청 처리
    const processQueue = (error, newToken = null) => {
        failedQueue.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(newToken);
            }
        });
        setFailedQueue([]); // 큐 초기화
    };

    return (
        <ApiContext.Provider value={basicRequest}>
            {children}
        </ApiContext.Provider>
    );
};
