import { createContext, useContext, useState } from "react";


const ActiveMapContext = createContext();

export const ActiveMapProvider = ({ children }) => {
  const [activeMap, setActiveMap] = useState("DEFAULT");

  return (
    <ActiveMapContext.Provider value={{ activeMap, setActiveMap }}>
      {children}  
    </ActiveMapContext.Provider>
  )
}

export const useActiveMap = () => useContext(ActiveMapContext);