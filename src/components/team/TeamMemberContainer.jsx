import React from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import styled from 'styled-components'


const MemberDiv = styled.div`
  max-height: 25vh;
  min-height: 15em;
  overflow-y: auto;
  border: 1px solid #0f1317;
  width: 100%;
  border-radius: 0.5em;
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

const TeamMemberContainer = ({member, returnMember}) => {
  return (
    <MemberDiv>
      <h6>팀원</h6>
      {
        member.length > 0 &&
        member.map(m => 
          <Dropdown.Item
              key={m.id}
              eventKey={m.id}
              className="d-flex justify-content-center align-items-center"
            >
              {m.name}
              <ButtonDiv>
                <Button 
                  variant="primary"
                  size="sm"
                  onClick={() => returnMember(m)}
                >
                  취소
                </Button>
              </ButtonDiv>
            </Dropdown.Item>
        )
      }
    </MemberDiv>
  )
}

export default TeamMemberContainer
