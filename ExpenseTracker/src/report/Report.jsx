import React from 'react';
import Monthly from './Monthly';
import { Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import YearlyBar from './YearlyBar';
import CategoryPie from './CategoryPie';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    maxWidth: '800px',
    margin: 'auto',
    marginTop: 40,
    marginBottom: 40,
  },
  separator: {
    marginBottom: 36,
  },
}));

function Report() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Monthly />
      <Divider className={classes.separator} />
      <YearlyBar />
      <Divider className={classes.separator} />
      <CategoryPie />
    </div>
  );
}

export default Report;
