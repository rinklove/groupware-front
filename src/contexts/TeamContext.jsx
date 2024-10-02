import React, { createContext, useState, useEffect } from 'react';
import { TEAM } from '../constants/belonging'

export const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(null);

  // 컴포넌트가 처음 렌더링될 때 사용자 정보를 가져오는 함수
  useEffect(() => {
    const storedTeam = localStorage.getItem(TEAM);
    setTeam(storedTeam);
  }, []);

  const enterTeamSpace = (teamId) => {
    localStorage.setItem(TEAM, teamId);
    setTeam(teamId);
  };

  const exitTeamSpace = () => {
    localStorage.removeItem(TEAM);
    setTeam(null);
  };

  return (
    <TeamContext.Provider value={{ team, enterTeamSpace, exitTeamSpace }}>
      {children}
    </TeamContext.Provider>
  );
};
