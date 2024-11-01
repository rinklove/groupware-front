import React from 'react'
import { COURSE_TEAM, MY_TEAM_INFO, TEAMS } from '../../api/url'
import { HttpStatusCode } from 'axios'
import { useApi } from './UseApi'

export const useTeamApi = () => {
  const { get, post } = useApi()

  const getMyTeamInfo = async () => {
    const res = await get(MY_TEAM_INFO)
    return res;
  }
  
  const getAllTeamByCourse = async (data) => {
    const url = `${COURSE_TEAM}/${data}`
    const res = await get(url);
      return res;
  }

  const createStudyTeam = async (data) => {
    const res = await post(TEAMS, data)
    if(res.status !== HttpStatusCode.Created) {
      throw res.data
    }
    return res.data.result
  }

  return {getMyTeamInfo, 
    getAllTeamByCourse,
    createStudyTeam
  }
}

