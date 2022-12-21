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
import { useNavigate } from 'react-router-dom';
import { deleteUser } from './userApi';

export default function DeleteUser() {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const navigate = useNavigate();
  const openConfirmClickHandler = () => {
    setOpenConfirmDialog(true);
  };

  const deleteUserAccount = () => {
    console.log('User needs to be deleted');
    deleteUser().then((response) => {
      console.log(response, 'user deleted!');
      navigate('/');
    });
  };

  const cancelClickHandler = () => {
    setOpenConfirmDialog(false);
  };
  return (
    <span>
      <IconButton
        aria-label="Delete"
        onClick={openConfirmClickHandler}
        color="secondary"
      >
        <Delete />
      </IconButton>

      <Dialog open={openConfirmDialog} onClose={cancelClickHandler}>
        <DialogTitle>{'Delete Account'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelClickHandler} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteUserAccount}
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
