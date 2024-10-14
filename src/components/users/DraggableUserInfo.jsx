import React from 'react';
import { useDrag } from 'react-dnd';
import UserInfo from './UserInfo';

const DraggableUserInfo = ({ user, containerId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'user', // 드래그 가능한 타입
    item: { user, containerId }, // 드래그 시 전달할 데이터
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <UserInfo
      ref={drag} // drag ref를 UserInfo에 전달
      user={user}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    />
  );
};

export default DraggableUserInfo;
