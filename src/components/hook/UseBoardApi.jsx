import React, { useContext, useEffect } from 'react';
import { useApi } from './UseApi';
import { COURSE_BOARD, PAGE, TEAM_BOARD } from '../../api/url';
import { COURSE } from '../../constants/belonging';
import { HttpStatusCode } from 'axios';
import { useCourse } from './UseCourse';

const useBoardApi = () => {
  const { get, post } = useApi();
  const { courseId } = useCourse();

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
    const res = await get(`${COURSE_BOARD}/${id}`);
    return res;
  };

  const getTeamBoard = async (teamId, categoryId, boardId) => {
    const url = `${TEAM_BOARD}?teamId=${teamId}${createCategoryQueryString(categoryId)}${getUrl(boardId)}`
    const res = await get(url)
    return res
  }

  const getTeamBoardPaging = async (teamId, categoryId) => {
    const url = `${TEAM_BOARD}${PAGE}?teamId=${teamId}${createCategoryQueryString(categoryId)}`
    const res = await get(url)
    return res
  }

  const createCategoryQueryString = (categoryId) => 
    (categoryId ? `&categoryId=${categoryId}` : '')
  
  const writeTeamBoard = async (data) => {
    const res = await post(`${TEAM_BOARD}`, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res.data
    }
    return res.data.result
  }

  const getTeamBoardById = async (boardId) => {
    const url = `${TEAM_BOARD}/${boardId}`;
    const res = await get(url);
    return res;
  };

  return { 
    getCourseNotice, 
    getCourseNoticePaging, 
    getCourseStudy, 
    getCourseStudyPaging,
    writeCourseStudyBoard,
    getBoardById,
    getTeamBoard,
    getTeamBoardPaging,
    writeTeamBoard,
    getTeamBoardById,
  };
};

export default useBoardApi;
