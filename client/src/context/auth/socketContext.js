import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { UserContext } from "./userProvider";
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { currentId } = React.useContext(UserContext);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    try {
      if (currentId !== null) {
        const socket = io("https://findermentor.onrender.com", {
          query: {
            userId: currentId,
          },
        });
        setSocket(socket);
        // Cleanup function to disconnect the socket when the component unmounts
        return () => {
          socket.disconnect();
          setSocket(null);
        };
      } else {
        // Disconnect the socket if currentId is null
        if (socket) {
          socket.disconnect();
          setSocket(null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentId]); // Add currentId to the dependency array

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
