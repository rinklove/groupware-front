import React, { useState } from 'react'
import CommentWriteForm from './CommentWriteForm'
import CommentList from './CommentList'

const CommentContainer = ({boardId}) => {
  const [commentPage, setCommentPage] = useState([null])
  const [pageIndex, setIndex] = useState(0)
  
  return (
    <div>
      <CommentWriteForm
        boardId={boardId}
      />
      <hr/>
      <CommentList
        boardId={boardId}
        currentPage={commentPage[pageIndex]}
      />
    </div>
  )
}

export default CommentContainer
