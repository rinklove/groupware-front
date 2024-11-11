import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import styled from 'styled-components'
import { useTeamApi } from '../../hook/UseTeamApi';

const ContentWrapper = styled.div`
  border: 1px solid #6c757d;
  border-radius: 1em;
  padding: 1em;
  margin: 0.5em;
`

const CourseSpan = styled.span`
  font-size: 1.05em;
  font-weight: 600;
  margin-bottom: 1em;
`

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;

  &  > button {
    margin: 0 0.5em;
    width: 5em;
  }
`;

const WaitingTeamInfo = ({data, onUpdate}) => {

  const { approveTeam, rejectTeam } = useTeamApi();
  const [isFetching, setIsFetching] = useState(false);

  const handdleApprove = async (id) => {
    if(!window.confirm('승인 하시겠습니까?')) {
      return
    }

    if(isFetching) {
      alert('잠시만 기다려주세요')
      return
    }

    try {
      const {value} = await approveTeam({"teamId": id})
      alert("승인했습니다.")
      onUpdate()
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false)
      
    }
  }

  const handleReject = async (id) => {
    if(!window.confirm('취소 하시겠습니까?')) {
      return
    }
    
    if(isFetching) {
      alert('잠시만 기다려주세요')
      return
    }

    try {
      const res = await rejectTeam({"teamId": id})
      alert('거절했습니다.')
      onUpdate()
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false)
      
    }
  }

  return (
    <ContentWrapper>
      <CourseSpan>{data.courseName}</CourseSpan>
      <div>
        <span>팀 이름</span>
        <div className="vr mx-2" />
        <span>{data.name}</span>
      </div>
      <hr/>
      <ButtonDiv>
      <Button 
        variant="success"
        size="sm"
        onClick={() => handdleApprove(data.id)}
      >
        승인
      </Button>
      <Button 
        variant="danger"
        size="sm"
        onClick={() => handleReject(data.id)}
      >
        취소
      </Button>
        
      </ButtonDiv>
    </ContentWrapper>
  )
}

export default WaitingTeamInfo
