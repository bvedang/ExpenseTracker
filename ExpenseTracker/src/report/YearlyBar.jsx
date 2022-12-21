import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { Typography, TextField } from '@mui/material';
import { yearlyExpense } from '../expense/expenseManager';
import {
  VictoryTheme,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTooltip,
} from 'victory';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `32px ${theme.spacing(2.5)}px 2px`,
    display: 'inline',
  },
}));

function YearlyBar() {
  const classes = useStyles();
  const [year, setYear] = useState(new Date());
  const [yearlyExpensedata, setYearlyExpensedata] = useState([]);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    yearlyExpense(token, year.getFullYear()).then((resp) => {
      setYearlyExpensedata(resp.data);
    });
  }, [year]);
  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography variant="h6" color="secondary" className={classes.title}>
          Expenses scattered over{' '}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            openTo="year"
            disableFuture
            label="Year"
            views={['year']}
            value={year}
            onChange={(newDate) => {
              setYear(newDate);
            }}
            renderInput={(params) => (
              <TextField {...params} variant='standard' className={classes.textField} />
            )}
          />
        </LocalizationProvider>
      </div>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={10}
        height={400}
        width={550}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryBar
          style={{
            data: { fill: '#3f50b5', width: 20 },
            labels: { fill: '#01579b' },
          }}
          data={yearlyExpensedata}
          labels={({ datum }) => `$${datum.y}`}
          labelComponent={<VictoryTooltip />}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14, fill: '#8b8b8b' }}
          x={270}
          y={390}
          text={`Month of the Year`}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14, fill: '#8b8b8b' }}
          x={6}
          y={190}
          angle={270}
          text={`Amount ($)`}
        />
      </VictoryChart>
    </div>
  );
}

export default YearlyBar;
