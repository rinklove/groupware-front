import React from 'react'
import { ADMIN, COMMONS, SCHEDULE, TEAM_SCHEDLE } from '../../api/url'
import { useApi } from './UseApi'
import { HttpStatusCode } from 'axios'
import { useTeam } from './UseTeam'

const useScheduleApi = () => {
  const { get, post, patch, _delete } = useApi()
  const { teamId } = useTeam()

  const getTeamSchedulebyId = async (teamId) => {
    const url = `${TEAM_SCHEDLE}?teamId=${ teamId }`
    const res = await get(url)
    return res
  }

  const getCourseScheduleById = async (courseId) => {
    const res = await get(`${SCHEDULE}${COMMONS}?courseId=${courseId}`)
    return res;
  } 

  const getCourseScheduleByIdForAdmin = async (courseId) => {
    const res = await get(`${ADMIN}${SCHEDULE}${COMMONS}?courseId=${courseId}`)
    return res;
  } 

  const addTeamSchedule = async (data, teamId) => {
    const res = await post(`${SCHEDULE}?teamId=${teamId}`, data)
    if(res.status !== HttpStatusCode.Created) {
      throw res.data
    }
    return res
  }

  const addCourseSchedule = async (courseId, data) => {
    const res = await post(`${ADMIN}${SCHEDULE}?courseId=${courseId}`, data)
    if(res.status !== HttpStatusCode.Created) {
      throw res.response;
    }
    return res;
  }

  const deleteTeamSchedule = async (data) => {
    const res = await _delete(`${SCHEDULE}?teamId=${teamId}`, data)
    if(res.status !== HttpStatusCode.NoContent) {
      throw res
    }

    return res
  }

  const deleteCourseSchedule = async (data) => {
    const res = await _delete(`${ADMIN}${SCHEDULE}`, data)
    if(res.status !== HttpStatusCode.NoContent) {
      throw res
    }

    return res
  }


  return {
    getTeamSchedulebyId,
    getCourseScheduleById,
    getCourseScheduleByIdForAdmin,
    addTeamSchedule,
    addCourseSchedule,
    deleteTeamSchedule,
    deleteCourseSchedule
  }
}

export default useScheduleApi
