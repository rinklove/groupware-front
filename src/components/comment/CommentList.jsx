import React, { useEffect, useState } from 'react';
import useCommentApi from '../hook/UseCommentApi';
import Comment from './Comment';

const CommentList = ({ boardId, currentPage = null, refreshComments }) => {
  const [comments, setComments] = useState([]);
  const { getComments } = useCommentApi();

  const fetchComments = async () => {
    const res = await getComments(boardId, currentPage);
    setComments(res);
  };

  useEffect(() => {
    fetchComments();
  }, [currentPage, refreshComments]); // refreshComments 상태가 변경될 때도 실행

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} data={comment} />
        ))
      ) : (
        <span>댓글이 없습니다.</span>
      )}
    </div>
  );
};

export default CommentList;
