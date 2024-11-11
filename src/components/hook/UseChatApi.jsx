import React from 'react'
import { CHATS } from '../../api/url'
import { useApi } from './UseApi'

const useChatApi = () => {
  const { get, post, patch, _delete } = useApi()

  const getChatLog = async (channelId) => {
    const res = await get(`${CHATS}/${channelId}`)
    return res;
  }

  return { getChatLog }
}

export default useChatApi
