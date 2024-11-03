import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';
import { useTeam } from '../hook/UseTeam';

const ListDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & > * {
    margin: 0 0.5em;
  }
`

const NameSpan = styled.span`
  font-size: 1em;
  font-weight: 700;
  margin-right: 0.5em;
`;

const InfoDiv = styled.div`

  & > span {
    margin-right: 0.5em;
  }
`;

const TeamList = ({ teams= [] }) => {
  const navigate = useNavigate()
  const { setTeamId } = useTeam()

  const enterTeamSpace = (team) => {
    setTeamId(team.id)
    navigate(`${ROUTES.TEAM}${ROUTES.MAIN}`, 
      { state: { 
        "teamName": team.name,
        },
      }
    )
  }
  
  return (
      <ListGroup>
        {
          teams.length > 0 ?
          teams.map(team =>           
            <ListGroup.Item
              key={team.id}
              variant="light"
            >
              <ListDiv>
                <div>
                  <NameSpan>
                    {team.name}
                  </NameSpan>
                  <span
                    className='text-secondary'
                  >
                    {team.creationWaiting && '승인 대기중'}
                  </span>
                  <InfoDiv>
                    <span>
                      팀 유형 {team.teamType === 'STUDY' ? ' 스터디' : ' 프로젝트'}
                    </span>
                  </InfoDiv>
                </div>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => enterTeamSpace(team)}
                >
                  → 이동하기
                </Button>
              </ListDiv>
            </ListGroup.Item>
          ) : 
          <ListGroup.Item variant="light">
            팀 목록이 없습니다.
          </ListGroup.Item>
        }
      </ListGroup>
  );
}

export default TeamList;
