import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const userToken = JSON.parse(localStorage.getItem("UID"));
    if (!userToken) return false;
    return true;
  });
  const [loading, setLoading] = useState(false);

  // Signup function
  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8180/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.msg);
      }
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8180/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.msg);
      }

      localStorage.setItem("UID", JSON.stringify(data.loginStatus)); // Set user token in local storage
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // setCurrentUser(null);
    localStorage.removeItem("userToken"); // Remove user token from local storage
    setIsAuthenticated(false);
  };

  // Context value
  const value = {
    isAuthenticated,
    signup,
    login,
    logout,
    loading, // Include loading state in the context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
