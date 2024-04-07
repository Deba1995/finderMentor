import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";
import Navbar from "../components/Navbar";
import { UserProvider } from "../context/auth/userProvider";
import { SidebarProvider } from "../context/auth/sidebarContext";
import { DetailProvider } from "../context/auth/userContext";
import { DialogProvider } from "../context/auth/dialogContext";
import { SocketProvider } from "../context/auth/socketContext";
function PrivateRoutes({ element, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <UserProvider>
          <SidebarProvider>
            <DialogProvider>
              <SocketProvider>
                <DetailProvider>
                  <Navbar />
                  <Outlet />
                </DetailProvider>
              </SocketProvider>
            </DialogProvider>
          </SidebarProvider>
        </UserProvider>
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  );
}

export default PrivateRoutes;
