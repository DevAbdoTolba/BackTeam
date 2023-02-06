import React, { useState, useEffect, createContext } from "react";

const LogStateContext = createContext();

const LogStateContextProvider = ({ children }) => {
  const [logState, setLogState] = useState(() => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("logState="));
    if (cookie) {
      return cookie.split("=")[1] === "true";
    }
    document.cookie = "logState=false";
    return false;
  });

  useEffect(() => {
    document.cookie = `logState=${logState}`;
  }, [logState]);

  return (
    <LogStateContext.Provider value={{ logState, setLogState }}>
      {children}
    </LogStateContext.Provider>
  );
};

export { LogStateContext, LogStateContextProvider };
