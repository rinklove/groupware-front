import React from 'react'
import CommentWriteForm from './CommentWriteForm'
import CommentList from './CommentList'

const CommentContainer = ({boardId}) => {
  return (
    <div>
      <CommentWriteForm
        boardId={boardId}
      />
      <hr/>
      <CommentList
        boardId={boardId}
      />
    </div>
  )
}

export default CommentContainer
