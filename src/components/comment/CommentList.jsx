import React, { useEffect, useState } from 'react'
import useCommentApi from '../hook/UseCommentApi';

const CommentList = ({boardId, currentPage}) => {
  const [comments, setComments] = useState([]);
  const { getComments } = useCommentApi();
  const fetchComments = async () => {
    const res = await getComments(boardId, currentPage)
    setComments(res);
    console.log(comments);
    
  }

  useEffect(() => {
    fetchComments()
  }, [currentPage])
  
  return (
    <div>
      
    </div>
  )
}

export default CommentList
