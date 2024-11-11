import React, { useEffect, useState } from 'react';
import ChannelList from '../../components/chat/ChannelList';
import styled from 'styled-components';
import ChatView from '../../components/chat/ChatView';
import useChannelApi from '../../components/hook/UseChannelApi';
import useChatApi from '../../components/hook/UseChatApi';
import { Client } from "@stomp/stompjs";
import { Container, Row, Col } from 'react-bootstrap';

const ContentWrapper = styled(Container)`
  display: flex;
  justify-content: center;
  padding: 2em;
  background-color: #f4f6f8;
  border-radius: 10px;
`;

const ChannelListWrapper = styled(Col)`
  max-width: 350px;
  padding: 1em;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 2em;
  height: 80vh;
  overflow-y: auto;
`;

const ChatWrapper = styled(Col)`
  flex: 1;
  padding: 1em;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 80vh;
  overflow-y: auto;
`;

const ChatListPage = ({ isAdmin }) => {
  const [socketClient, setSocketClient] = useState(null);
  const [channelId, setChannelId] = useState();
  const [allChannels, setAllChannels] = useState([]);
  const [myChannels, setMyChannels] = useState([]);
  const [userId, setUserId] = useState();
  const [chatLog, setChatLog] = useState([]);
  const { getAllChannel, getMyChannel } = useChannelApi();
  const { getChatLog } = useChatApi();

  useEffect(() => {
    fetchAllChannel();
    fetchMyChannel();
  }, []);

  const fetchAllChannel = async () => {
    try {
      const res = await getAllChannel();
      setAllChannels(res);
    } catch ({ response }) {
      console.error('채널을 불러오는 중 오류 발생', response);
    }
  };

  const fetchMyChannel = async () => {
    try {
      const res = await getMyChannel();
      setMyChannels(res);
      setUserId(res[0]?.user);
    } catch ({ response }) {
      console.error('내 채널을 불러오는 중 오류 발생', response);
    }
  };

  const initializeSocket = (channelId) => {
    if (!userId) return;
  
    const newSocketClient = new Client({
      brokerURL: "ws://localhost:8080/stomp-endpoint",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  
    newSocketClient.onConnect = () => {
      newSocketClient.subscribe(`/topic/chat/${channelId}`, (message) => {
        if (message.body) {
          const parsedMessage = JSON.parse(message.body);
          setChatLog((prevLog) => [...prevLog, parsedMessage]);
        }
      });
    };
  
    newSocketClient.activate();
    setSocketClient(newSocketClient);
  };

  const disConnect = () => {
    if (socketClient) {
      socketClient.deactivate();
    }
  };

  const sendMessage = (msg) => {
    if (msg && userId && socketClient && channelId) {
      const messageObj = {
        channelId,
        userId,
        content: msg,
        createdAt: new Date(),
        actionType: 1,
      };
  
      socketClient.publish({
        destination: `/app/chat/${channelId}`,
        body: JSON.stringify(messageObj),
      });
    }
  };

  const fetchChatLog = async () => {
    try {
      const res = await getChatLog(channelId);
      setChatLog(res.filter((per) => per.content !== ''));
    } catch (e) {
      alert('채팅방을 여는데 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (channelId) {
      fetchChatLog();
      initializeSocket(channelId);
    }

    return () => {
      disConnect();
    };
  }, [channelId]);

  return (
    <ContentWrapper fluid>
      <ChannelListWrapper>
        <ChannelList
          isAdmin={isAdmin}
          total={allChannels}
          my={myChannels}
          changeChannel={setChannelId}
          onCreate={() => {
            fetchAllChannel();
            fetchMyChannel();
          }}
        />
      </ChannelListWrapper>
      <ChatWrapper>
        {channelId && (
          <ChatView 
            chatLog={chatLog} 
            sendMessage={sendMessage} 
            mine={userId}
          />
        )}
      </ChatWrapper>
    </ContentWrapper>
  );
};

export default ChatListPage;
