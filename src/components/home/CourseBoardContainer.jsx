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
        const {data} = await getCourseBoardMain();
        setNotices(data.result.notices);
        setStudies(data.result.studies);
      } catch (e) {
        console.error(e);
      }
    }

    getData();
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
            title='스터디 모집' 
          />
      </StyledDiv>
    </>
  )
}

export default CourseBoardContainer;
