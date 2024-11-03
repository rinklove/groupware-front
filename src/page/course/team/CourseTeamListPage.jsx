import React, { useEffect, useState } from 'react';
import TeamList from '../../../components/team/TeamList';
import { Tab, Tabs } from 'react-bootstrap';
import { useTeamApi } from '../../../components/hook/UseTeamApi';
import CustomButton from '../../../components/common/CustomButton';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StudyTeamCreateForm from '../../../components/team/StudyTeamCreateForm';
import { useCourse } from '../../../components/hook/UseCourse';

const ContentWrapper = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 4em;
`;

const CourseTeamListPage = ({ isAdmin }) => {
  const [totalTeams, setTotalTeams] = useState([]); // 모든 팀
  const [myTeams, setMyTeams] = useState([]); // 내가 속한 팀
  const [activeTab, setActiveTab] = useState('total');
  const { courseId } = useCourse();
  const { getMyTeamInfo, getAllTeamByCourse } = useTeamApi();
  const navigate = useNavigate();

  const fetchAllTeams = async () => {
    try {
      const allTeams = await getAllTeamByCourse(courseId);
      setTotalTeams(allTeams);
    } catch (error) {
      console.error("모든 팀을 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const fetchMyTeams = async () => {
    try {
      const userTeams = await getMyTeamInfo();
      setMyTeams(userTeams);
    } catch (error) {
      console.error("내 팀을 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 모든 팀과 내 팀을 가져오는 함수
  useEffect(() => {
    if (courseId) { // courseId가 있을 때만 팀 데이터를 가져옵니다.
      fetchAllTeams(); // 모든 팀 가져오기
      if(!isAdmin) {
        fetchMyTeams();  // 내가 속한 팀 가져오기
      }
    }
  }, [courseId]); // courseId가 변경될 때마다 호출

  return (
    <ContentWrapper>
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="total" title="모든 팀">
          <TeamList teams={totalTeams} /> {/* 모든 팀 데이터 전달 */}
        </Tab>
        {
          !isAdmin && 
          <Tab eventKey="my" title="내가 속한 팀">
            <TeamList teams={myTeams} /> {/* 내가 속한 팀 데이터 전달 */}
          </Tab>
        }
        {
          !isAdmin && 
          <Tab eventKey="create" title="스터디 팀 생성하기">
            <StudyTeamCreateForm
              onTeamCreated={() => {
                fetchAllTeams();
                fetchMyTeams();
              }}
            />
          </Tab>
      }
      </Tabs>
    </ContentWrapper>
  );
};

export default CourseTeamListPage;
