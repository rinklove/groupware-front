import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import BoardList from '../board/BoardList';
import { getCourseBoardMain } from '../../api/board';

const StyledDiv = styled.div`
    width: 25vw;
    display: inline;
    padding: 2em;
    margin: 2em;
    box-sizing: border-box;
`;

const CourseBoardContainer = () => {
  const [notices, setNotices] = useState([]);
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    // 게시글을 받아오는 로직
    const getData = async () => {
      try {
        const res = await getCourseBoardMain();
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
  
  return (
    <>
      <StyledDiv>
        <BoardList
          data={notices}
          title='공지사항' // 리스트 제목 추가
        />
      </StyledDiv>
      <StyledDiv>
        <BoardList
            data={studies}
            title='학습 자료' // 리스트 제목 추가
          />
      </StyledDiv>
    </>
  )
}

export default CourseBoardContainer;
