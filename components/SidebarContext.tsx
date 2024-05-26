import React, { createContext, useContext, useState } from 'react';

const SideBarContext = createContext({ expanded: true, setExpanded: () => {} });

export const SideBarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <SideBarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBarContext = () => useContext(SideBarContext);
