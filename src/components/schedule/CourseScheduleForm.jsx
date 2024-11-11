import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import useScheduleApi from '../hook/UseScheduleApi';
import { useCourseApi } from '../hook/UseCourseApi';

const StyledSpan = styled.div`
  font-size: 0.9em;
  color: #6c757d;
  margin-bottom: 1em;
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

const CourseScheduleForm = ({ show, handleClose }) => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState();
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);
  const {fetchAllCourse} = useCourseApi();
  const { addCourseSchedule } = useScheduleApi();

  useEffect(() => {
    const getAllCourse = async () => {
      if(show) {
        const res = await fetchAllCourse();
        setCourses(res);
      }
    }

    getAllCourse()
  }, [show])

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  const setStartDateTime = (value) => {
    const currentDateTime = getCurrentDateTime();
    if (value < currentDateTime) {
      alert("현재 시간 이후의 날짜와 시간을 선택해주세요.");
      return;
    }
    setStartAt(value);
  };

  const setEndDateTime = (value) => {
    const startDateTime = startAt || getCurrentDateTime();
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
      const res = await addCourseSchedule(courseId, data);
      console.log(res);
      alert('일정을 등록했습니다.');
      handleClose(); // 등록 후 모달 닫기
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  };

  const data = {
    name,
    scheduleType: type,
    startAt,
    endAt,
    description,
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>코스 일정 등록하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StyledSpan>
          <StarSpan>*</StarSpan>는 필수 입력값입니다.
        </StyledSpan>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3">
            <Form.Label>
              일정 이름<StarSpan>*</StarSpan>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="일정명을 입력하세요"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              코스<StarSpan>*</StarSpan>
            </Form.Label>
            <Form.Select
              className="w-50"
              onChange={(e) => setCourseId(e.target.value)}
            >
              {
                courses.length > 0 ? 
                <>
                  <option>유형을 선택하세요</option>
                  {
                    courses.map(course => 
                      <option 
                        value={course.id}
                        key={course.id}
                      >
                        {course.name}
                      </option>
                    )
                  }
                </>
                :
                <option>코스가 없습니다.</option>
              }
            </Form.Select>
            <Form.Label>
              일정 유형<StarSpan>*</StarSpan>
            </Form.Label>
            <Form.Select
              className="w-50"
              onChange={(e) => setType(e.target.value)}
            >
              <option>유형을 선택하세요</option>
              <option value="PROJECT">프로젝트</option>
              <option value="LECTURE">특강</option>
              <option value="TEST">테스트</option>
              <option value="COMPLETION">수료</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              시작 날짜 및 시간<StarSpan>*</StarSpan>
            </Form.Label>
            <Form.Control
              type="datetime-local"
              value={startAt}
              onChange={(e) => setStartDateTime(e.target.value)}
              min={getCurrentDateTime()}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>종료 날짜 및 시간</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endAt}
              onChange={(e) => setEndDateTime(e.target.value)}
              min={startAt || getCurrentDateTime()}
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
              <Button variant="secondary" onClick={handleClose}>
                닫기
              </Button>
              <Button onClick={enrollTeamSchedule}>일정 등록</Button>
            </ButtonDiv>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CourseScheduleForm;
