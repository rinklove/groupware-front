import { HttpStatusCode } from 'axios';
import React from 'react'
import { ALL_COURSE, COURSE, COURSE_ADMIN, COURSE_USERS, TOTAL_USERS, USERS } from '../../api/url';
import { useApi } from './UseApi';
import { useCourse } from './UseCourse';

export const useCourseApi = () => {
  const { get, post, patch } = useApi(); 
  const { courseId } = useCourse()
  //해당 기수의 사람을 불러오기
  //관리자전용
  const fetchUsersByCourse = async (courseId) => {
    const res = await get(`${COURSE_ADMIN}/${courseId}${USERS}`);
    return res;
  }

  const fetchAllUserByCourseIdForAdmin = async () => {
    const url = `${COURSE_ADMIN}${courseId}${TOTAL_USERS}`
    const res = await get(url);
    return res
  }

  const fetchAllUser = async () => {
    const url = `${COURSE}${TOTAL_USERS}`
    const res = await get(url);
    return res
  }

  const fetchCourseUsers = async () => {
    const res = await get(COURSE_USERS);
    return res
  }

  //코스명 등록
  const addCourse = async (data) =>{
    const res = await post(COURSE_ADMIN, data);
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
    return res;
  }
  
  return { 
    fetchUsersByCourse, 
    fetchAllUserByCourseIdForAdmin,
    fetchAllUser,
    fetchCourseUsers, 
    addCourse, 
    fetchAllCourse, 
    updateCourse 
  }
}
