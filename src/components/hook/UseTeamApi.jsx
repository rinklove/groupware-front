import React from 'react'
import { ADMIN_APPROVAL, ADMIN_WAITING, COURSE_TEAM, MY_TEAM_INFO, TEAM_MEMBERS, TEAM } from '../../api/url'
import { HttpStatusCode } from 'axios'
import { useApi } from './UseApi'

export const useTeamApi = () => {
  const { get, post, patch, _delete } = useApi()

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
    const res = await post(TEAM, data)
    if(res.status !== HttpStatusCode.Created) {
      throw res.data
    }
    return res.data.result
  }

  const getWatingTeamListForAdmin = async () => {
    const res = await get(ADMIN_WAITING)
    return res
  }

  const approveTeam = async (data) => {
    const res = await post(ADMIN_APPROVAL, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res.data
    }
    return res.data.result;
  }

  const rejectTeam = async (data) => {
    const res = await _delete(ADMIN_APPROVAL, data)
    if(res.status !== HttpStatusCode.NoContent) {
      throw res.data
    }
    return res.data.result;
  }

  const getTeamMember = async (teamId) => {
    const url = `${TEAM_MEMBERS}/${teamId}`
    const res = await get(url)
    return res;
  }

  return {getMyTeamInfo, 
    getAllTeamByCourse,
    createStudyTeam,
    getWatingTeamListForAdmin,
    approveTeam,
    rejectTeam,
    getTeamMember
  }
}

