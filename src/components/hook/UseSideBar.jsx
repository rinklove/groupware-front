import React, { useContext, useState } from 'react'
import { SidebarContext } from '../../contexts/SidebarContext';

const useSideBar = () => {

  const context = useContext(SidebarContext);
  return context
}

export default useSideBar
