import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../auth/api-auth';
import { getCurrentUser } from '../user/userApi';
import { getUserExpenses } from '../expense/expenseManager';
import AuthContext from './auth-context';

export default function AuthContextProvider(props) {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth()
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
  const [userExpenses, setUserExpenses] = useState([]);
  // Handles user login date and any error assocaiated with it.
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

  // Handle expense operation (CRUD)
  const getUserExpensesHandler = (token, firstDate, lastDate) => {
    getUserExpenses(token, firstDate, lastDate).then((resp) => {
      setUserExpenses(resp.data);
    });
  };

  const handleupdateuserExpenseData = (name, index) => (event) => {
    const updatedExpenses = [...userExpenses];
    if (name === 'amount') {
      updatedExpenses[index][name] = +event.target.value;
      setUserExpenses(updatedExpenses);
    }
    updatedExpenses[index][name] = event.target.value;
    setUserExpenses(updatedExpenses);
  };

  const handleupdateuserExpenseDate = (index) => (date) => {
    const updatedExpenses = [...userExpenses];
    updatedExpenses[index].incurred_on = date;
    setUserExpenses(updatedExpenses);
  };

  const handleDeleteExpenseData = (expense) => {
    const updatedExpenses = [...userExpenses];
    const index = updatedExpenses.indexOf(expense);
    updatedExpenses.splice(index, 1);
    setUserExpenses(updatedExpenses);
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
        userExpenses: userExpenses,
        getuserExpenses: getUserExpensesHandler,
        updateuserExpenseDate: handleupdateuserExpenseDate,
        updateUserExpenseData: handleupdateuserExpenseData,
        deletuserExpenses: handleDeleteExpenseData
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
