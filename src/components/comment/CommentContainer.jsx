import React, { useState } from 'react';
import CommentWriteForm from './CommentWriteForm';
import CommentList from './CommentList';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-top: 3em;
`;

const CommentContainer = ({ boardId }) => {
  const [commentPage, setCommentPage] = useState([]);
  const [pageIndex, setIndex] = useState(0);
  const [refreshComments, setRefreshComments] = useState(false); // 댓글 리스트 새로고침을 위한 상태

  const refreshCommentList = () => {
    setRefreshComments((prev) => !prev);
  };

  return (
    <ContentWrapper>
      <CommentWriteForm boardId={boardId} onCommentSubmit={refreshCommentList} />
      <hr />
      <CommentList boardId={boardId} currentPage={commentPage[pageIndex]} refreshComments={refreshComments} />
    </ContentWrapper>
  );
};

export default CommentContainer;
