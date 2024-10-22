import React from 'react'
import MyTeamContainer from '../team/MyTeamContainer'
import AdminCourseTeamContainer from '../team/AdminCourseTeamContainer'
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 0.5px solid #0f1317;
  border-radius: 0.5em;
`;

const TeamContainer = ({isAdmin, courseId}) => {
  return (
    <StyledDiv>
      {
        isAdmin ? 
        <AdminCourseTeamContainer
          courseId={courseId}
        /> 
        :
        <MyTeamContainer/>
      }
    </StyledDiv>
  )
}

export default TeamContainer
