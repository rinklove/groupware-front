import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import BoardList from '../board/BoardList';
import { useMainBoard } from '../hook/UseMainBoardApi';
import { useCourse } from '../hook/UseCourse';

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5em;
  margin: 0.5em;
  box-sizing: border-box;
  border: 0.5px solid #0f1317;
  border-radius: 1em;

  & span {
    font-size: 0.8em;
  }
`;

const CourseBoardContainer = ({courseId, isAdmin}) => {
  const [notices, setNotices] = useState([]);
  const [studies, setStudies] = useState([]);
  const { getCourseBoardForAdmin, getCourseBoardMain } = useMainBoard()
  const { enterCourse } = useCourse();

  const fetchData = async () => {
    return isAdmin ? 
      await getCourseBoardForAdmin(courseId) 
      : 
      await getCourseBoardMain()
  }

  const setData = (res) => {
    setStudies(res.studies);
    setNotices(res.notices);
  }

  const getData = async () => {
    try { 
      const res = await fetchData();
      console.log(res)
      setData(res);
      enterCourse(res.courseId);
    } catch (e) {
      console.error(e);
    }
  }

  const getAdminData = async () => {
    if(!isAdmin && !courseId) return;
    try {
      const res = await getCourseBoardForAdmin(courseId);
      console.log(res)
      setData(res)
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
          isCourseBoard={true}
        />
      </StyledDiv>
      <StyledDiv>
        <BoardList
            data={studies}
            title='스터디 모집' 
            isCourseBoard={true}
          />
      </StyledDiv>
    </>
  )
}

export default CourseBoardContainer;
