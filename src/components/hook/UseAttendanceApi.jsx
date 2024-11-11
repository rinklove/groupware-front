import React from 'react'
import { ADMIN_ATTANDANCES, ADMIN_ATTENDANCES_REQUESTED, APPROVE, ATTANDANCES, REJECT } from '../../api/url'
import { useApi } from './UseApi'
import { HttpStatusCode } from 'axios'

const useAttendanceApi = () => {
  const { get, post, patch, _delete } = useApi()

  const getWaitingAttendances = async (page = 0) => {
    const res = await get(`${ADMIN_ATTENDANCES_REQUESTED}?page=${page}`)
    return res;
  }

  const getMyAttendances = async (page = 0) => {
    const res = await get(`${ATTANDANCES}?page=${page}`)
    return res;
  }

  const getAllAttendances = async (page = 0) => {
    const res = await get(`${ADMIN_ATTANDANCES}?page=${page}`)
    return res
  }

  const requestAttendance = async (data) => {
    const res = await post(`${ATTANDANCES}`, data)
    if(res.status !== HttpStatusCode.Created) {
      throw res.data
    }
    return res
  }

  const updateAttendance = async (data) => {
    const res = await patch(`${ATTANDANCES}`, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res.data
    }
    return res
  }

  const deleteAttendance = async (data) => {
    const res = await _delete(`${ATTANDANCES}`, data)
    if(res.status !== HttpStatusCode.NoContent) {
      throw res.data
    }

    return res
  }

  const approveAttendance = async (data) => {
    const res = await post(`${ADMIN_ATTANDANCES}${APPROVE}`, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res.data
    }
    return res
  }

  const rejectAttendance = async (data) => {
    const res = await post(`${ADMIN_ATTANDANCES}${REJECT}`, data)
    if(res.status !== HttpStatusCode.NoContent) {
      throw res.data
    }
    return res
  }
  
  return {
    getWaitingAttendances,
    getMyAttendances,
    getAllAttendances,
    requestAttendance,
    updateAttendance,
    deleteAttendance,
    approveAttendance,
    rejectAttendance
  }
}

export default useAttendanceApi
