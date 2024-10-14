import React from 'react';
import { useDrop } from 'react-dnd';
import { Col, Row, Button, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import DraggableUserInfo from './DraggableUserInfo';

const StyledRow = styled(Row)`
  min-height: 20vh;
  min-width: 20em;
  border: 1.5px dashed #0f1317;
  overflow: hidden; 

  > div.col {
    width: 100%;
    box-sizing: content-box;
    height: fit-content;
    flex: 0 0 auto; // flex 속성을 이용해 너비가 변경되지 않도록 설정
  }
`;

const TeamSetDiv = styled.div`
  margin-bottom: 1em;
  & > span {
    padding: 1em;
    font-weight: 600;
    font-size: 1.2em;
  }
`;


const DroppedUsersContainer = ({ containerId, droppedUsers, dropUser, returnUser, removeContainer, index }) => {
  // useDrop 훅 설정
  const [{ isOver }, drop] = useDrop({
    accept: 'user', // 드롭 가능한 타입
    drop: (item) => {
      // 같은 컨테이너로 드롭하지 않도록 처리
      if (item.containerId !== containerId) {
        dropUser(item.user, containerId, item.containerId); // 드롭된 유저를 처리
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Row ref={drop} style={{ backgroundColor: isOver ? 'lightblue' : 'white', padding: '10px' }}>
      <Col xs={12} md={12} xl={12}>
        <TeamSetDiv>
          <span>{index}팀</span>
          <Button variant="danger" onClick={removeContainer}>
            팀 삭제
          </Button>
        </TeamSetDiv>
        <StyledRow>
          {droppedUsers.length > 0 ? (
            droppedUsers.map((user) => (
              <Col key={user.id} xs={12} md={12} xl={12}>
                {/* DraggableUserInfo로 유저 표시 */}
                <DraggableUserInfo user={user} containerId={containerId}>
                  <Badge
                    bg="secondary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => returnUser(user, containerId)}
                  >
                    반환
                  </Badge>
                </DraggableUserInfo>
              </Col>
            ))
          ) : (
            <Col xs={12} md={12} xl={12}>
              <span>팀에 배정된 수강생이 없습니다.</span>
            </Col>
          )}
        </StyledRow>
      </Col>
    </Row>
  );
};

export default DroppedUsersContainer;
