import { Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import Home from './core/Home';
import Users from './user/Users';
import Signup from './user/Signup';
import Signin from './auth/Signin';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import Menu from './core/Menu';
import AuthContext from './store/auth-context';
import PageNotFound from './auth/PageNotFound';
import NewExpense from './expense/NewExpense';
import Expenses from './expense/Expenses';
import ExpenseOverview from './expense/ExpenseOverview';

export default function MainRouter() {
  const authContext = useContext(AuthContext);
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/expenseOverview" element={<ExpenseOverview />} />
        {authContext.isLoggedIn ? (
          <Route path="/newExpense" element={<NewExpense />} />
        ) : (
          <Route path="/newExpense" element={<PageNotFound />} />
        )}

        {authContext.isLoggedIn ? (
          <Route path="/users" element={<Users />} />
        ) : (
          <Route path="/users" element={<PageNotFound />} />
        )}
        {authContext.isLoggedIn ? (
          <Route path="/user/expenses" element={<Expenses />} />
        ) : (
          <Route path="/user/expenses" element={<PageNotFound />} />
        )}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {authContext.isLoggedIn ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/profile" element={<PageNotFound />} />
        )}
        {authContext.isLoggedIn ? (
          <Route path="/user/edit/:userId" element={<EditProfile />} />
        ) : (
          <Route path="/user/edit/:userId" element={<PageNotFound />} />
        )}
      </Routes>
    </div>
  );
}
