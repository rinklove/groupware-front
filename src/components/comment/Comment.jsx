import React from 'react'
import { Button } from 'react-bootstrap';
import styled from 'styled-components'
import useCommentApi from '../hook/UseCommentApi';

const CommentWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #adb5bd;

  & > div {
    padding: 0 0.5em;

    &:nth-child(2) {
      margin-bottom: 1em;
    }
  }
`;

const Name = styled.span`
  font-weight: 700;
  margin-right: 1em;
`

const WriteTime = styled.span`
  
`

const Comment = ({data, updateComment}) => {
  const {deleteComment} = useCommentApi()

  const handleDelete = async (id) => {
    try {
      const res = await deleteComment(id)
      alert(res)
      updateComment()
    } catch (e) {
      alert(e.response)
    }
  }
  return (
    <CommentWrapper>
      <div>
        <Name>{data?.writer}</Name>
        <WriteTime>{data?.createdAt}</WriteTime>
        {
          (data?.isAdmin || data?.isMine) && 
            <Button
              variant='link'
              onClick={() => handleDelete(data?.id)}
            >
              삭제
            </Button>
        }
      </div>
      <div>
        {data?.content}
      </div>
    </CommentWrapper>
  )
}

export default Comment
