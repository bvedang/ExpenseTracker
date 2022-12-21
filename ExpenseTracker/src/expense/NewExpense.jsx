import { useState, useContext } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import AuthContext from '../store/auth-context';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import { newExpense } from './expenseManager';
import { format } from 'date-fns';

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
    fontSize: '2em',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
    color: '#fff',
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
  const token = localStorage.getItem('jwt');
  const categories = [
    'Entertainment',
    'Food & Drink',
    'Home',
    'Life',
    'Transportation',
    'Uncategorized',
    'Utilities',
  ];
  const classes = useStyles();
  const navigate = useNavigate();
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

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const expense = {
      userId: values.userId || undefined,
      title: values.title || undefined,
      category: values.category || undefined,
      amount: values.amount || undefined,
      incurred_on: format(values.incurred_on, 'dd-MM-yyyy') || undefined,
      notes: values.notes || undefined,
    };
    console.log(expense);
    newExpense(expense, token).then((resp) => console.log(resp));
    navigate('/user/expenses');
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            type="headline"
            color="primary"
            component="h2"
            className={classes.title}
          >
            Add New Expense
          </Typography>
          <br />
          <TextField
            id="title"
            label="Title"
            className={classes.textField}
            value={values.title}
            onChange={handleChange('title')}
            margin="normal"
            variant="standard"
          />
          <br />
          <TextField
            id="amount"
            label="Amount ($)"
            className={classes.textField}
            value={values.amount}
            onChange={handleChange('amount')}
            margin="normal"
            variant="standard"
            type="number"
          />
          <br />
          <FormControl sx={{ mt: 2, mb: 1 }}>
            <InputLabel id="category-Label">Category</InputLabel>
            <Select
              className={classes.textField}
              labelId="category-Label"
              id="category-select"
              value={values.category}
              label="Category"
              variant="standard"
              onChange={handleChange('category')}
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
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              label="Responsive"
              showTodayButton
              views={['year', 'month', 'day']}
              value={values.incurred_on}
              onChange={(newValue) => {
                setValues({ ...values, incurred_on: newValue });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  className={classes.textField}
                />
              )}
            />
          </LocalizationProvider>
          <br />
          <br />
          <TextField
            variant="standard"
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
            onClick={() => {
              navigate('/user/expenseOverview');
            }}
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
