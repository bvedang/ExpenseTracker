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
  updateuserExpenseDate: (newDate, index) => (date) => {},
  updateUserExpenseData: (name, index) => (event) => {},
  deletuserExpenses: (expense) => {},
  currentMonthExpense: 0,
  todaysExpense: 0,
  yesterdaysExpense: 0,
  getmonthlyPreview: (token) => {},
  setUserExpenses: (userExpenses) => {},
  currenMonthCategoyExpense: [],
  getMonthlyCategoryPreview: (token) => {},
});

export default AuthContext;
