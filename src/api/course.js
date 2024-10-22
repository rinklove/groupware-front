import { STATUS } from "../constants/errorCode";
import { get, patch, post } from "./instance";
import { ADMIN, ALL_COURSE, COURSE_ADMIN, USERS } from "./url";

//해당 기수의 사람을 불러오기
export const fetchUsersByCourse = async (courseId) => {
    const res = await get(`${COURSE_ADMIN}/${courseId}${USERS}`);
    if(res.status !== STATUS.OK) {
        throw res;
    }
    return res.data;
}

//코스명 등록
export const addCourse = async (data) =>{
    const res = await post(COURSE_ADMIN, JSON.stringify(data));
    return res;
}

//모든 코스명 가져오기
export const fetchAllCourse = async () => {
    const res = await get(ALL_COURSE);
    if (res.status !== STATUS.OK) {
        throw res;
      }
    return res.data.result;
}

//코스 수정
export const updateCourse = async (data) =>{
    const res = await patch(COURSE_ADMIN, JSON.stringify(data));
    return res;
}