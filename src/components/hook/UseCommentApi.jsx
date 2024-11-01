import React from 'react'
import { useApi } from './UseApi';
import { COMMENTS } from '../../api/url';
import { HttpStatusCode } from 'axios';

const useCommentApi = () => {
  const { get, post, patch } = useApi();
  const getUrl = (commentId) => {
    return commentId !== null ? `&commentId=${commentId}` : ''
  }

  const addComment = async (data) => {
    const res = await post(COMMENTS, data)
    if(res.status !== HttpStatusCode.Ok) {
      throw res.data.result
    }
    return res.data.result
  }

  const getComments = async (boardId, commentId = null) => {
    const url = `${COMMENTS}?boardId=${boardId}${getUrl(commentId)}`
    const res = await get(url)
    return res
  }

  return { addComment, getComments }
}

export default useCommentApi
