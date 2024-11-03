import React, { useEffect, useState } from 'react';
import useAttendanceApi from '../hook/UseAttendanceApi';
import styled from 'styled-components';
import { Accordion, Button, Table, useAccordionButton } from 'react-bootstrap';
import AttendanceForm from './AttendanceForm';

const ContentWrapper = styled.div`
  margin: auto;
  margin-top: 3em;
  width: 80%;
  min-width: 800px;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTable = styled(Table)`
  margin-top: 1.5em;
  border-collapse: collapse;

  & * {
    text-align: center;
    vertical-align: middle;
  }

  & tr {
    border-bottom: 1px solid #dee2e6;
  }

  & th, & td {
    border: none;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ToggleButton = ({ eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <button onClick={decoratedOnClick} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#007bff' }}>
      상세 보기
    </button>
  );
};

const AttendanceList = () => {
  const [createShow, setCreateShow] = useState(false);
  const [data, setData] = useState(null);
  const [updateShow, setUpdateShow] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const { getMyAttendances, requestAttendance, updateAttendance, deleteAttendance } = useAttendanceApi();

  const fetchData = async () => {
    const res = await getMyAttendances();
    setAttendances(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = (attendance) => {
    setData(attendance);
    setUpdateShow(true);
  };

  const handleDelete = async (attendanceId) => {
    await deleteAttendance({"id": attendanceId});
    alert('삭제했습니다.')
    fetchData(); // 삭제 후 목록 갱신
  };

  const getType = (type) => {
    switch (type) {
      case 'LATE': return '지각';
      case 'EARLY': return '조퇴';
      case 'OUTING': return '외출';
      default: return '결석';
    }
  };

  const convertTime = (time) => {
    const dateTime = new Date(time);
    const now = new Date();
    const isSameYear = dateTime.getFullYear() === now.getFullYear();

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hours = dateTime.getHours();

    return isSameYear
      ? `${month}월 ${day}일 ${hours}시`
      : `${year}년 ${month}월 ${day}일 ${hours}시`;
  };

  return (
    <>
      <ContentWrapper>
        <TitleDiv>
          <h5>나의 출결 요청 목록</h5>
          <Button
            variant="link"
            className="text-dark text-decoration-none"
            onClick={() => setCreateShow(true)}
          >
            출결 요청하기
          </Button>
        </TitleDiv>
        <Accordion>
          <StyledTable bordered>
            <thead>
              <tr>
                <th>출결 유형</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>사유</th>
                <th>추가 작업</th>
              </tr>
            </thead>
            <tbody>
              {attendances.length > 0 ? (
                attendances.map((a, index) => (
                  <React.Fragment key={a.attendanceId}>
                    <tr>
                      <td>{getType(a.issueType)}</td>
                      <td>{convertTime(a.startAt)}</td>
                      <td>{convertTime(a.endAt)}</td>
                      <td>
                        <ToggleButton eventKey={`${index}`} />
                      </td>
                      <td>
                        <ButtonDiv>
                          <Button
                            variant="link"
                            className="text-dark text-decoration-none"
                            onClick={() => handleUpdate(a)}
                          >
                            수정
                          </Button>
                          <Button
                            variant="link"
                            className="text-dark text-decoration-none"
                            onClick={() => handleDelete(a.attendanceId)}
                          >
                            삭제
                          </Button>
                        </ButtonDiv>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} style={{ padding: 0 }}>
                        <Accordion.Collapse eventKey={`${index}`}>
                          <div style={{ padding: '10px', textAlign: 'left' }}>
                            상세 내용 : {a.description || '설명이 없습니다.'}
                          </div>
                        </Accordion.Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>출결 요청 내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </Accordion>
      </ContentWrapper>
      {createShow && (
        <AttendanceForm
          closeForm={() => setCreateShow(false)}
          onAddAttendance={fetchData}
          onEnroll={requestAttendance}
        />
      )}
      {updateShow && (
        <AttendanceForm
          closeForm={() => setUpdateShow(false)}
          data={data}
          onAddAttendance={fetchData}
          onEnroll={updateAttendance}
        />
      )}
    </>
  );
};

export default AttendanceList;
