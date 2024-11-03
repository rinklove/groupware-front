import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

const CalendarWrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  width: ${({ width }) => (width || '100%')};

  & > div.react-calendar {
    width: 100%;
    height: 100%;
    border: none;

    & .react-calendar__month-view__weekdays__weekday {
      & > abbr {
        font-weight: 700;
        text-decoration: none;
      }
    }
  }

  .react-calendar button {
    flex: 1;
    width: 60px; 
    height: 60px; 
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px; 
    background: transparent; 
    cursor: pointer;
    transition: background 0.3s; 

    &:hover {
      background: rgba(102, 217, 244, 0.3); 
    }

    &.react-calendar__navigation__next2-button,
    &.react-calendar__navigation__prev2-button {
      display: none;
    }
  }

  .react-calendar__tile--active {
    background: #66d9f4; 
    color: #0f1317; 
  }

  .react-calendar__tile--active:hover {
    background: #4bb0e2; 
  }

  /* 특정 날짜 마커 스타일 */
  .course-marker {
    background-color: #66d9f4; /* 코스 마커 색상 */
    border-radius: 50%;
    width: 10px;
    height: 10px;
    display: inline-block;
    margin: 0 auto;
  }

  .team-marker {
    background-color: #e54900; /* 팀 마커 색상 */
    border-radius: 50%;
    width: 10px;
    height: 10px;
    display: inline-block;
    margin: 0 auto;
  }
`;

const CustomCalendar = ({ value, setValue, tileDisabled, teamList = [], courseList = [], width }) => {
  const validCourseList = Array.isArray(courseList) ? courseList : [];
  const validTeamList = Array.isArray(teamList) ? teamList : [];

  const isInRange = (date, startAt, endAt) => {
    const current = new Date(date).setHours(0, 0, 0, 0);
    const start = new Date(startAt).setHours(0, 0, 0, 0);
    const end = new Date(endAt).setHours(0, 0, 0, 0);
    return current >= start && current <= end;
  };

  const getTileContent = (date) => {
    const markers = [];

    // courseList의 마커 추가
    validCourseList.forEach((schedule) => {
      const { startAt, endAt } = schedule;
      if (isInRange(date, startAt, endAt)) {
        markers.push(<span className="course-marker" key={`course-${startAt}-${endAt}`} />);
      }
    });

    // teamList의 마커 추가
    validTeamList.forEach((schedule) => {
      const { startAt, endAt } = schedule;
      if (isInRange(date, startAt, endAt)) {
        markers.push(<span className="team-marker" key={`team-${startAt}-${endAt}`} />);
      }
    });

    return <>{markers}</>;
  };

  return (
    <CalendarWrapper width={width}>
      <Calendar
        onChange={setValue}
        value={value}
        tileDisabled={tileDisabled}
        calendarType="gregory"
        tileContent={({ date, view }) => view === 'month' && getTileContent(date)}
        className="react-calendar" 
      />
    </CalendarWrapper>
  );
}

export default CustomCalendar;
