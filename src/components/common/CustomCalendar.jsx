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
  width: ${({width}) => (width || '100%')};

  & > div.react-calendar {
    width: 100%;
    height: 100%;
    border: none; /* 기본 테두리 없애기 */

    & .react-calendar__month-view__weekdays__weekday {
      
      & > abbr {
        font-weight: 700;
        text-decoration: none;
      }
    }
  }

  .react-calendar button {
    flex: 1;
    width: 60px; /* 원하는 너비 */
    height: 60px; /* 원하는 높이 */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px; /* 버튼의 모서리 둥글게 */
    background: transparent; /* 기본 배경 없애기 */
    cursor: pointer;
    transition: background 0.3s; /* 호버 효과를 위한 전환 효과 */

    &:hover {
      background: rgba(102, 217, 244, 0.3); /* 호버 시 배경 색상 */
    }

    &.react-calendar__navigation__next2-button,
    &.react-calendar__navigation__prev2-button {
      display: none;
    }
  }

  /* 선택된 날짜 스타일 */
  .react-calendar__tile--active {
    background: #66d9f4; /* 선택된 날짜 배경 색상 */
    color: #0f1317; /* 선택된 날짜 텍스트 색상 */
  }

  /* 선택된 날짜 호버 효과 */
  .react-calendar__tile--active:hover {
    background: #4bb0e2; /* 더 어두운 색상으로 호버 시 */
  }
`;

const CustomCalendar = ({ value, setValue, tileDisabled, width }) => {
  return (
    <CalendarWrapper width={width}>
      <Calendar
        onChange={setValue}
        value={value}
        tileDisabled={tileDisabled}
        calendarType="gregory"
        className="react-calendar" // 스타일링을 위한 클래스 추가
      />
    </CalendarWrapper>
  );
}

export default CustomCalendar;
