import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CustomInput from '../../common/CustomInput';
import styled from 'styled-components';
import { fetchAllCourse, fetchUsersByCourse } from '../../../api/course';
import DroppedUsersContainer from '../../users/DroppedUserContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CourseUserContainer from './CourseUserContainer';
import CourseSelect from '../course/\bCourseSelect';

const StyledContainer = styled(Container)`
  margin-top: 3em;
  
  & > * {
    margin: 0.5em 0;
  }
`;

const CreateTeamCol = styled(Col)`

`;

const CommonNameSpan = styled.span`
  font-size: 1.1em;
  font-weight: 600;
`;

const TeamCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProjectTeamContainer = () => {
  const [course, setCourse] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [commonName, setCommonName] = useState('');
  const [toSelectUsers, setToSelectUsers] = useState([]);
  const [droppedContainers, setDroppedContainers] = useState([{ id: Date.now(), users: [] }]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await fetchAllCourse();
        setCourse(res.result);
      } catch (e) {
        console.error(e);
      }
    };
    getCourses();
  }, []);

  useEffect(() => {
    const getUsersByCourse = async () => {
      if (courseId === 0) return;

      try {
        const res = await fetchUsersByCourse(courseId);
        initUsers(res.result);
      } catch (e) {
        console.error(e);
      }
    };
    getUsersByCourse();
  }, [courseId]);

  const initUsers = (users) => {
    setToSelectUsers(users);
    setDroppedContainers([{ id: Date.now(), users: [] }]);
  };

  const selectCourse = (value) => {
    setCourseId(value);
  };

  const dropUser = (user, targetContainerId, sourceContainerId) => {
    if(targetContainerId === sourceContainerId) return;

    // CreateUserContainer에서 유저를 제거
    if (!sourceContainerId) {
      setToSelectUsers((prev) => prev.filter((u) => u.id !== user.id));
    } else if (!targetContainerId) {
      setToSelectUsers((prev) => [...prev, user]);
    }

    setDroppedContainers((prev) =>
      prev.map((container) => {
        if (container.id === targetContainerId) {
          return addUserToContainer(container, user);
        } else if (container.id === sourceContainerId) {
          return removeUserFromContainer(container, user);
        }
        return container;
      })
    );
  };

  const addUserToContainer = (container, user) => {
    const isUserInContainer = container.users.some((u) => u.id === user.id);
    if (!isUserInContainer) {
      const updatedUsers = sortUsers([...container.users, user]);
      return { ...container, users: updatedUsers };
    }
    return container;
  };

  const removeUserFromContainer = (container, user) => {
    const updatedUsers = sortUsers(container.users.filter((u) => u.id !== user.id));
    return { ...container, users: updatedUsers };
  };

  const sortUsers = (users) => {
    return users.sort((a, b) => {
      if (a.name.localeCompare(b.name) === 0) {
        return a.id - b.id; // 이름이 같으면 ID로 정렬
      }
      return a.name.localeCompare(b.name); // 이름으로 정렬
    });
  };

  const returnUser = (user, containerId) => {
    setDroppedContainers((prev) => 
      prev.map((container) => 
        container.id === containerId 
          ? { ...container, users: removeUserAndSort(container.users, user.id) }
          : container
      )
    );
    addToSelectUsers(user);
  };

  const removeUserAndSort = (users, userId) => {
    const updatedUsers = users.filter((u) => u.id !== userId);
    return sortUsers(updatedUsers);
  };

  const addToSelectUsers = (user) => {
    setToSelectUsers((prev) => {
      if (!prev.some((u) => u.id === user.id)) {
        return [...prev, user];
      }
      return prev;
    });
  };

  const addContainer = () => {
    setDroppedContainers((prev) => [...prev, { id: Date.now(), users: [] }]);
  };

  const removeContainer = (containerId) => {
    const containerToRemove = droppedContainers.find((container) => container.id === containerId);
    if (containerToRemove) {
      setToSelectUsers((prev) => [...prev, ...getUniqueUsers(containerToRemove.users, prev)]);
      setDroppedContainers((prev) => prev.filter((container) => container.id !== containerId));
    }
  };

  const getUniqueUsers = (users, existingUsers) => {
    return users.filter((user) => !existingUsers.some((existingUser) => existingUser.id === user.id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledContainer>
        <CourseSelection course={course} courseId={courseId} onChange={selectCourse} />
        {courseId > 0 && (
          <>
            <ProjectTeamName commonName={commonName} setCommonName={setCommonName} />
            <UserManagement
              toSelectUsers={toSelectUsers}
              dropUser={dropUser}
              addContainer={addContainer}
              droppedContainers={droppedContainers}
              returnUser={returnUser}
              removeContainer={removeContainer}
            />
          </>
        )}
      </StyledContainer>
    </DndProvider>
  );
};

const CourseSelection = ({ course, courseId, onChange }) => (
  <Row>
    <Col xs={6} md={6} xl={3}>
      <CommonNameSpan>코스 선택</CommonNameSpan>
    </Col>
    <Col xs={6} md={6} xl={3}>
      <CourseSelect course={course} courseId={courseId} onChange={onChange} />
    </Col>
  </Row>
);

const ProjectTeamName = ({ commonName, setCommonName }) => (
  <Row>
    <Col xs={6} md={6} xl={3}>
      <CommonNameSpan>프로젝트 팀명(공통)</CommonNameSpan>
    </Col>
    <Col xs={6} md={6} xl={3}>
      <CustomInput
        id="commonName"
        type="text"
        value={commonName}
        onChange={(e) => setCommonName(e.target.value)}
      />
    </Col>
  </Row>
);

const UserManagement = ({ toSelectUsers, dropUser, addContainer, droppedContainers, returnUser, removeContainer }) => (
  <>
    <Row>
      <CreateTeamCol xs={12} md={12} xl={12}>
        <span>수강생 리스트</span>
        <Button variant="success" onClick={addContainer}>
          팀 추가
        </Button>
      </CreateTeamCol>
      <CourseUserContainer data={toSelectUsers} dropUser={dropUser} />
    </Row>
    <Row>
      {droppedContainers.map((container, index) => (
        <TeamCol key={container.id} xs={12} md={6} xl={4}>
          <DroppedUsersContainer
            index={index+1}
            containerId={container.id}
            droppedUsers={container.users}
            dropUser={dropUser}
            returnUser={returnUser}
            removeContainer={() => removeContainer(container.id)}
          />
        </TeamCol>
      ))}
    </Row>
  </>
);

export default ProjectTeamContainer;
