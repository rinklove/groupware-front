import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import UseAttendanceApi from '../hook/UseAttendanceApi'

const ContentWrapper = styled.div`
  border: 1px solid #0f1317;
  border-radius: 1em;
  padding: 1em;
  

  & > div {
    margin: 0.1em 0;
  }
`

const ButtonDiv = styled.div`
  margin-top: 1em;
  display: flex;

  & > button {
    margin: 0 0.5em;
    margin-top: 1em;
    width: 5em;
  }
`

const AttendanceInfo = ({attendance}) => {

  const {approveAttendance, rejectAttendance} = UseAttendanceApi()

  const getType = (type) => {
    if(type === 'LATE') return "지각"
    if(type === 'EARLY') return "조퇴"
    if(type === 'OUTING') return "외출"
    return "결석"
  }

  const converTime = (time) => {
    const dateTime = new Date(time)
    const now = new Date();
    const isSameYear = dateTime.getFullYear() === now.getFullYear();

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    
    return isSameYear
      ? `${month}월 ${day}일 ${hours}시`
      : `${year}년 ${month}월 ${day}일 ${hours}시`;
  }

  return (
    <ContentWrapper>
      <div>
        <span>이름</span>
        <div className="vr mx-2" />
        <span>{attendance.username}</span>
      </div>
      <div>
        <span>기간</span>
        <div className="vr mx-2" />
        <span>{converTime(attendance.startAt)} ~ {converTime(attendance.endAt)}</span>
      </div>
      <div>
        <span>유형</span>
        <div className="vr mx-2" />
        <span>{getType(attendance.issueType)}</span>
      </div>
      <div>
        <h6>사유</h6>
        <span>{attendance.descripion}</span>
      </div>
      <ButtonDiv>
        <Button
          variant='success'
          onClick={() => approveAttendance({"id": attendance.attendanceId})}
        >
          승인
        </Button>
        <Button
          variant='danger'
          onClick={() => rejectAttendance({"id": attendance.attendanceId})}
        >
          반려
        </Button>
      </ButtonDiv>
    </ContentWrapper>
  )
}

export default AttendanceInfo
