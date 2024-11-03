import React, { useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import UseAttendanceApi from '../hook/UseAttendanceApi';

const ModalContainer = styled.div`
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

const StyledSpan = styled.div`
  font-size: 0.9em;
  color: #6c757d;
  margin-bottom: 0.5em;
`

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;

  & > * {
    margin: 0 0.5em;
  }
`;

const AttendanceForm = ({data, closeForm, onAddAttendance, onEnroll}) => {
  const [description, setDescription] = useState(data?.description || '');
  const [type, setType] = useState(data?.type || ''); // 초기값 빈 문자열
  const [startAt, setStartAt] = useState(data?.startAt || ''); // 초기값 빈 문자열
  const [endAt, setEndAt] = useState(data?.endAt || ''); // 초기값 빈 문자열
  const descriptionRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);

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

  const isAbsent = () => {
    // 유형이 "ABSENT"인지 확인
    if (type !== "ABSENT") return false;

    // 시작 날짜와 종료 날짜가 같은지 확인
    const startDate = new Date(startAt);
    const endDate = new Date(endAt);
    if (startDate.toDateString() !== endDate.toDateString()) return false;

    // 시작 시간과 종료 시간이 각각 오전 9시와 오후 6시인지 확인
    const isStartAt9AM = startDate.getHours() === 9 && startDate.getMinutes() === 0;
    const isEndAt6PM = endDate.getHours() === 18 && endDate.getMinutes() === 0;

    return isStartAt9AM && isEndAt6PM;
  }

  const enrollAttendance = async () => {

    if(!type) {
      alert('출결 유형을 선택해주세요')
    }

    if(!isAbsent()) {
      alert('출결 이슈가 결석인 조건에 부합하지 않습니다.')
      return;
    }

    if (isFetching) {
      alert('잠시만 기다려주세요');
      return;
    }

    try {
      setIsFetching(true);
      // const res = await requestAttendance(requestData);
      const res = await onEnroll(requestData);
      console.log(res);
      if(data.attendanceId) {
        alert('요청한 출결을 수정했습니다.');
      } else {
        alert('출결을 요청했습니다.');

      }
      onAddAttendance();
    } catch (e) {
      if(e.code === 400) {
        alert(e.message)
      }
    } finally {
      setIsFetching(false);
    }
  };

  const requestData = {
    ...(data?.attendanceId && { "id": data.attendanceId }),
    "issueType": type,
    startAt,
    endAt,
    description,
  };

  return (
    <ModalContainer>
      <FormDiv>
      <h5>출결 이슈 요청하기</h5>
        <StyledSpan><StarSpan>*</StarSpan>는 필수 입력값입니다.</StyledSpan>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3">
            <Form.Label>출결 이슈 유형<StarSpan>*</StarSpan></Form.Label>
            <Form.Select
              className="w-50"
              onChange={(e) => setType(e.target.value)}
            >
              <option>유형을 선택하세요</option>
              <option value="EARLY">조퇴</option>
              <option value="OUTING">외출</option>
              <option value="LATE">지각</option>
              <option value="ABSENT">결석</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <StyledSpan>결석시 시작 시간은 오전 9시, 종료 시간은 오후 6시로 설정해주세요</StyledSpan>
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
            <Form.Label>사유<StarSpan>*</StarSpan></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="출결 이슈에 대한 사유을 작성해주세요"
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
              <Button onClick={enrollAttendance}>
                일정 등록
              </Button>
            </ButtonDiv>
          </Form.Group>
          </Form>
      </FormDiv>
    </ModalContainer>
  )
}

export default AttendanceForm
