import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';
import { useCourseApi } from '../hook/UseCourseApi';

const CoursesDiv = styled.div`
  max-width: 70em;
  margin: auto;
  margin-top: 2em;
  overflow-x: auto;
  white-space: nowrap;
  
  .nav-tabs {
    display: flex;
    flex-wrap: nowrap;
  }

  .nav-item {
    flex-shrink: 0;
    min-width: 10em;
  }
`;

const CourseContainer = ({ isAdmin, onSelect }) => {
  const [courses, setCourses] = useState([]);
  const { fetchAllCourse } = useCourseApi();

  useEffect(() => {
    const getFetchedData = async () => {
      if (!isAdmin) return;
      const res = await fetchAllCourse();
      setCourses(res);
    };

    getFetchedData();
  }, [isAdmin]);

  return (
    <CoursesDiv>
      {courses.length > 0 ? (
        <Tabs
          defaultActiveKey={courses[0]?.id}
          onSelect={onSelect} // 선택된 tab의 eventKey를 전달
          className="mb-3"
          fill
        >
          {courses.map((course) => (
            <Tab 
              key={course.id}
              eventKey={course.id} // 각 탭의 id를 eventKey로 설정
              title={course.name}
            />
          ))}
        </Tabs>
      ) : (
        <span>아직 코스가 없습니다. 코스를 등록하러 이동하세요!</span>
      )}
    </CoursesDiv>
  );
};

export default CourseContainer;
