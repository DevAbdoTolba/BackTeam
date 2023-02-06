import React, { useState, useEffect, createContext } from "react";

const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("admin="));
    if (cookie) {
      return cookie.split("=")[1] === "true";
    }
    document.cookie = "admin=false";
    return false;
  });

  useEffect(() => {
    document.cookie = `admin=${admin}`;
  }, [admin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
