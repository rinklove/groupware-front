import { HttpStatusCode } from 'axios';
import React from 'react'
import { ALL_COURSE, COURSE_ADMIN, USERS } from '../../api/url';
import { useApi } from './UseApi';

export const useCourseApi = () => {
  const { get, post, patch } = useApi(); 
  
  //해당 기수의 사람을 불러오기
  const fetchUsersByCourse = async (courseId) => {
    const res = await get(`${COURSE_ADMIN}/${courseId}${USERS}`);
    if(res.status !== HttpStatusCode.Ok) {
        throw res;
    }
    return res;
  }

  //코스명 등록
  const addCourse = async (data) =>{
    const res = await post(COURSE_ADMIN, JSON.stringify(data));
    if(res.status !== HttpStatusCode.Created) {
      throw res;
    }

    return res;
  }

  //모든 코스명 가져오기
  const fetchAllCourse = async () => {
    const res = await get(ALL_COURSE);
    return res;
  }

  //코스 수정
  const updateCourse = async (data) =>{
    const res = await patch(COURSE_ADMIN, data);
    if(res.status !== HttpStatusCode.Ok) {
      throw res;
    }
    return res;
  }
  
  return { fetchUsersByCourse, addCourse, fetchAllCourse, updateCourse }
}
