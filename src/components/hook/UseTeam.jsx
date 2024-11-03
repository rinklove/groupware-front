import React, { useContext } from 'react'
import { TeamContext } from '../../contexts/TeamContext';

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useCourse must be used within a TeamProvider");
  }
  return context;
}

