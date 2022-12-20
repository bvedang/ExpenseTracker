import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, Typography, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import Expenses from './Expenses';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title2: {
    padding: `32px ${theme.spacing(2.5)}px 2px`,
    color: '#2bbd7e',
  },
  totalSpent: {
    padding: '50px 40px',
    fontSize: '4em',
    margin: 20,
    marginBottom: 30,
    backgroundColor: '#01579b',
    color: '#70f0ae',
    textAlign: 'center',
    borderRadius: '50%',
    border: '10px double #70f0ae',
    fontWeight: 300,
  },
  categorySection: {
    padding: 25,
    paddingTop: 16,
    margin: 'auto',
  },
  catDiv: {
    height: '4px',
    margin: '0',
    marginBottom: 8,
  },
  val: {
    width: 200,
    display: 'inline-table',
    textAlign: 'center',
    margin: 2,
  },
  catTitle: {
    display: 'inline-block',
    padding: 10,
    backgroundColor: '#f4f6f9',
  },
  catHeading: {
    color: '#6b6b6b',
    fontSize: '1.15em',
    backgroundColor: '#f7f7f7',
    padding: '4px 0',
  },
  spent: {
    margin: '16px 10px 10px 0',
    padding: '10px 30px',
    border: '4px solid #58bd7f38',
    borderRadius: '0.5em',
  },
  day: {
    fontSize: '0.9em',
    fontStyle: 'italic',
    color: '#696969',
  },
}));

function ExpenseOverview() {
  const classes = useStyles();
  const token = localStorage.getItem('jwt');
  const userCtx = useContext(AuthContext);
  useEffect(() => {
    userCtx.getmonthlyPreview(token);
  }, [
    userCtx.currentMonthExpense,
    userCtx.todaysExpense,
    userCtx.yesterdaysExpense,
  ]);
  return (
    <Card className={classes.card}>
      <Typography
        variant="h4"
        className={classes.title2}
        color="textPrimary"
        style={{ textAlign: 'center' }}
      >
        You've spent
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component="span" className={classes.totalSpent}>
          ${userCtx.currentMonthExpense ? userCtx.currentMonthExpense : '0'}{' '}
          <span style={{ display: 'block', fontSize: '0.3em' }}>
            so far this month
          </span>
        </Typography>
        <div style={{ margin: '20px 20px 20px 30px' }}>
          <Typography variant="h5" className={classes.spent} color="primary">
            ${userCtx.todaysExpense ? userCtx.todaysExpense : '0'}{' '}
            <span className={classes.day}>today</span>
          </Typography>
          <Typography variant="h5" className={classes.spent} color="primary">
            ${userCtx.yesterdaysExpense ? userCtx.yesterdaysExpense : '0'}{' '}
            <span className={classes.day}>yesterday </span>
          </Typography>
          {/* <Link to="/expenses/all">
            <Typography variant="h6">See more</Typography>
          </Link> */}
        </div>
      </div>
      <Divider />
      <div className={classes.categorySection}> </div>
    </Card>
  );
}

export default ExpenseOverview;
