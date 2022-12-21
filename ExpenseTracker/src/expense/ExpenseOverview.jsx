import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title2: {
    padding: `32px ${theme.spacing(2.5)}px 2px`,
  },
  totalSpent: {
    padding: '50px 40px',
    fontSize: '4em',
    margin: 20,
    marginBottom: 30,
    backgroundColor: '#3f50b5',
    color: 'white',
    textAlign: 'center',
    borderRadius: '50%',
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
    border: '4px solid #ff7961',
    borderRadius: '0.5em',
  },
  day: {
    fontSize: '0.9em',
    fontStyle: 'italic',
    color: '#696969',
  },

  seemoreLink: {
    color: '#ba000d',
    textDecoration: 'none',
    fontStyle: 'italic',
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

  useEffect(() => {
    userCtx.getMonthlyCategoryPreview(token);
  }, []);
  const indicateExpense = (values) => {
    let color = '#4f83cc';
    if (values.total) {
      const diff = values.total - values.average;
      if (diff > 0) {
        color = '#e9858b';
      }
      if (diff < 0) {
        color = '#2bbd7e';
      }
    }
    return color;
  };
  return (
    <Card className={classes.card}>
      <Typography
        variant="h4"
        color="primary"
        className={classes.title2}
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
          <Link className={classes.seemoreLink} to="/user/expenses">
            <Typography variant="h6">See more</Typography>
          </Link>
        </div>
      </div>
      <Divider />
      <div className={classes.categorySection}>
        {userCtx.currenMonthCategoyExpense.map((expense, index) => {
          return (
            <div
              key={index}
              style={{ display: 'grid', justifyContent: 'center' }}
            >
              <Typography variant="h5" className={classes.catTitle}>
                {expense.category}
              </Typography>
              <Divider
                className={classes.catDiv}
                style={{
                  backgroundColor: indicateExpense(expense.category),
                }}
              />
              <div>
                <Typography
                  component="span"
                  className={`${classes.catHeading} ${classes.val}`}
                >
                  past average
                </Typography>
                <Typography
                  component="span"
                  className={`${classes.catHeading} ${classes.val}`}
                >
                  this month
                </Typography>
                <Typography
                  component="span"
                  className={`${classes.catHeading} ${classes.val}`}
                >
                  {expense.total && expense.total - expense.avg > 0
                    ? 'spent extra'
                    : 'saved'}
                </Typography>
              </div>
              <div style={{ marginBottom: 3 }}>
                <Typography
                  component="span"
                  className={classes.val}
                  style={{ color: '#595555', fontSize: '1.15em' }}
                >
                  ${expense.avg}
                </Typography>
                <Typography
                  component="span"
                  className={classes.val}
                  style={{
                    color: '#002f6c',
                    fontSize: '1.6em',
                    backgroundColor: '#ffbaad',
                    padding: '8px 0',
                  }}
                >
                  ${expense.total ? expense.total : 0}
                </Typography>
                <Typography
                  component="span"
                  className={classes.val}
                  style={{ color: '#484646', fontSize: '1.25em' }}
                >
                  $
                  {expense.total
                    ? Math.abs(expense.total - expense.avg)
                    : expense.avg}
                </Typography>
              </div>
              <Divider style={{ marginBottom: 10 }} />
            </div>
          );
        })}{' '}
      </div>
    </Card>
  );
}

export default ExpenseOverview;
