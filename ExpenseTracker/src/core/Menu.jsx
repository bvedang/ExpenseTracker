import React, { useEffect, useContext } from 'react';
import { isAuthenticated, signOut } from '../auth/api-auth';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthContext from '../store/auth-context';
import Expenses from '../expense/Expenses';
import ExpenseOverview from '../expense/ExpenseOverview';

export default function Menu() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
        <NavLink to="/">
          <IconButton aria-label="Home" sx={{ color: '#fff' }}>
            <HomeIcon />
          </IconButton>
        </NavLink>

        <Button component={NavLink} to="/users" sx={{ color: '#fff' }}>
          Users
        </Button>
        {!authContext.isLoggedIn && (
          <span>
            <Button component={NavLink} to="/signup" sx={{ color: '#fff' }}>
              Sign up
            </Button>

            <Button component={NavLink} to="/signin" sx={{ color: '#fff' }}>
              Sign In
            </Button>
          </span>
        )}
        {authContext.isLoggedIn && (
          <span>
            <Button component={NavLink} to="/newExpense" sx={{ color: '#fff' }}>
              Add Expense
            </Button>
            <Button
              component={NavLink}
              to="/user/expenses"
              sx={{ color: '#fff' }}
            >
              Expenses
            </Button>
            <Button component={NavLink} to="/profile" sx={{ color: '#fff' }}>
              My Profile
            </Button>
            <Button component={NavLink} to="/user/expenseOverview" sx={{ color: '#fff' }}>
              ExpenseOverview
            </Button>
            <Button color="inherit" onClick={authContext.onLogOut}>
              Sign out
            </Button>

          </span>
        )}
      </Toolbar>
    </AppBar>
  );
}
