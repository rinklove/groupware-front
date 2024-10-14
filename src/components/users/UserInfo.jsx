import React, { forwardRef } from 'react';
import { Image } from 'react-bootstrap';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  width: fit-content;
  min-width: 14em;
  padding: 0.5em;
  margin: 0.5em;
  border: 1px solid #0f1317;
  border-radius: 0.3em;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  cursor: 'move';

  & > div {
    margin: 0 0.3em;
  }
`;

const ChildrenDiv = styled.div`
  position: relative;
  
`;

const UserInfo = forwardRef(({ user, style, children}, ref) => (
  <StyledDiv ref={ref} style={style}>
    <ChildrenDiv>
      {children}
    </ChildrenDiv>
    <div>
      <Image width={50} src="https://img.freepik.com/free-vector/business-user-with-magnifying-glass_78370-7020.jpg?uid=R120404336&ga=GA1.1.316099323.1727838876&semt=ais_hybrid" fluid />
    </div>
    <div>
      <div>이름 <strong>{user.name}</strong></div>
      <div>아이디 <strong>{user.username}</strong></div>
    </div>
  </StyledDiv>
));

export default UserInfo;
