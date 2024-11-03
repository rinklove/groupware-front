import React from 'react'
import { COMMONS, SCHEDULE, TEAM_SCHEDLE } from '../../api/url'
import { useApi } from './UseApi'
import { HttpStatusCode } from 'axios'

const useScheduleApi = () => {
  const { get, post, patch, _delete } = useApi()

  const getTeamSchedulebyId = async (teamId) => {
    const url = `${TEAM_SCHEDLE}?teamId=${teamId}`
    const res = await get(url)
    return res
  }

  const getCourseScheduleById = async (courseId) => {
    const res = await get(`${SCHEDULE}${COMMONS}?courseId=${courseId}`)
    return res;
  } 

  const addTeamSchedule = async (data, teamId) => {
    const res = await post(`${SCHEDULE}?teamId=${teamId}`, data)
    if(res.status !== HttpStatusCode.Created) {
      throw res.data
    }
    return res
  }

  return {
    getTeamSchedulebyId,
    getCourseScheduleById,
    addTeamSchedule,
  }
}

export default useScheduleApi
