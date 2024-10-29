import React, { useContext, useEffect, useState } from 'react'
import { useApi } from './UseApi'
import {  COURSE_BOARD, PAGE } from '../../api/url';
import { COURSE } from '../../constants/belonging';
import { HttpStatusCode } from 'axios';

const useBoardApi = () => {
  const { get, post, patch } = useApi();
  const [courseId, setCourseId] = useState(localStorage.getItem(COURSE));
  const getUrl = (boardId) => boardId ? `&boardId=${boardId}` : '';

  const getCourseNotice = async (boardId) => {
    const url = `${COURSE_BOARD}?courseId=${courseId}${getUrl(boardId)}&isNotice=y`;
    const res = await get(url);
    return res;
  };

  const getCourseNoticePaging = async () => {
    const url = `${COURSE_BOARD}${PAGE}?courseId=${courseId}&isNotice=y`
    const res = await get(url);
    return res;
  }

  const getCourseStudy = async (boardId) => {
    const url = `${COURSE_BOARD}?courseId=${courseId}${getUrl(boardId)}&isNotice=n`;
    const res = await get(url);
    return res;
  };

  const getCourseStudyPaging = async () => {
    const url = `${COURSE_BOARD}${PAGE}?courseId=${courseId}&isNotice=n`
    const res = await get(url);
    return res;
  }

  const writeCourseStudyBoard = async (data) => {
    const res = await post(COURSE_BOARD, data);
    if(res.status !== HttpStatusCode.Ok) {
      throw res.data
    }
    return res.data.result;
  }

  const getBoardById = async (id) => {
    const res = await get(`${COURSE_BOARD}/${id}`)
    return res
  }

  return { 
    getCourseNotice, 
    getCourseNoticePaging, 
    getCourseStudy, 
    getCourseStudyPaging,
    writeCourseStudyBoard,
    getBoardById
  };
};


export default useBoardApi
