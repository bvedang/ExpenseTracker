import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../auth/api-auth';
import { getCurrentUser } from '../user/userApi';
import AuthContext from './auth-context';

export default function AuthContextProvider(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    created: '',
    updated: '',
    publicId: '',
    id: '',
  });
  const [authError, setAuthError] = useState(false);
  const loginHandler = (userCred) => {
    signin(userCred).then((resp) => {
      if (resp.status === 200) {
        const data = resp.data;
        localStorage.setItem('jwt', 'Bearer ' + data.token);
        setIsLoggedIn(true);
        setAuthError(false);
        return true;
      } else if (resp.status === 500) {
        setAuthError(true);
        setIsLoggedIn(false);
        return false;
      }
    });
  };
  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleAuthError = () => {
    setAuthError(true);
  };

  const handleresetAuthError = () => {
    setAuthError(false);
  };

  const getUserProfileHandler = (token) => {
    getCurrentUser(token).then((resp) => {
      setUser(resp.data);
    });
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogOut: logoutHandler,
        authError: authError,
        onAuthError: handleAuthError,
        resetAuthError: handleresetAuthError,
        user: user,
        getUserProfile: getUserProfileHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
