import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ChatListPage from './ChatListPage'
import styled from 'styled-components'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../components/hook/UseAuth'
import AdminCourseSelector from '../../components/common/AdminCourseSelector'

const ContentWrapper = styled.div`
  min-height: 70vh;
`

const ChatPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { getUserRole } = useAuth();

  const fetchData = async () => {
    const res = await getUserRole()
    setIsAdmin(isAdmin)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (

    <ContentWrapper>
      {
        isAdmin && 
        <AdminCourseSelector onCourseChange={(newCourseId) => console.log(newCourseId)} /> // courseId에 따라 필요한 동작을 수행
      }
      <Routes>
        <Route path={`${ROUTES.LIST}`} element={<ChatListPage isAdmin={isAdmin}/>}/>
      </Routes>
    </ContentWrapper>
  )
}

export default ChatPage
