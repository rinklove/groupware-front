import React from 'react'
import { useApi } from './UseApi'
import { CATEGORY } from '../../api/url'
import { HttpStatusCode } from 'axios'

const useCategoryApi = () => {
  const { get, post, patch, _delete } = useApi()

  const getCategoryByTeamId = async (teamId) => {
    const res = await get(`${CATEGORY}?teamId=${teamId}`)
    return res;
  }

  const addCategory = async (data) => {
    const res = await post(`${CATEGORY}`, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res
    }
    return res.data.result;
  }

  const updateCategory = async (data) => {
    const res = await patch(`${CATEGORY}`, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res
    }
    return res.data.result;
  }

  const deleteCategory = async (data) => {
    const res = await _delete(`${CATEGORY}`, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res
    }
    return res.data.result;
  }
  
  return {
    getCategoryByTeamId,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}

export default useCategoryApi
