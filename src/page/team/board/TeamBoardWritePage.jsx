import React from 'react'
import TeamBoardForm from '../../../components/board/TeamBoardForm';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin: auto;
  margin-top: 2em;
  padding: 1em;
  width: 80%;
  min-height: 60vh;
`

const TeamBoardWritePage = () => {
  
  return (
    <ContentWrapper>
      <TeamBoardForm/>
    </ContentWrapper>
  )
}

export default TeamBoardWritePage