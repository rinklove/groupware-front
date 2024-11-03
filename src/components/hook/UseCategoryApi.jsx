import React from 'react'
import { useApi } from './UseApi'
import { CATEGORY } from '../../api/url'

const useCategoryApi = () => {
  const { get, post, patch, _delete } = useApi()

  const getCategoryByTeamId = async (teamId) => {
    const res = await get(`${CATEGORY}?teamId=${teamId}`)
    return res;
  }
  
  return {
    getCategoryByTeamId,
  }
}

export default useCategoryApi
