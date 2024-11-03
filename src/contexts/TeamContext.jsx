import React, { createContext, useState, useEffect } from 'react';
import { TEAM } from '../constants/belonging'

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teamId, setTeam] = useState();

  // 컴포넌트가 처음 렌더링될 때 사용자 정보를 가져오는 함수
  useEffect(() => {
    const storedTeam = sessionStorage.getItem(TEAM);
    if (storedTeam) {
      setTeam(storedTeam);
    }
  }, []);

  const setTeamId = (teamId) => {
    sessionStorage.setItem(TEAM, teamId);
    setTeam(teamId);
  };

  const exitTeamSpace = () => {
    sessionStorage.removeItem(TEAM);
    setTeam(null);
  };

  return (
    <TeamContext.Provider value={{ teamId, setTeamId, exitTeamSpace }}>
      {children}
    </TeamContext.Provider>
  );
};
