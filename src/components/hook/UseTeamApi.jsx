import React from 'react'
import { COURSE_TEAM } from '../../api/url'
import { HttpStatusCode } from 'axios'
import { useApi } from './UseApi'

export const useTeamApi = () => {
  const { get } = useApi()

  const getMyTeamInfo = () => {
    
  }
  
  const getAllTeamByCourse = async (data) => {
    const url = `${COURSE_TEAM}/${data}`
    const res = await get(url);
      return res;
  }
  return {getMyTeamInfo, getAllTeamByCourse}
}

