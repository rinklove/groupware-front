import React from 'react'
import styled from 'styled-components'

const CommentWrapper = styled.div`
  width: 100%;
`;

const Comment = ({data}) => {
  return (
    <CommentWrapper>
      <div>
        <span>{}</span>
      </div>
    </CommentWrapper>
  )
}

export default Comment
