import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UID"));
    if (user) {
      const token = user?.token;
      const decodedData = jwtDecode(token);
      const userDetail = decodedData.sub;
      setCurrentId(userDetail);
      setCurrentToken(token);
    } else {
      setCurrentId(null);
      setCurrentToken(null);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ currentId, setCurrentId, currentToken, setCurrentToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
