import React from 'react';

const AuthContext = React.createContext({
  user: {},
  isLoggedIn: false,
  onLogin: (userCred) => {},
  onLogOut: () => {},
  authError: false,
  onAuthError: () => {},
  resetAuthError: () => {},
  getUserProfile: (token) => {},
});

export default AuthContext;
