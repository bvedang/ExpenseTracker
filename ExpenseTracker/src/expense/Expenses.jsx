import React, { useState, useContext, useEffect } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  Divider,
  Typography,
  TextField,
  Button,
  Icon,
  AccordionDetails,
} from '@mui/material/';
import { ExpandMore } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import { makeStyles } from '@mui/styles';
import DeleteExpense from './DeleteExpense';
import { updateUserExpense } from './expenseManager';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    maxWidth: '800px',
    margin: 'auto',
    marginTop: 40,
    marginBottom: 40,
  },
  heading: {
    fontSize: '1.5em',
    fontWeight: theme.typography.fontWeightRegular,

    marginTop: 12,
    marginBottom: 4,
  },
  error: {
    verticalAlign: 'middle',
  },
  notes: {
    color: 'grey',
  },
  panel: {
    border: '1px solid #58bd7f',
    margin: 6,
  },
  info: {
    marginRight: 32,
    width: 90,
  },
  amount: {
    fontSize: '1.6em',
    color: '#2bbd7e',
  },
  search: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textField: {
    margin: '8px 16px',
    width: 240,
  },
  buttons: {
    textAlign: 'right',
  },
  status: {
    marginRight: 8,
  },
  date: {
    fontSize: '1.1em',
    color: '#8b8b8b',
    marginTop: 4,
  },
}));

export default function Expenses() {
  const userCtx = useContext(AuthContext);
  const token = localStorage.getItem('jwt');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const classes = useStyles();
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0));

  useEffect(() => {
    userCtx.getuserExpenses(token, firstDay, lastDay);
  }, []);
  console.log(userCtx.userExpenses);
  const handleSearchFieldChange = (name) => (date) => {
    if (name == 'firstDay') {
      setFirstDay(date);
    } else {
      setLastDay(date);
    }
  };
  const searchClicked = () => {
    userCtx.getuserExpenses(token, firstDay, lastDay);
  };
  const clickUpdate = (index) => {
    let expense = userCtx.userExpenses[index];
    console.log(expense);
    updateUserExpense(userCtx.user.id, token, expense).then((resp) => {
      setSaved(true);
      console.log(resp.data);
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    });
  };
  const removeExpense = (expense) => {
    const updatedExpenses = [...expenses];
    const index = updatedExpenses.indexOf(expense);
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            disableFuture
            label="SHOWING RECORDS FROM"
            inputFormat="dd/MM/yyyy"
            views={['year', 'month', 'day']}
            value={firstDay}
            onChange={handleSearchFieldChange('firstDay')}
            renderInput={(params) => (
              <TextField {...params} className={classes.textField} />
            )}
          />
          <DateTimePicker
            disableFuture
            label="TO"
            inputFormat="dd/MM/yyyy"
            views={['year', 'month', 'day']}
            value={lastDay}
            onChange={handleSearchFieldChange('lastDay')}
            renderInput={(params) => (
              <TextField {...params} className={classes.textField} />
            )}
          />
        </LocalizationProvider>
        <Button variant="contained" color="secondary" onClick={searchClicked}>
          GO
        </Button>
      </div>

      {userCtx.userExpenses.map((expense, index) => {
        return (
          <span key={index}>
            <Accordion className={classes.panel}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <div className={classes.info}>
                  <Typography className={classes.amount}>
                    $ {expense.amount}
                  </Typography>
                  <Divider style={{ marginTop: 4, marginBottom: 4 }} />
                  <Typography>{expense.category}</Typography>
                  <Typography className={classes.date}>
                    {new Date(expense.incurred_on).toLocaleDateString()}
                  </Typography>
                </div>
                <div>
                  <Typography className={classes.heading}>
                    {expense.title}
                  </Typography>
                  <Typography className={classes.notes}>
                    {expense.notes}
                  </Typography>
                </div>
              </AccordionSummary>
              <Divider />
              <AccordionDetails style={{ display: 'block' }}>
                <div>
                  <TextField
                    label="Title"
                    className={classes.textField}
                    value={expense.title}
                    onChange={userCtx.updateUserExpenseData('title', index)}
                    margin="normal"
                  />
                  <TextField
                    label="Amount ($)"
                    className={classes.textField}
                    value={expense.amount}
                    onChange={userCtx.updateUserExpenseData('amount', index)}
                    margin="normal"
                    type="number"
                  />
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Incurred on"
                      showTodayButton
                      views={['year', 'month', 'day']}
                      value={expense.incurred_on}
                      onChange={userCtx.updateuserExpenseDate(index)}
                      renderInput={(params) => (
                        <TextField {...params} className={classes.textField} />
                      )}
                    />
                  </LocalizationProvider>
                  <TextField
                    label="Category"
                    className={classes.textField}
                    value={expense.category}
                    onChange={userCtx.updateUserExpenseData('category', index)}
                    margin="normal"
                  />
                </div>
                <TextField
                  label="Notes"
                  multiline
                  rows="2"
                  value={expense.notes}
                  onChange={userCtx.updateUserExpenseData('notes', index)}
                  className={classes.textField}
                  margin="normal"
                />
                <div className={classes.buttons}>
                  {error && (
                    <Typography component="p" color="error">
                      <Icon color="error" className={classes.error}>
                        error
                      </Icon>
                      {error}
                    </Typography>
                  )}
                  {saved && (
                    <Typography
                      component="span"
                      color="secondary"
                      className={classes.status}
                    >
                      Saved
                    </Typography>
                  )}
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => clickUpdate(index)}
                    className={classes.submit}
                  >
                    Update
                  </Button>
                  <DeleteExpense expense={expense} onRemove={userCtx.deletuserExpenses} />
                </div>
              </AccordionDetails>
            </Accordion>
          </span>
        );
      })}
    </div>
  );
}
