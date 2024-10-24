import React, { useEffect, useState } from 'react'
import BoardList from '../../components/board/BoardList'
import PagingContainer from '../../components/board/PagingContainer'

const CourseStudyBoardList = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <BoardList 
        data={data}
      />
      <PagingContainer/>
    </div>
  )
}

export default CourseStudyBoardList
