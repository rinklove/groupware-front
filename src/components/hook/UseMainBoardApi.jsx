import React from 'react'
import { ADMIN, MAIN_BOARD } from '../../api/url';
import { useApi } from './UseApi';

export const useMainBoard = () => {
  const { get } = useApi()

  const getCourseBoardMain = async () => {
    const res = await get(MAIN_BOARD);
    return res;
  }

  const getCourseBoardForAdmin = async (data) => {
      const url = `${MAIN_BOARD}${ADMIN}?courseId=${data}`
      const res = await get(url);
      return res;
  }

  return { getCourseBoardMain, getCourseBoardForAdmin }
}
