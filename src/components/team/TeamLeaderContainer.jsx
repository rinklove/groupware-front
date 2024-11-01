import React from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import styled from 'styled-components'

const LeaderDiv = styled.div`
  max-height: 25vh;
  min-height: 5em;
  overflow-y: auto;
  border: 1px solid #0f1317;
  width: 100%;
  border-radius: 0.5em;
  margin-bottom: 1em;

  & > h6 {
    text-align: center;
    margin: 0.5em 0; 
    font-weight: 600;
  }
`;

const ButtonDiv = styled.div`

  & > * {
    margin: 0.3em;
  }
`;

const TeamLeaderContainer = ({leader, returnLeader}) => {
  return (
    <LeaderDiv>
      <h6>팀장</h6>
      {
        leader &&
          <Dropdown.Item
            eventKey={leader.id}
            className="d-flex justify-content-center align-items-center"
          >
            {leader.name}
          <ButtonDiv>
            <Button 
              variant="primary"
              size="sm"
              onClick={() => returnLeader(leader)}
            >
              취소
            </Button>
          </ButtonDiv>
        </Dropdown.Item>
      }
    </LeaderDiv>
  )
}

export default TeamLeaderContainer
