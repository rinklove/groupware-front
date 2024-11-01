import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false)

  return (
    <SidebarContext.Provider value={{ showSidebar, toggleSidebar, closeSidebar}}>
      {children}
    </SidebarContext.Provider>
  );
};
