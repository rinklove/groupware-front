import React, { useContext, useEffect } from 'react';
import { useApi } from './UseApi';
import { COURSE_BOARD, PAGE } from '../../api/url';
import { COURSE } from '../../constants/belonging';
import { HttpStatusCode } from 'axios';
import { useCourse } from './UseCourse';

const useBoardApi = () => {
  const { get, post } = useApi();
  const { courseId, enterCourse } = useCourse();

  useEffect(() => {
    const storedCourse = localStorage.getItem(COURSE);
    if (storedCourse) {
      enterCourse(storedCourse); // localStorage에서 courseId 가져와 설정
    }
  }, [enterCourse]); // enterCourse가 변할 때만 실행

  const getUrl = (boardId) => (boardId ? `&boardId=${boardId}` : '');

  const getCourseNotice = async (boardId) => {
    if (!courseId) {
      throw new Error("courseId가 설정되지 않았습니다."); // courseId가 없을 경우 에러 처리
    }
    const url = `${COURSE_BOARD}?courseId=${courseId}${getUrl(boardId)}&isNotice=y`;
    const res = await get(url);
    return res;
  };

  const getCourseNoticePaging = async () => {
    if (!courseId) {
      throw new Error("courseId가 설정되지 않았습니다."); // courseId가 없을 경우 에러 처리
    }
    const url = `${COURSE_BOARD}${PAGE}?courseId=${courseId}&isNotice=y`;
    const res = await get(url);
    return res;
  };

  const getCourseStudy = async (boardId) => {
    if (!courseId) {
      throw new Error("courseId가 설정되지 않았습니다."); // courseId가 없을 경우 에러 처리
    }
    const url = `${COURSE_BOARD}?courseId=${courseId}${getUrl(boardId)}&isNotice=n`;
    const res = await get(url);
    return res;
  };

  const getCourseStudyPaging = async () => {
    if (!courseId) {
      throw new Error("courseId가 설정되지 않았습니다."); // courseId가 없을 경우 에러 처리
    }
    const url = `${COURSE_BOARD}${PAGE}?courseId=${courseId}&isNotice=n`;
    const res = await get(url);
    return res;
  };

  const writeCourseStudyBoard = async (data) => {
    if (!courseId) {
      throw new Error("courseId가 설정되지 않았습니다."); // courseId가 없을 경우 에러 처리
    }
    const res = await post(COURSE_BOARD, data);
    if (res.status !== HttpStatusCode.Ok) {
      throw res.data;
    }
    return res.data.result;
  };

  const getBoardById = async (id) => {
    if (!courseId) {
      throw new Error("courseId가 설정되지 않았습니다."); // courseId가 없을 경우 에러 처리
    }
    const res = await get(`${COURSE_BOARD}/${id}`);
    return res;
  };

  return { 
    getCourseNotice, 
    getCourseNoticePaging, 
    getCourseStudy, 
    getCourseStudyPaging,
    writeCourseStudyBoard,
    getBoardById
  };
};

export default useBoardApi;
