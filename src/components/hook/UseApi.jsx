import { useContext } from "react";
import { ApiContext } from "../../contexts/ApiContext";
import { HttpStatusCode } from "axios";

export const useApi = () => {
    const basicRequest = useContext(ApiContext);

    // 기본 요청이 준비되지 않은 경우 에러 처리
    if (!basicRequest) {
      console.error(`요청 준비x`);
    }

    const get = async (url) => {
        try {
            const res = await basicRequest.get(url);
            console.log("GET 응답 결과:", res.data);
            if(res.status !== HttpStatusCode.Ok) {
              throw res
            }

            return res.data.result;
        } catch (error) {
            console.error("GET 요청 에러:", error.response ? error.response.data : error.message);
            return error.response;
        }
    };

    const post = async (url, data) => {
        try {    
            const res = await basicRequest.post(url, JSON.stringify(data));
            console.log(`post method 내부 res =`, res);
            return res;
        } catch (error) {
            console.error("POST 요청 에러:", error.response ? error.response.data : error.message);
            return error.response;
        }
    };

    const patch = async (url, data) => {
        try {
            const res = await basicRequest.patch(url, JSON.stringify(data));
            console.log("PATCH 응답 결과:", res.data);
            return res;
        } catch (error) {
            console.error("PATCH 요청 에러:", error.response ? error.response.data : error.message);
            return error.response;
        }
    };

    return { get, post, patch };
};
