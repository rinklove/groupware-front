import React, { useEffect, useState } from 'react'
import UseAttendanceApi from '../../hook/UseAttendanceApi'
import AttendanceInfo from '../../attendance/AttendanceInfo'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'

const AttendancesApprovalContainer = ({isAdmin}) => {

  const [attendances, setAttendances] = useState([])
  const [data, setData] = useState()
  
  const { getWaitingAttendances } = UseAttendanceApi()
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await getWaitingAttendances()
    setData(res)
    setAttendances(res.content)
  }

  useEffect(() => {
    if(isAdmin) {
      fetchData()
    }
  }, [isAdmin])

  const moveToAdminList = () => {
    navigate(`${ROUTES.ADMIN}${ROUTES.ATTENDANCE}${ROUTES.LIST}`)
  }

  return (
    <div>
      <Button
        variant='link'
        className='text-dark'
        onClick={moveToAdminList}
      >
        모든 출결 내역 조회하기
      </Button>
      {
        attendances.length > 0 ?
        attendances.map(attendance => 
          <AttendanceInfo
            key={attendance.attendanceId}
            attendance={attendance}
            updateData={() => fetchData()}
          />
        )
        :
        <span>요청한 출결 내역이 없습니다.</span>
      }
    </div>
  )
}

export default AttendancesApprovalContainer
