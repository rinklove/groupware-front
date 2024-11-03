import React, { useEffect, useState } from 'react';
import useAttendanceApi from '../../hook/UseAttendanceApi';
import styled from 'styled-components';
import { Table, Accordion, useAccordionButton } from 'react-bootstrap';

const ContentWrapper = styled.div`
  margin: auto;
  margin-top: 3em;
  width: 80%;
  min-width: 800px;
  min-height: 70vh;
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

const AdminAttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const { getAllAttendances } = useAttendanceApi();

  const fetchData = async () => {
    const res = await getAllAttendances();
    setAttendances(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getType = (type) => {
    if (type === 'LATE') return '지각';
    if (type === 'EARLY') return '조퇴';
    if (type === 'OUTING') return '외출';
    return '결석';
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

  const ToggleButton = ({ eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey);
    return (
      <button onClick={decoratedOnClick} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#007bff' }}>
        상세 보기
      </button>
    );
  };

  return (
    <ContentWrapper>
      <TitleDiv>
        <h5>출결 요청 내역</h5>
      </TitleDiv>
      <Accordion>
        <StyledTable bordered style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>  
              <th>이름</th>
              <th>출결 유형</th>
              <th>시작일</th>
              <th>종료일</th>
              <th>사유</th>
            </tr>
          </thead>
          <tbody>
            {attendances.length > 0 ? (
              attendances.map((a, index) => (
                <React.Fragment key={a.attendanceId}>
                  <tr>
                    <td>{a.username}</td>
                    <td>{getType(a.issueType)}</td>
                    <td>{convertTime(a.startAt)}</td>
                    <td>{convertTime(a.endAt)}</td>
                    <td>
                      <ToggleButton eventKey={`${index}`} />
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
  );
};

export default AdminAttendanceList;
