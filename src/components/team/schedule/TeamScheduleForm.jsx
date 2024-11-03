import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import useScheduleApi from '../../hook/UseScheduleApi';
import { useTeam } from '../../hook/UseTeam';

const ContentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
`;

const StyledSpan = styled.div`
  font-size: 0.9em;
  color: #6c757d;
  margin-bottom: 1em;
`

const FormDiv = styled.div`
  width: 60%;
  max-width: 600px;
  min-width: 400px;
  padding: 2em;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;

  & > h5 {
    text-align: center;
  }
`;

const StarSpan = styled.span`
  color: #e54900;
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;

  & > * {
    margin: 0 0.5em;
  }
`;

const TeamScheduleForm = ({ closeForm, onAddSchedule }) => {
  const { teamId } = useTeam();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState();
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);
  const { addTeamSchedule } = useScheduleApi();

  // 현재 시간을 YYYY-MM-DDTHH:MM 형식으로 설정
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM 형식으로 반환
  };

  const setStartDateTime = (value) => {
    const currentDateTime = getCurrentDateTime(); // 현재 시간을 가져옴
    
    // 현재 시간보다 이전의 시간이 입력되면 설정하지 않음
    if (value < currentDateTime) {
      alert("현재 시간 이후의 날짜와 시간을 선택해주세요.");
      return;
    }
    
    // 유효한 시간일 경우에만 상태 업데이트
    setStartAt(value);
  };

  const setEndDateTime = (value) => {
    const startDateTime = startAt || getCurrentDateTime(); // 현재 시간을 가져옴
    
    if (value < startDateTime) {
      alert("시작 시간 이후의 날짜와 시간을 선택해주세요.");
      return;
    }
    
    setEndAt(value);
  };

  const enrollTeamSchedule = async () => {
    if (!name) {
      alert('일정 이름을 입력해주세요');
      nameRef.current.focus();
      return;
    }

    if (isFetching) {
      alert('잠시만 기다려주세요');
      return;
    }

    try {
      setIsFetching(true);
      const res = await addTeamSchedule(data, teamId);
      console.log(res);
      alert('일정을 등록했습니다.');
      onAddSchedule();
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  const data = {
    name,
    "scheduleType": type,
    startAt,
    endAt,
    description,
  };

  return (
    <ContentWrapper>
      <FormDiv>
        <h5>일정 등록하기</h5>
        <StyledSpan><StarSpan>*</StarSpan>는 필수 입력값입니다.</StyledSpan>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3">
            <Form.Label>일정 이름<StarSpan>*</StarSpan></Form.Label>
            <Form.Control
              type="text"
              placeholder="일정명을 입력하세요"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>일정 유형<StarSpan>*</StarSpan></Form.Label>
            <Form.Select
              className="w-50"
              onChange={(e) => setType(e.target.value)}
            >
              <option>유형을 선택하세요</option>
              <option value="MEETING">회의, 약속</option>
              <option value="RBF">RBF</option>
              <option value="SCRUM">스크럼</option>
              <option value="ATTENDANCE">출결</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>시작 날짜 및 시간<StarSpan>*</StarSpan></Form.Label>
            <Form.Control
              type="datetime-local"
              value={startAt}
              onChange={(e) => setStartDateTime(e.target.value)}
              min={getCurrentDateTime()} // 현재 시간 이후로 제한
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>종료 날짜 및 시간</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endAt}
              onChange={(e) => setEndDateTime(e.target.value)}
              min={startAt || getCurrentDateTime()} // 시작 시간 이후로 제한
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>일정 상세 내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="일정에 대한 부연 설명을 작성하세요"
              style={{ resize: 'none' }}
              ref={descriptionRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <ButtonDiv>
              <Button variant="danger" onClick={closeForm}>
                닫기
              </Button>
              <Button onClick={enrollTeamSchedule}>
                일정 등록
              </Button>
            </ButtonDiv>
          </Form.Group>
        </Form>
      </FormDiv>
    </ContentWrapper>
  );
};

export default TeamScheduleForm;
