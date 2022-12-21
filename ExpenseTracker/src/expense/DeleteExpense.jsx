import React, { useState } from 'react';
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { deleteUserExpense } from './expenseManager';

export default function DeleteExpense(props) {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('jwt');
  const handleRequestOpen = () => {
    setOpen(true);
  };
  const deleteExpense = () => {
    deleteUserExpense(token, props.expense.id).then((resp) => {
      const data = resp.data;
      if (data.msg) {
        handleRequestClose();
        props.onRemove(props.expense)
      } else {
        console.log(data);
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };
  return (
    <span>
      <IconButton aria-label="Delete" color="secondary" onClick={handleRequestOpen}>
        <Delete />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{'Delete ' + props.expense.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your expense record {props.expense.title}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteExpense}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
