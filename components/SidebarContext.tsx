import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the type for the context value
interface SideBarContextType {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

// Initialize the context with a default value
const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

// Define the props type for the provider
interface SideBarProviderProps {
  children: ReactNode;
}

// Create the provider component
export const SideBarProvider: React.FC<SideBarProviderProps> = ({ children }) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <SideBarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SideBarContext.Provider>
  );
};

// Custom hook to use the SideBarContext
export const useSideBarContext = (): SideBarContextType => {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error('useSideBarContext must be used within a SideBarProvider');
  }
  return context;
};
