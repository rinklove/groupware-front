import React, { useEffect, useState } from 'react';
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

const CourseBoardContainer = ({ courseId, isAdmin }) => {
  const [notices, setNotices] = useState([]);
  const [studies, setStudies] = useState([]);
  const { getCourseBoardForAdmin, getCourseBoardMain } = useMainBoard();
  const { enterCourse } = useCourse();

  const fetchData = async () => {
    return isAdmin
      ? await getCourseBoardForAdmin(courseId)
      : await getCourseBoardMain();
  };

  const setData = (res) => {
    if (res) {
      setStudies(res.studies || []);
      setNotices(res.notices || []);
      if (res.courseId) enterCourse(res.courseId); // courseId가 있을 때만 enterCourse 호출
    }
  };

  const getData = async () => {
    
    try {
      const res = await fetchData();
      console.log(res);
      setData(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAdmin && courseId) {
      getData(); // 관리자 모드에서 courseId가 있을 때 데이터 호출
    } else if (!isAdmin) {
      getData(); // 일반 사용자 모드
    }
  }, [isAdmin, courseId]);

  return (
    <>
      <StyledDiv>
        <BoardList
          data={notices}
          title="공지사항"
          isCourseBoard={true}
        />
      </StyledDiv>
      <StyledDiv>
        <BoardList
          data={studies}
          title="스터디 모집"
          isCourseBoard={true}
        />
      </StyledDiv>
    </>
  );
};

export default CourseBoardContainer;
