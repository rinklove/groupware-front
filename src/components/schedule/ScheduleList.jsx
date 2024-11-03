import React from 'react'
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

const ScheduleDiv = styled.div`
  width: ${({width}) => (width || '100%')};
  height: fit-content;
  max-height: 400px;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  margin-left: 1em;
  padding: 1em;

  & > div:first-child {
    display: flex;
  }
`;

const Title = styled.h6`
  font-size: 1.1em;
  font-weight: 700;
`

const ScheduleList = ({ data, width, title = '일정 목록', children }) => {
  const convertTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const isSameYear = date.getFullYear() === now.getFullYear();
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    const hours = date.getHours();
    
    return isSameYear
      ? `${month}월 ${day}일 ${hours}시`
      : `${year}년 ${month}월 ${day}일 ${hours}시`;
  };

  return (
    <ScheduleDiv width={width} className="overflow-auto">
      <div>
        <h5>{title}</h5>
        <div>{children}</div>
      </div>
      <ListGroup>
        {data.length > 0 ? (
          data.map((per) => (
            <ListGroup.Item key={per.id}>
              <Title>{per.name}</Title>
              <span>
                {convertTime(per.startAt)} ~ {convertTime(per.endAt)}
              </span>
              <div>
                <span>{per.description}</span>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>
            <span>일정이 없습니다.</span>
          </ListGroup.Item>
        )}
      </ListGroup>
    </ScheduleDiv>
  );
};

export default ScheduleList
