import React, { useEffect, useState } from 'react';
import { useCourseApi } from '../hook/UseCourseApi';
import { useCourse } from '../hook/UseCourse';
import styled from 'styled-components';
import { ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const ContentWrapper = styled.div`
  position: fixed; /* 고정 위치 설정 */
  top: 50%; /* 화면 중앙 */
  right: 2em; /* 오른쪽 여백 */
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  border: 0.5px solid #0f1317;
  padding: 1em;
  background: white; /* 배경 색상 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  z-index: 1000; /* 다른 요소 위에 표시 */
  transition: transform 0.3s ease-in-out; /* 애니메이션 효과 */
`;

const StyledToggleButton = styled(ToggleButton)`
  display: flex;
  color: #0f1317;
  text-decoration: none;
  margin-right: 0.5em;

  &:checked {
    text-decoration: underline;
    color: #ffffff; /* 선택된 상태에서 글자 색상을 흰색으로 */
    background-color: #007bff; /* 선택된 상태에서 배경 색상 */
    border-color: #0056b3; /* 선택된 상태에서 테두리 색상 */
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.5); /* 포커스 상태에서 그림자 추가 */
  }
`;

const ToggleButtonWrapper = styled.div`
  position: absolute;
  top: -40px; /* 토글 버튼의 위치 조정 */
  right: 0;
`;

const AdminCourseSelector = ({ onCourseChange }) => {
  const [courses, setCourses] = useState([]);
  const { fetchAllCourse } = useCourseApi();
  const { courseId, enterCourse } = useCourse();
  const [isVisible, setIsVisible] = useState(true); // 가시성 상태 추가

  const fetchData = async () => {
    const res = await fetchAllCourse();
    setCourses(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCourseChange = (courseId) => {
    enterCourse(courseId);
    onCourseChange(courseId); // 선택된 courseId를 상위 컴포넌트에 전달
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // 가시성 토글
  };

  return (
    <ContentWrapper>
        <FontAwesomeIcon 
          icon={faEllipsis}
          onClick={toggleVisibility}
         />
      {isVisible && (
        <>
          {
          courses.length > 0 ?
            <>
              <span>코스 목록 보기</span>
              {
                courses.map(course =>
                  <StyledToggleButton
                    key={course.id}
                    id={`toggle-${course.id}`} // id를 고유하게 만듭니다.
                    type="checkbox"
                    variant="link"
                    checked={courseId === course.id}
                    value={course.id}
                    onChange={() => handleCourseChange(course.id)}
                  >
                    {course.name}
                  </StyledToggleButton>
                )
              }
            </>
            :
            <span>현재 등록된 코스가 없습니다.</span>
          }
        </>
      )}
    </ContentWrapper>
  );
};

export default AdminCourseSelector;
