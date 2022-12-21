import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

export default function Menu() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar>
        {authContext.isLoggedIn ? (
          <Button
            aria-label="Home"
            sx={{ color: '#fff' }}
            onClick={() => {
              navigate('/user/expenseOverview');
            }}
          >
            <Typography variant="h6" color="inherit">
              Expense Manager
            </Typography>
          </Button>
        ) : (
          <Button
            aria-label="Home"
            sx={{ color: '#fff' }}
            onClick={() => {
              navigate('/');
            }}
          >
            <Typography variant="h6" color="inherit">
              Expense Manager
            </Typography>
          </Button>
        )}

        {!authContext.isLoggedIn && (
          <span>
            <Button
              sx={{ my: 2, color: 'white' }}
              onClick={() => {
                navigate('/signup');
              }}
            >
              Sign up
            </Button>

            <Button
              sx={{ color: '#fff' }}
              onClick={() => {
                navigate('/signin');
              }}
            >
              Sign In
            </Button>
          </span>
        )}
        {authContext.isLoggedIn && (
          <span>
            <Button
              onClick={() => {
                navigate('/newExpense');
              }}
              sx={{ color: '#fff' }}
            >
              Add Expense
            </Button>
            <Button
              onClick={() => {
                navigate('/user/expenses');
              }}
              sx={{ color: '#fff' }}
            >
              Expenses
            </Button>
            <Button
              onClick={() => {
                navigate('/profile');
              }}
              sx={{ color: '#fff' }}
            >
              My Profile
            </Button>
            <Button
              onClick={() => {
                navigate('/user/expenseOverview');
              }}
              sx={{ color: '#fff' }}
            >
              ExpenseOverview
            </Button>
            <Button
              onClick={() => {
                navigate('/user/expenses/report');
              }}
              sx={{ color: '#fff' }}
            >
              Reports
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
