import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { monthlyExpense } from '../expense/expenseManager';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { Typography, TextField } from '@mui/material';
import format from 'date-fns/format';
import {
  VictoryTheme,
  VictoryScatter,
  VictoryChart,
  VictoryTooltip,
  VictoryLabel,
} from 'victory';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `32px ${theme.spacing(2.5)}px 2px`,
    display: 'inline',
  },
}));

function Monthly() {
  const classes = useStyles();
  const [monthlyPlotData, setmonthlyPlotData] = useState([]);
  const [month, setMonth] = useState(new Date());
  const token = localStorage.getItem('jwt');
  useEffect(() => {
    const formattedMonth = format(month, 'dd-MM-yyyy');
    monthlyExpense(token, formattedMonth).then((resp) => {
      setmonthlyPlotData(resp.data);
    });
  }, [month]);
  return (
    <div style={{ marginBottom: 20 }}>
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
            openTo="month"
            disableFuture
            label="MONTH"
            views={['year', 'month']}
            value={month}
            onChange={(newDate) => {
              setMonth(newDate);
            }}
            renderInput={(params) => (
              <TextField {...params} variant='standard' className={classes.textField} />
            )}
          />
        </LocalizationProvider>
      </div>
      <VictoryChart
        theme={VictoryTheme.material}
        height={400}
        width={550}
        domainPadding={40}
      >
        <VictoryScatter
          style={{
            data: { fill: '#3f50b5', strokeWidth: 2 },
            labels: { fill: '#01579b', fontSize: 10, padding: 8 },
          }}
          bubbleProperty="y"
          maxBubbleSize={15}
          minBubbleSize={5}
          labels={({ datum }) => `$${datum.y} on ${datum.x}th`}
          labelComponent={<VictoryTooltip />}
          data={monthlyPlotData}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14, fill: '#8b8b8b' }}
          x={270}
          y={390}
          text={`day of month`}
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

export default Monthly;
