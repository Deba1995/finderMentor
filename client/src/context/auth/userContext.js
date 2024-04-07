import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const UserDetailContext = createContext();

// Custom hook to use the AuthContext
export const UserDetail = () => {
  return useContext(UserDetailContext);
};

// AuthProvider component
export const DetailProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [suggestionData, setSuggestionData] = useState(null);
  const [conversations, setConversations] = useState([]);

  // Signup function
  const setDetails = async (userData, id, token) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://findermentor.onrender.com/api/v1/user/profile/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
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

  const fetchDetails = async (id, token) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://findermentor.onrender.com/api/v1/user/profile/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.msg);
      }
      setUserData(data);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (id, token) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://findermentor.onrender.com/api/v1/user/suggestions/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.msg);
      }
      setSuggestionData(data);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (id1, id2, token, messageBody) => {
    setLoading(true);
    try {
      console.log(id1, id2);
      const response = await fetch(
        `https://findermentor.onrender.com/api/v1/user/messages/send/${id1}/${id2}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(messageBody),
        }
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.msg);
      }
      setConversations(data);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (id1, id2, token) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://findermentor.onrender.com/api/v1/user/messages/${id1}/${id2}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.msg);
      }
      setConversations(data);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sendFeedBack = async (id, token, feedBack) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://findermentor.onrender.com/api/v1/user/feedback/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(feedBack),
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

  // Context value
  const value = {
    userData,
    setDetails,
    fetchDetails,
    fetchSuggestions,
    sendMessage,
    fetchMessages,
    sendFeedBack,
    setConversations,
    conversations,
    suggestionData,
    loading,
  };

  return (
    <UserDetailContext.Provider value={value}>
      {children}
    </UserDetailContext.Provider>
  );
};
