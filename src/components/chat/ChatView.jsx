import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form, Stack, Container, Row, Col } from 'react-bootstrap';
import Chat from './Chat';

const ChatView = ({ chatLog, sendMessage, mine }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(chatLog);
  }, [chatLog]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <Container fluid style={{ padding: '1em', borderRadius: '5px', backgroundColor: '#f8f9fa' }}>
      <Row>
        <Col style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '1em', backgroundColor: '#fff' }}>
          {chatLog.length > 0 ? (
            chatLog.map((log, index) => (
              <Chat
                key={index}
                data={log}
                mine={mine}
              />
            ))
          ) : (
            <div className="text-center text-muted">채팅 내역이 없습니다.</div>
          )}
        </Col>
      </Row>
      <Row className="mt-3">
        <Stack direction="horizontal" gap={2} style={{ width: '100%' }}>
          <Form.Control
            type="text"
            placeholder="메시지를 입력하세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ borderRadius: '20px' }}
          />
          <Button variant="primary" onClick={handleSendMessage} style={{ width: '3em', borderRadius: '50%', padding: '0.5em' }}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Stack>
      </Row>
    </Container>
  );
};

export default ChatView;
