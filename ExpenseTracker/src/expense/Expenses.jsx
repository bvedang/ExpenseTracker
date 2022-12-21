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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material/';
import { ExpandMore } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import { makeStyles } from '@mui/styles';
import DeleteExpense from './DeleteExpense';
import { updateUserExpense } from './expenseManager';
import { format } from 'date-fns';

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
    marginTop: 12,
    margin: 6,
  },
  info: {
    marginRight: 32,
    width: 90,
  },
  amount: {
    fontSize: '2em',
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
  const categories = [
    'Entertainment',
    'Food & Drink',
    'Home',
    'Life',
    'Transportation',
    'Uncategorized',
    'Utilities',
  ];
  const userCtx = useContext(AuthContext);
  const token = localStorage.getItem('jwt');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const classes = useStyles();
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth(),
    d = date.getDate();
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  const [lastDay, setLastDay] = useState(new Date(y, m, d));

  useEffect(() => {
    const formatedFirstDay = format(firstDay, 'dd-MM-yyyy');
    const formatedLastDay = format(lastDay, 'dd-MM-yyyy');
    userCtx.getuserExpenses(token, formatedFirstDay, formatedLastDay);
  }, [firstDay, lastDay]);

  const searchClicked = () => {
    const formatedFirstDay = format(firstDay, 'dd-MM-yyyy');
    const formatedLastDay = format(lastDay, 'dd-MM-yyyy');
    userCtx.getuserExpenses(token, formatedFirstDay, formatedLastDay);
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
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            label="SHOWING RECORDS FROM"
            inputFormat="dd/MM/yyyy"
            views={['year', 'month', 'day']}
            value={firstDay}
            onChange={(newDate) => {
              setFirstDay(newDate);
            }}
            renderInput={(params) => (
              <TextField {...params} className={classes.textField} />
            )}
          />
          <DatePicker
            disableFuture
            label="TO"
            inputFormat="dd/MM/yyyy"
            views={['year', 'month', 'day']}
            value={lastDay}
            onChange={(newDate) => {
              setLastDay(newDate);
            }}
            renderInput={(params) => (
              <TextField {...params} className={classes.textField} />
            )}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          color="secondary"
          sx={{ color: 'white' }}
          onClick={searchClicked}
        >
          GO
        </Button>
      </div>

      {userCtx.userExpenses.map((expense, index) => {
        return (
          <span key={index}>
            <Accordion className={classes.panel}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <div className={classes.info}>
                  <Typography color="primary" className={classes.amount}>
                    $ {expense.amount}
                  </Typography>
                  <Divider style={{ marginTop: 4, marginBottom: 4 }} />
                  <Typography>{expense.category}</Typography>
                  <Typography className={classes.date}>
                    {new Date(expense.incurred_on).toDateString()}
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
                    <DatePicker
                      label="Incurred on"
                      showTodayButton
                      views={['year', 'month', 'day']}
                      value={expense.incurred_on}
                      onChange={(newDate) => {
                        const updatedExpenses = [...userCtx.userExpenses];
                        updatedExpenses[index].incurred_on = format(
                          new Date(newDate),
                          'yyyy/MM/dd'
                        );
                        userCtx.setUserExpenses(updatedExpenses);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} className={classes.textField} />
                      )}
                    />
                  </LocalizationProvider>
                  <FormControl>
                    <InputLabel id="category-Label">Category</InputLabel>
                    <Select
                      className={classes.textField}
                      labelId="category-Label"
                      id="category-select"
                      value={expense.category}
                      label="Category"
                      onChange={userCtx.updateUserExpenseData(
                        'category',
                        index
                      )}
                    >
                      {categories.map((category, index) => {
                        return (
                          <MenuItem value={category} key={index}>
                            {category}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
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
                  <DeleteExpense
                    expense={expense}
                    onRemove={userCtx.deletuserExpenses}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </span>
        );
      })}
    </div>
  );
}
