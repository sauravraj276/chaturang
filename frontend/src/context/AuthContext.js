import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../connection/api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkTokenAndFetchUserInfo = async () => {
      try {
        // Check if a token is set (
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
          // Fetch user information using the token
          const userInfo = await getUserInfo(token);
          // Set the user state
          setUser(userInfo);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        navigate('/');
      }
    };
    
    checkTokenAndFetchUserInfo();
  },[]);


  const getUserInfo = async (token) => {
    try {
      //to get the user info
      const response = await userApi.get('', {
        headers: {
          'x-auth-token': token,
        },
      });
      // Assuming the user information is in the response.data field
      console.log(response.data.data.user);
      return response.data;
    } catch (error) {
      // Handle errors, log or rethrow as needed
      console.error('Error fetching user info:', error);
      throw error; // You might want to handle errors more gracefully in a real application
    }
  };

  const logout = () => {
    try {
      // Clear user data
      setUser(null);
      // Delete the locally stored token
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle errors as needed
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
