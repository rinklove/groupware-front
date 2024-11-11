import React, { useEffect, useRef, useState } from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import { useCourseApi } from '../hook/UseCourseApi';
import { useCourse } from '../hook/UseCourse';
import styled from 'styled-components';
import UserDropdown from './UserDropDown';
import TeamLeaderContainer from './TeamLeaderContainer';
import TeamMemberContainer from './TeamMemberContainer';
import CustomButton from '../common/CustomButton';
import { useTeamApi } from '../hook/UseTeamApi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const StarSpan = styled.span`
  color: #e54900;
`;

const StyledGroup = styled(FormGroup)`
  width: 100%;
  display: flex; // flex로 설정하여 같은 줄에 배치
  justify-content: space-between;
  gap: 1em; // 요소 간의 간격 조정
  height: fit-content;

  & > div {
    flex-grow: 1; // 각 div가 동일한 비율로 넓이를 차지하도록 설정
    width: 100%;
  }
`; 

const ButtonDiv = styled.div`
  text-align: end;
  & > * {
    margin: 1em;
  }
`;

const StudyTeamCreateForm = ({ onTeamCreated }) => {
  const { courseId } = useCourse();
  const [users, setUsers] = useState([]);
  const [initUsers, setInit] = useState([]);
  const [leader, setLeader] = useState();
  const [member, setMember] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [name, setName] = useState('');
  const [isFetching, setFetching] = useState(false)
  const { fetchCourseUsers } = useCourseApi();
  const { createStudyTeam } = useTeamApi()
  const navigate = useNavigate();
  const nameRef = useRef(null)

  const fetchData = async () => {
    try {
      const res = await fetchCourseUsers();
      const sortedUsers = await sortUsers(res); // 정렬
      setInit(sortedUsers);
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users: ", error); // 에러 처리
    }
  };

  const sortUsers = async (users) => {
    if (!Array.isArray(users)) return []; // users가 배열이 아닐 경우 빈 배열 반환
    return users.sort((a, b) => a.name.localeCompare(b.name)); // 유저 이름순으로 정렬
  };

  useEffect(() => {
    fetchData();
  }, []); 

  // 리더는 1명만 선택 가능
  const selectLeader = async (data) => {
    setLeader(data);
    // 현재 선택된 리더가 있다면, 그 리더를 사용자 목록에 다시 추가
    if (leader) {
      const updatedUsers = [...users.filter(user => user.id !== data.id), leader]; // 기존 리더를 목록에 추가
      const sortedUsers = await sortUsers(updatedUsers); // 정렬된 사용자 목록
      setUsers(sortedUsers); // 상태 업데이트
    } else {
      setUsers(users.filter(user => user.id !== data.id)); // 새로운 리더는 목록에서 제거
    }
  };

  const returnLeader = async (data) => {
    const sortedUsers = await sortUsers([...users, data])
    setUsers(sortedUsers)
    setLeader()
  }

  // 팀원은 중복 없이 원하는 만큼 선택 가능
  const selectMember = async (data) => {
    console.log(`팀원 정보: `, data)
    setUsers(users.filter(user => user.id !== data.id))
    console.log(`users = `, users);
    
    const sortedUser = await sortUsers([...member, data])
    setMember(sortedUser)
  }

  const returnMember = async (data) => {
    setMember(member.filter(m => m.id !== data.id))
    const sortedUsers = await sortUsers([...users, data])
    setUsers(sortedUsers)
  }

  const createTeam = async () => {
    if(!name) {
      alert('팀 이름을 입력해주세요')
      nameRef.current.focus()
      return;
    }
    
    if(!leader) {
      alert('팀장은 반드시 1명이 있어야 합니다')
      return
    }

    if(member.length === 0) {
      alert('팀원은 반드시 1명이상 있어야 합니다.')
      return
    }

    if(isFetching) {
      alert(`잠시만 기다려주세요`)
      return
    }
    try {
      setFetching(true)
      const data = createRequestData()
      console.log(`requestData = `, data);
      const res = await createStudyTeam(data)
      console.log(res); 
      alert('팀이 생성되었습니다.')
      onTeamCreated()
      navigate(`${ROUTES.COURSE}${ROUTES.TEAM}${ROUTES.LIST}`)
    } catch (e) {
      alert('팀 생성 실패')
      console.error(e);
    } finally {
      setFetching(false)
    }
    
  }

  const createRequestData = () => {
    const userIds = member.map(m => m.id)
    const leaderId = leader.id
    return {
      courseId,
      "teamType": "STUDY",
      name,
      "userIds": [...userIds, leaderId],
      leaderId
    }
  }

  const reset = () => {
    setUsers(initUsers)
    setLeader()
    setMember([])
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label htmlFor='name'>팀 이름<StarSpan>*</StarSpan></Form.Label>
        <Form.Control 
          id='name'
          value={name}
          type="text"
          placeholder="팀 이름을 입력하세요" 
          onChange={(e) => setName(e.target.value)}
          ref={nameRef}
        />
      </Form.Group>
      <StyledGroup className="mb-3">
        <div>
          <UserDropdown
            users={users}
            value={searchName}
            onChange={setSearchName} // 이벤트 객체가 아니라 값으로 전달
            selectLeader={selectLeader}
            selectMember={selectMember}
          />
        </div>
        <div>
          <TeamLeaderContainer
            leader={leader}
            returnLeader={returnLeader}
          />
          <TeamMemberContainer
            member={member}
            returnMember={returnMember}
          />
        </div>
      </StyledGroup>
      <ButtonDiv>
        <CustomButton
          variant='primary'
          type='button'
          innerText='팀 생성'
          color='#ffffff'
          width='fit-content'
          onClick={createTeam}
        />
        <CustomButton
          variant='danger'
          type='button'
          innerText='초기화'
          color='#ffffff'
          width='fit-content'
          onClick={reset}
        />
      </ButtonDiv>
      
    </Form>
  )
}

export default StudyTeamCreateForm;
