import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { fetchAllCourse } from '../../api/course';
import styled from 'styled-components';

const CoursesDiv = styled.div`
  max-width: 70em;
  margin: auto;
  margin-top: 2em;
  overflow-x: auto; /* 가로 스크롤 허용 */
  white-space: nowrap; /* 탭들이 한 줄에 나열되도록 설정 */
  
  .nav-tabs {
    display: flex; /* 탭을 가로로 정렬 */
    flex-wrap: nowrap; /* 탭이 줄바꿈되지 않도록 설정 */
  }

  .nav-item {
    flex-shrink: 0; /* 탭 크기가 줄어들지 않도록 설정 */
    min-width: 10em; /* 탭의 최소 너비 설정 */
  }
`;

const CourseContainer = ({ isAdmin, onSelect }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getFetchedData = async () => {
      if (!isAdmin) return;

      const res = await fetchAllCourse();
      setCourses(res);
    };

    getFetchedData();
  }, [isAdmin]); // isAdmin 값이 변경될 때만 다시 실행

  return (
    <CoursesDiv>
      <Tabs
        defaultActiveKey={courses[0]?.id}
        id="uncontrolled-tab-example"
        onSelect={onSelect}
        className="mb-3"
        fill
      >
        {courses.map((course) => (
          <Tab 
            key={course.id}
            eventKey={course.id}
            title={course.name}
          />
        ))}
      </Tabs>
    </CoursesDiv>
  );
};

export default CourseContainer;
