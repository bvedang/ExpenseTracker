import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { Typography, TextField, Button } from '@mui/material';
import { pieChartExpense } from '../expense/expenseManager';
import format from 'date-fns/format';
import {
  VictoryPie,
  VictoryTheme,
  VictoryLabel,
} from 'victory';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `16px ${theme.spacing(2.5)}px 2px`,
    display: 'inline',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textField: {
    margin: '8px 16px',
    width: 240,
  },
}));

function CategoryPie() {
  const classes = useStyles();
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('jwt');
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth(),
    d = date.getDate();
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  const [lastDay, setLastDay] = useState(new Date(y, m, d));
  useEffect(() => {
    const formatedFirstDay = format(firstDay, 'dd-MM-yyyy');
    const formatedLastDay = format(lastDay, 'dd-MM-yyyy');
    pieChartExpense(token, formatedFirstDay, formatedLastDay).then((resp) => {
      setExpenses(resp.data);
    });
  }, [firstDay, lastDay]);

  const searchClicked = () => {
    const formatedFirstDay = format(firstDay, 'dd-MM-yyyy');
    const formatedLastDay = format(lastDay, 'dd-MM-yyyy');
    pieChartExpense(token, formatedFirstDay, formatedLastDay).then((resp) => {
      setExpenses(resp.data);
    });
  };
  return (
    <div style={{ marginTop: 20 }}>
      <div className={classes.search}>
        <Typography variant="h6" color="secondary" className={classes.title}>
          Expenditures per category
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            openTo="day"
            disableFuture
            label="FROM"
            views={['year', 'month', 'day']}
            value={firstDay}
            onChange={(newDate) => {
              setFirstDay(newDate);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                className={classes.textField}
              />
            )}
          />
          <DatePicker
            openTo="day"
            disableFuture
            label="Year"
            views={['year', 'month', 'day']}
            value={lastDay}
            onChange={(newDate) => {
              setLastDay(newDate);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                color="primary"
                variant="standard"
                className={classes.textField}
              />
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
      <div style={{ width: 550, margin: 'auto' }}>
        <svg viewBox="0 0 320 320">
          <VictoryPie
            standalone={false}
            data={expenses}
            innerRadius={50}
            theme={VictoryTheme.material}
            labelRadius={({ innerRadius }) => innerRadius + 14}
            labelComponent={
              <VictoryLabel
                angle={0}
                style={[
                  {
                    fontSize: '11px',
                    fill: '#0f0f0f',
                  },
                  {
                    fontSize: '10px',
                    fill: '#013157',
                  },
                ]}
                text={({ datum }) => `${datum.x}\n $${datum.y}`}
              />
            }
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 14, fill: '#8b8b8b' }}
            x={175}
            y={170}
            text={`Spent \nper category`}
          />
        </svg>
      </div>
    </div>
  );
}

export default CategoryPie;
