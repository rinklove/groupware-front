import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Modal, Button, Form, FormGroup, Card } from 'react-bootstrap';
import styled from 'styled-components';
import ChannelInfo from './ChannelInfo';
import { useCourseApi } from '../hook/UseCourseApi';
import useChannelApi from '../hook/UseChannelApi';
import ParticipantDropdown from './ParticipantDropDown';

const ScrollableTabContent = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const StyledGroup = styled(FormGroup)`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ParticipantContainer = styled.div`
  max-height: 150px;
  overflow-y: auto;
  padding: 1em;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  background-color: #f8f9fa;
`;

const ButtonDiv = styled.div`
  text-align: end;
  & > * {
    margin: 1em;
  }
`;

const ChannelList = ({ total, my, changeChannel, isAdmin, onCreate }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [isFetching, setFetching] = useState(false);
  const { fetchAllUserByCourseIdForAdmin, fetchAllUser } = useCourseApi();
  const { createChannel, inviteUsers } = useChannelApi();

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const fetchUsers = async () => {
    const id = localStorage.getItem("id");
    const res = await (isAdmin ? fetchAllUserByCourseIdForAdmin() : fetchAllUser());
    setUsers(res.filter(user => user.username !== id));
    setParticipants([]);
  };

  useEffect(() => {
    if (showModal) {
      fetchUsers();
    }
  }, [showModal]);

  const selectParticipant = (user) => {
    setUsers(users.filter((u) => u.id !== user.id));
    setParticipants([...participants, user]);
  };

  const removeParticipant = (user) => {
    setParticipants(participants.filter((p) => p.id !== user.id));
    setUsers([...users, user]);
  };

  const handleCreateTeam = async () => {
    if (isFetching) {
      alert('잠시만 기다려주세요');
      return;
    }

    try {
      setFetching(true);
      const createdChannelId = await createChannel({ channelName });
      const inviteRequest = {
        "participantIds": participants.map((participant) => participant.id),
        "channelId": createdChannelId,
      };
      await inviteUsers(inviteRequest);
      alert('채팅방을 만들었습니다.');
      onCreate();
      handleModalClose();
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  return (
    <>
      <Tabs className="mb-3">
        <Tab eventKey="total" title="모든 채팅방">
          <ScrollableTabContent>
            {total.length > 0 ? (
              total.map((per, index) => 
              <ChannelInfo 
                key={`${per.channelId}_${index}`}
                data={per} 
                hoverEnabled={false}
              />)
            ) : (
              <span>개설된 채팅방이 없습니다.</span>
            )}
          </ScrollableTabContent>
        </Tab>
        <Tab eventKey="my" title="내 채팅방">
          <ScrollableTabContent>
            {my.length > 0 ? (
              my.map((per) => 
              <ChannelInfo
                onclick={changeChannel}
                key={per.channelId} 
                data={per}
                hoverEnabled={true}
              />)
            ) : (
              <span>참여 중인 채팅방이 없습니다.</span>
            )}
          </ScrollableTabContent>
        </Tab>
      </Tabs>
      
      <Button variant="primary" onClick={handleModalOpen} className='mt-4'>
        채팅방 새로 만들기
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>새 채팅방 만들기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="channelName">
              <Form.Label>채팅방 이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="채팅방 이름을 입력하세요"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </Form.Group>
            <StyledGroup>
              <ParticipantDropdown users={users} add={selectParticipant} />
              <ParticipantContainer>
                <h5>초대된 사용자</h5>
                {participants.length > 0 ? (
                  participants.map((user) => (
                    <Card key={user.id} className="p-2 mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{user.name}</span>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => removeParticipant(user)}
                        >
                          제거
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <span>선택된 사용자가 없습니다.</span>
                )}
              </ParticipantContainer>
            </StyledGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleCreateTeam}>
            생성
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChannelList;
