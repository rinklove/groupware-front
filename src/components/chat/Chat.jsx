import React from 'react'
import styled from 'styled-components'

const Title = styled.h6`
  font-weight: 600;
`

const ContentDiv = styled.div`
  display: inline-block;
  padding: 0.4em;
  margin-bottom: 0.3em;
  height: fit-content;
  background-color: ${({ isMine }) => (isMine ? '#d3f8e2' : '#f1f0f0')}; // 자신의 메시지와 다른 사람 메시지 구분
  border-radius: 8px;
  text-align: ${({ isMine }) => (isMine ? 'right' : 'left')};
`

const TimeSpan = styled.span`
  font-size: 0.8em;
  color: #888;
  display: block;
  text-align: ${({ isMine }) => (isMine ? 'right' : 'left')};
`

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')}; // 자신의 메시지는 오른쪽 정렬, 상대방 메시지는 왼쪽 정렬
  margin: 0.5em 0;
`

const Chat = ({ data, mine }) => {
  const convertTime = (t) => {
    const time = new Date(t);
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? '오후' : '오전';
    const adjustedHours = hours % 12 || 12; // 0시는 12시로 표시

    return `${period} ${adjustedHours}시 ${minutes}분`;
  };

  const isMine = data.userId === mine;

  return (
    <ChatWrapper isMine={isMine}>
      {!isMine && <Title>{data.userName}</Title>}
      <ContentDiv isMine={isMine}>
        {data.content}
      </ContentDiv>
      <TimeSpan isMine={isMine}>{convertTime(data.createdAt)}</TimeSpan>
    </ChatWrapper>
  );
}

export default Chat;
