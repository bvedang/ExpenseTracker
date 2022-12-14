import React from 'react';

const AuthContext = React.createContext({
  user: {},
  userExpenses: [],
  isLoggedIn: false,
  onLogin: (userCred) => {},
  onLogOut: () => {},
  authError: false,
  onAuthError: () => {},
  resetAuthError: () => {},
  getUserProfile: (token) => {},
  getuserExpenses: (token, firstDate, lastDate) => {},
  updateuserExpenseDate: (index) => (date) => {},
  updateUserExpenseData: (name, index) => (event) => {},
  deletuserExpenses: (expense) => {},
});

export default AuthContext;
