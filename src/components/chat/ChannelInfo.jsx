import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  border: 1px solid #0f1317; /* 테두리 두께를 2px로 하고, 색상은 파란색 */
  border-radius: 8px; /* 모서리 둥글게 */
  padding: 1em;
  background-color: #f8f9fa; /* 배경 색상 추가 */
  margin-bottom: 1em;

  ${({ hoverEnabled }) =>
    hoverEnabled &&
    `
      &:hover {
        background-color: lightgray;
        cursor: pointer;
      }
    `}
`;

const Title = styled.h6`
  font-weight: 700;
  margin-bottom: 0.5em;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
`;

const TimeStamp = styled.div`
  font-size: 0.8em;
  color: gray;
`;

const ChannelInfo = ({ data, hoverEnabled, onclick }) => {
  const convertTime = (time) => {
    if (!time) return '정보 없음';

    const currentTime = new Date();
    const lastTime = new Date(time);
    const diffInMs = currentTime - lastTime;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return '방금 전';
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInDays < 30) return `${diffInDays}일 전`;

    return '오래 전';
  };

  return (
    <ContentWrapper hoverEnabled={hoverEnabled} onClick={onclick ? () => onclick(data?.channelId) : null}>
      <Title>{data?.name || data}</Title>
      {data?.lastMessage ? (
        <MessageWrapper>
          <div>
            <span>{data?.lastMessage}</span>
          </div>
          <TimeStamp>{convertTime(data?.lastMessageTime)}</TimeStamp>
        </MessageWrapper>
      ) : (
        <span>메시지가 없습니다.</span>
      )}
    </ContentWrapper>
  );
};

export default ChannelInfo;
