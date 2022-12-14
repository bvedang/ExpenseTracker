import { useState, useContext } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
  autocompleteClasses,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AuthContext from '../store/auth-context';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import { newExpense } from './expenseManager';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: '1em',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  filename: {
    marginLeft: '10px',
  },
  action: {
    marginLeft: 100,
    marginRight: 100,
    justifyContent: 'space-between',
    x: theme.spacing(),
  },
}));

export default function NewExpense() {
  const classes = useStyles();
  const navigate = useNavigate()
  const userContext = useContext(AuthContext);
  const [values, setValues] = useState({
    userId: userContext.user.id,
    title: '',
    category: '',
    amount: '',
    incurred_on: new Date(),
    notes: '',
    error: '',
  });
  const token = localStorage.getItem('jwt');
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setValues({ ...values, incurred_on: date });
  };

  const clickSubmit = () => {
    const expense = {
      userId: values.userId || undefined,
      title: values.title || undefined,
      category: values.category || undefined,
      amount: values.amount || undefined,
      incurred_on: values.incurred_on || undefined,
      notes: values.notes || undefined,
    };

    newExpense(expense, token).then((resp) => console.log(resp));
    navigate('/user/expenses')
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Expense Record
          </Typography>
          <br />
          <TextField
            id="title"
            label="Title"
            className={classes.textField}
            value={values.title}
            onChange={handleChange('title')}
            margin="normal"
          />
          <br />
          <TextField
            id="amount"
            label="Amount ($)"
            className={classes.textField}
            value={values.amount}
            onChange={handleChange('amount')}
            margin="normal"
            type="number"
          />
          <br />
          <TextField
            id="category"
            label="Category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange('category')}
            margin="normal"
          />
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              disableFuture
              label="Responsive"
              showTodayButton
              views={['year', 'month', 'day']}
              value={values.incurred_on}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} className={classes.textField} />
              )}
            />
          </LocalizationProvider>
          <br />
          <br />
          <TextField
            id="multiline-flexible"
            label="Notes"
            multiline
            rows="2"
            value={values.notes}
            onChange={handleChange('notes')}
            className={classes.textField}
            margin="normal"
          />
          <br /> <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions className={classes.action}>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
          <Button
            component={NavLink}
            to="/"
            className={classes.submit}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
