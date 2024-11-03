import React, { createContext, useState, useEffect } from 'react';
import { COURSE } from '../constants/belonging';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseId, setCourseId] = useState();

  // 컴포넌트가 처음 렌더링될 때 localStorage에서 courseId 가져오기
  useEffect(() => {
    const storedCourse = localStorage.getItem(COURSE);
    if (storedCourse) {
      setCourseId(storedCourse);
    }
  }, []);

  const enterCourse = (course) => {
    localStorage.setItem(COURSE, course);
    setCourseId(course);
  };

  const exitCourse = () => {
    localStorage.removeItem(COURSE);
    setCourseId(null);
  };

  return (
    <CourseContext.Provider value={{ courseId, enterCourse, exitCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
