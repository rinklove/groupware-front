import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BoardDetail from './BoardDetail'
import useBoardApi from '../hook/UseBoardApi'
import CommentContainer from '../comment/CommentContainer'
import styled from 'styled-components'



const TeamInfoContainer = () => {
  const location = useLocation()
  const boardId = location.state?.id
  const [data, setData] = useState()
  const { getTeamBoardById } = useBoardApi();

  const fetchData = async () => {
    const res = await getTeamBoardById(boardId)
    console.log(res);
    
    setData(res)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <BoardDetail
        data={data}
      />
      <CommentContainer
      boardId={boardId}
      />
    </div>
  )
}

export default TeamInfoContainer
