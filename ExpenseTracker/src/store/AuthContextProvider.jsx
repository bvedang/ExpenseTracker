import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../auth/api-auth';
import { getCurrentUser } from '../user/userApi';
import {
  getUserExpenses,
  currentMonthPreview,
  currentMonthCategoryExpensePreview,
} from '../expense/expenseManager';
import AuthContext from './auth-context';
import { format } from 'date-fns';

export default function AuthContextProvider(props) {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem('jwt')) {
      return true;
    }
    return false;
  });
  const [user, setUser] = useState({
    name: '',
    email: '',
    created: '',
    updated: '',
    publicId: '',
    id: '',
  });
  const [currentMonthCategoryExpense, setcurrentMonthCategoryExpense] =
    useState([]);
  const [authError, setAuthError] = useState(false);
  const [userExpenses, setUserExpenses] = useState([]);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [todaysExpense, setTodaysExpense] = useState(0);
  const [yesterdaysExpense, setYesterdaysExpense] = useState(0);
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

  const handleupdateuserExpenseDate = (newDate, index) => {
    console.log(newDate);
    const updatedExpenses = [...userExpenses];
    updatedExpenses[index].incurred_on = format(
      new Date(newDate),
      'dd-MM-yyyy'
    );
    setUserExpenses(updatedExpenses);
  };

  const handleDeleteExpenseData = (expense) => {
    const updatedExpenses = [...userExpenses];
    const index = updatedExpenses.indexOf(expense);
    updatedExpenses.splice(index, 1);
    setUserExpenses(updatedExpenses);
  };

  const handleMonthlyPreview = (token) => {
    currentMonthPreview(token).then((resp) => {
      const data = resp.data;
      setCurrentMonthExpense(parseFloat(data.monthlyExpenses).toFixed(1));
      setTodaysExpense(parseFloat(data.currentDayExpense).toFixed(1));
      setYesterdaysExpense(parseFloat(data.yesterDayExpense).toFixed(1));
    });
  };

  const handleMonthlyCategoryExpense = (token) => {
    currentMonthCategoryExpensePreview(token).then((resp) => {
      const data = resp.data;
      // console.log(data)
      setcurrentMonthCategoryExpense(data.currMonthExpense);
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
        userExpenses: userExpenses,
        getuserExpenses: getUserExpensesHandler,
        updateuserExpenseDate: handleupdateuserExpenseDate,
        updateUserExpenseData: handleupdateuserExpenseData,
        deletuserExpenses: handleDeleteExpenseData,
        currentMonthExpense: currentMonthExpense,
        todaysExpense: todaysExpense,
        yesterdaysExpense: yesterdaysExpense,
        getmonthlyPreview: handleMonthlyPreview,
        setUserExpenses: setUserExpenses,
        currenMonthCategoyExpense: currentMonthCategoryExpense,
        getMonthlyCategoryPreview: handleMonthlyCategoryExpense,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
