"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
 
  const [activeUser, setActiveUser] = useState("user2"); 

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
