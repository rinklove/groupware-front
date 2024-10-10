import { get, patch, post } from "./instance";
import { ALL_COURSE, COURSE_ADMIN } from "./url";

//해당 기수의 사람을 불러오기


//코스명 등록
export const addCourse = async (data) =>{
    const res = await post(COURSE_ADMIN, JSON.stringify(data));
    return res;
}

//모든 코스명 가져오기
export const getAllCourse = async () => {
    const res = await get(ALL_COURSE);
    return res;
}

//코스 수정
export const updateCourse = async (data) =>{
    const res = await patch(COURSE_ADMIN, JSON.stringify(data));
    return res;
}