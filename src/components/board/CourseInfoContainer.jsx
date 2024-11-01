import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useBoardApi from '../hook/UseBoardApi';
import CommentContainer from '../comment/CommentContainer';
import styled from 'styled-components';
import BoardDetail from './BoardDetail';

const ContentWrapper = styled.div`
  width: 50%;
  min-width: 500px;
  margin: auto;
  
  

  & > * {
    width: 100%;
  }
`;

const CourseInfoContainer = () => {
  const location = useLocation();
  const id = location.state?.id; // state에서 id 접근
  const [data, setData] = useState({});
  const { getBoardById } = useBoardApi();

  const getFetchData = async () => {
    const res = await getBoardById(id)
    setData(res);
    console.log(data);
    
  }

  useEffect(() => {
    getFetchData()
  }, [])

  return (
    <ContentWrapper>
      <BoardDetail
        data={data}
      />
      {/* <CommentContainer
        boardId={id}
      /> */}
    </ContentWrapper>
  )
}

export default CourseInfoContainer
