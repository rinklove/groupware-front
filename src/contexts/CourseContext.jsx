import React, { createContext, useState, useEffect } from 'react';
import { COURSE } from '../constants/belonging'

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourse] = useState(null);

  // 컴포넌트가 처음 렌더링될 때 사용자 정보를 가져오는 함수
  useEffect(() => {
    const storedCourse = localStorage.getItem(COURSE);
    setCourse(storedCourse);
  }, []);

  const enterCourse = (courseId) => {
    localStorage.setItem(COURSE, courseId);
    setCourse(courseId);
  };

  const exitCourse = () => {
    localStorage.removeItem(COURSE);
    setCourse(null);
  };

  return (
    <CourseContext.Provider value={{ course, enterCourse, exitCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
