import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import BoardList from '../board/BoardList';
import { useMainBoard } from '../hook/UseMainBoardApi';

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5em;
  margin: 0.5em;
  box-sizing: border-box;
  border: 0.5px solid #0f1317;
  border-radius: 1em;
`;

const CourseBoardContainer = ({courseId, isAdmin}) => {
  const [notices, setNotices] = useState([]);
  const [studies, setStudies] = useState([]);
  const { getCourseBoardForAdmin, getCourseBoardMain } = useMainBoard()

  const fetchData = async () => {
    return isAdmin ? 
      await getCourseBoardForAdmin(courseId) 
      : 
      await getCourseBoardMain()
  }

  const getData = async () => {
    if(!courseId) return;
    try { 
      const res = await fetchData();
      console.log(res)
      setNotices(res.notices);
      setStudies(res.studies);
    } catch (e) {
      console.error(e);
    }
  }

  const getAdminData = async () => {
    if(!isAdmin && !courseId) return;
    try {
      const res = await getCourseBoardForAdmin(courseId);
      console.log(res)
      setNotices(res.notices);
      setStudies(res.studies);
    } catch (e) {
      console.error(e);
    } 
  }


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // 게시글을 받아오는 로직
    getAdminData();
  }, [courseId]);
  
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
