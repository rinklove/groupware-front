import React, { useEffect, useState } from 'react';
import { useCourseApi } from '../hook/UseCourseApi';
import { useCourse } from '../hook/UseCourse';
import styled from 'styled-components';
import { ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 20vw;
  position: fixed;
  top: 50%;
  right: 2em;
  transform: translateY(-50%);
  z-index: 1000;
`;

const IconWrapper = styled.div`
  text-align: right;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  position: absolute;
  width: 100%;
  max-height: 20em;
  overflow-y: auto;
  top: 100%; /* IconWrapper 바로 아래에 위치 */
  right: 0; /* 오른쪽을 기준으로 펼쳐지도록 설정 */
  margin-top: 0.5em;
  padding: 1em;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const StyledToggleButton = styled(ToggleButton)`
  display: block;
  color: #0f1317;
  text-decoration: none;
  margin-bottom: 0.5em;
  width: 100%;

  &.checked {
    text-decoration: underline;
    color: #ffffff;
    background-color: #007bff;
    border-color: #0056b3;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.5);
  }
`;

const AdminCourseSelector = ({ onCourseChange }) => {
  const [courses, setCourses] = useState([]);
  const { fetchAllCourse } = useCourseApi();
  const { courseId, enterCourse } = useCourse();
  const [isVisible, setIsVisible] = useState(false);

  const fetchData = async () => {
    const res = await fetchAllCourse();
    setCourses(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCourseChange = (courseId) => {
    enterCourse(courseId);
    onCourseChange(courseId);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DropdownWrapper>
      <IconWrapper>
        <FontAwesomeIcon icon={faEllipsis} size="lg" onClick={toggleVisibility} />
      </IconWrapper>

      <ContentWrapper isVisible={isVisible}>
        {courses.length > 0 ? (
          <>
            <span>코스 목록 보기</span>
            {courses.map(course => (
              <StyledToggleButton
                key={course.id}
                id={`toggle-${course.id}`}
                type="checkbox"
                variant="link"
                checked={courseId === course.id}
                value={course.id}
                onChange={() => handleCourseChange(course.id)}
              >
                {course.name}
              </StyledToggleButton>
            ))}
          </>
        ) : (
          <span>현재 등록된 코스가 없습니다.</span>
        )}
      </ContentWrapper>
    </DropdownWrapper>
  );
};

export default AdminCourseSelector;
