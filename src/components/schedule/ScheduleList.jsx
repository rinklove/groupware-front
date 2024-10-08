import React from 'react'
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

const ScheduleDiv = styled.div`
  width: ${({width}) => (width || '100%')};
  height: 100%;
  max-height: 400px;
  overflow-y: auto; /* 세로 스크롤 활성화 */
  margin-left: 1em;
  padding: 0.5em;
`;

const ScheduleList = ({data, width}) => {
  return (
    <ScheduleDiv width={width} className='overflow-auto'>
      <h4>일정 목록</h4>
      <ListGroup>
        <ListGroup.Item>
          <h5>10/11 ~ 10/24</h5>
          <span>일정 1</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>10/11 ~ 10/24</h5>
          <span>일정 2</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>10/11 ~ 10/24</h5>
          <span>일정 3</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>10/11 ~ 10/24</h5>
          <span>일정 4</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>10/11 ~ 10/24</h5>
          <span>일정 5</span>
        </ListGroup.Item>
        <ListGroup.Item>
          <h5>10/11 ~ 10/24</h5>
          <span>일정 6</span>
        </ListGroup.Item>
      </ListGroup>
    </ScheduleDiv>
  );
}

export default ScheduleList
