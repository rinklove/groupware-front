import React from 'react';
import { useDrop } from 'react-dnd';
import { Col, Row } from 'react-bootstrap';
import DraggableUserInfo from '../../users/DraggableUserInfo';
import styled from 'styled-components';

const StyledRow = styled(Row)`
  min-height: 30vh;
  max-height: 40vh;
  overflow-y: auto;
  border: 2px dashed #0f1317;
  padding: 1em;
  margin: 1em;
`;


const sortUsers = (users) => {
  return users.sort((a, b) => {
    if (a.name.localeCompare(b.name) === 0) {
      return a.id - b.id; // 이름이 같으면 ID로 정렬
    }
    return a.name.localeCompare(b.name); // 이름으로 정렬
  });
};

const CourseUserContainer = ({ data, dropUser }) => {

  const sortedUsers = sortUsers(data);
  const [{ isOver }, drop] = useDrop({
    accept: 'user', // 드롭 가능한 타입
    drop: (item) => {
      dropUser(item.user, null, item.containerId); // CourseUserContainer에 유저를 추가
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <StyledRow ref={drop} style={{ backgroundColor: isOver ? 'lightgreen' : 'white', padding: '10px' }}>
      {sortedUsers.map((user) => (
        <Col key={user.id} xs={6} md={4} xl={3}>
          <DraggableUserInfo user={user} containerId={null} /> {/* containerId는 null로 설정 */}
        </Col>
      ))}
    </StyledRow>
  );
};

export default CourseUserContainer;
