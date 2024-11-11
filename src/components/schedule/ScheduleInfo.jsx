import React, { useState } from 'react'
import { Badge, ListGroup } from 'react-bootstrap'
import styled from 'styled-components';
import useScheduleApi from '../hook/UseScheduleApi';

const Title = styled.h6`
  font-size: 1.1em;
  font-weight: 700;
`

const ScheduleInfo = ({ data, isTeamSchedule, isAdmin, updateData }) => {

  const {deleteTeamSchedule, deleteCourseSchedule} = useScheduleApi();
  const [isFethcing, setFetching] = useState(false);

  const convertTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const isSameYear = date.getFullYear() === now.getFullYear();
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    const hours = date.getHours();
    
    return isSameYear
      ? `${month}월 ${day}일 ${hours}시`
      : `${year}년 ${month}월 ${day}일 ${hours}시`;
  };

  const handleDelete = async (id) => {
    if(isFethcing) {
      alert('잠시만 기다려주세요')
      return;
    }
      await isTeamSchedule 
          ? handleDeleteTeamSchedule(id) 
          : handleDeleteCourseSchedule(id)
          
      updateData()
  }

  const handleDeleteTeamSchedule = async (id) => {
    try {
      setFetching(true)
      const res = await deleteTeamSchedule({id})
      alert('일정을 삭제했습니다.')
    } catch (e) {
      console.error(e);
      alert('삭제에 실패했습니다.')
    } finally {
      setFetching(false)
    }
  }

  const handleDeleteCourseSchedule = async (id) => {
    try {
      setFetching(true)
      const res = await deleteCourseSchedule({id})
      alert('일정을 삭제했습니다.')
    } catch (e) {
      console.error(e);
      alert('삭제에 실패했습니다.')
    } finally {
      setFetching(false)
    }
  }

  return (
    <ListGroup.Item key={data?.id}>
      <div>
        <Title>
          {data?.name}
          {
            (isAdmin && !isTeamSchedule) || (!isAdmin && isTeamSchedule) &&
            <Badge 
              pill 
              bg="danger" 
              style={{ cursor: 'pointer', marginLeft: '1em' }} 
              onClick={() => handleDelete(data.id)} // 삭제 이벤트 실행
            >
              삭제
            </Badge>
            
          }
        </Title>
      </div>
      <span>
        {convertTime(data?.startAt)} ~ {convertTime(data?.endAt)}
      </span>
      <div>
        <span>{data?.description}</span>
      </div>
    </ListGroup.Item>
  )
}

export default ScheduleInfo
