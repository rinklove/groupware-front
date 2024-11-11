import React from 'react'
import { useApi } from './UseApi';
import { CHANNEL, INVITE, PARTICIPANTS, SHOW } from '../../api/url';
import { HttpStatusCode } from 'axios';

const useChannelApi = () => {
  const { get, post, patch } = useApi();
  
  const getAllChannel = async () => {
    const res = await get(`${CHANNEL}`)
    return res;
  }

  const getMyChannel = async () => {
    const res = await get(`${PARTICIPANTS}${SHOW}`)
    return res;
  }

  const createChannel = async (data) => {
    const res = await post(`${CHANNEL}`, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res;
    }
    return res.data.result;
  }

  const inviteUsers = async (data) => {
    const res = await post(`${PARTICIPANTS}${INVITE}`, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res
    }
    return res
  }

  return { 
    getAllChannel,
    getMyChannel,
    createChannel,
    inviteUsers,
   }
}

export default useChannelApi
