import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import styled from 'styled-components';
import { useCourseApi } from '../../hook/UseCourseApi';

const StyledTable = styled(Table)`
  border-color: rgba(255, 255, 255, 0);
  & * {
    vertical-align: middle;
    text-align: center;
  }
  & tr:first-child {
    width: 20%;
  }
  & tr:nth-child(3), tr:nth-child(4) {
    width: fit-content;
  }
`;

const ManageCourseModal = ({show, handleClose}) => {
  const [courses, setCourses] = useState([]);
  const [editMode, setEditMode] = useState({}); // 각 코스에 대해 수정 모드 상태를 관리
  const [originalNames, setOriginalNames] = useState({}); // 각 코스의 원래 이름 저장
  const [isFetching, setFetching] = useState(false);
  const { fetchAllCourse, updateCourse } = useCourseApi();

  const getFetchData = async () => {
    try {
      const res = await fetchAllCourse();
      setCourses(res);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!show) return;
    getFetchData();
  }, [show]);

  // 수정 모드로 변경
  const toggleEditMode = (id) => {
    setEditMode(prevState => ({
      ...prevState,
      [id]: !prevState[id]  // 해당 코스의 수정 모드 상태를 토글
    }));

    // 수정 모드로 들어갈 때 원래 이름 저장
    if (!editMode[id]) {
      setOriginalNames(prevState => ({
        ...prevState,
        [id]: courses.find(course => course.id === id)?.name // 원래 이름 저장
      }));
    } else {
      // 수정 모드에서 나갈 때 원래 이름을 복원
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course.id === id ? { ...course, name: originalNames[id] } : course
        )
      );
      // 원래 이름 삭제
      setOriginalNames(prevState => {
        const { [id]: removed, ...rest } = prevState; // 원래 이름 상태에서 삭제
        return rest;
      });
    }
  }

  // 코스 수정 로직
  const handleCourseChange = (id, newName) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === id ? { ...course, name: newName } : course
      )
    );
  }

  const updateCourses = async (id) => {
    if (isFetching) {
      alert('잠시만 기다려주세요');
      return;
    }

    try {
      const reqData = { id, name: courses.find(course => course.id === id)?.name }; // 업데이트할 데이터
      console.log(reqData);
      
      const res = await updateCourse(reqData); // 실제 API 호출
      alert('코스명이 수정되었습니다.')
      toggleEditMode(id); // 수정 후 다시 수정 모드 종료
      getFetchData(); // 수정 후 데이터를 다시 불러옴
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  }

  const deleteCourses = (id) => {
    // 삭제 API 호출 로직을 여기에 추가

    getFetchData(); // 삭제 후 데이터를 다시 불러옴
  }

  return (
    <Modal
        size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>코스 관리</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledTable 
            striped bordered
            responsive={true}
          > 
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th colSpan={2}>추가작업</th>
              </tr>
            </thead>
            <tbody>
              {
                courses?.length > 0 ? 
                courses.map((c, index) => 
                  <tr key={c?.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Form>
                        <Form.Control 
                          type="text"
                          value={c.name}
                          onChange={(e) => handleCourseChange(c.id, e.target.value)}  // 입력 값 변경 처리
                          readOnly={!editMode[c.id]}  // 수정 모드일 때만 입력 가능
                        />
                      </Form>
                    </td>
                    <td>
                      {
                        editMode[c.id] ? 
                        <>
                          <Button variant="success" onClick={() => updateCourses(c.id)}>저장</Button>{' '}
                          <Button variant="secondary" onClick={() => toggleEditMode(c.id)}>취소</Button>
                        </>
                        :
                        <Button variant="primary" onClick={() => toggleEditMode(c.id)}>수정하기</Button>
                      }
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => deleteCourses(c.id)}>삭제하기</Button>
                    </td>
                  </tr>    
                ) : 
                <tr>
                  <td colSpan={4}>
                    코스가 없습니다.
                  </td>
                </tr>
              }
            </tbody>
          </StyledTable>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ManageCourseModal;
