import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { signup } from './userApi';

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    error: '',
  });
  const [open, setOpen] = useState(false);

  const handleUservalueChange = (valueName) => (event) => {
    setValues({ ...values, [valueName]: event.target.value });
  };

  const handleDialog = () => {
    setOpen(false);
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    console.log(user)
    signup(user).then((data) => {
      if (data) {
        console.log(data);
        setOpen(true);
      } else {
        setOpen(false);
      }
    });
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 600,
          m: 'auto',
          textAlign: 'center',
          mt: 5,
          pb: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              mt: 2,
              color: '#002f6c',
            }}
          >
            Sign Up
          </Typography>
          <TextField
            variant="standard"
            id="name"
            label="Name"
            sx={{
              marginLeft: 1,
              marginRight: 1,
              width: 300,
            }}
            value={values.name}
            onChange={handleUservalueChange('name')}
            margin="normal"
          />
          <br />
          <TextField
            variant="standard"
            id="email"
            type="email"
            label="Email"
            sx={{
              marginLeft: 1,
              marginRight: 1,
              width: 300,
            }}
            value={values.email}
            onChange={handleUservalueChange('email')}
            margin="normal"
          />
          <br />
          <TextField
            variant="standard"
            id="password"
            type="password"
            label="Password"
            sx={{
              marginLeft: 1,
              marginRight: 1,
              width: 300,
            }}
            value={values.password}
            onChange={handleUservalueChange('password')}
            margin="normal"
          />
          <br />{' '}
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" sx={{ verticalAlign: 'middle' }}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            sx={{ m: 'auto', mt: 2 }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog onClose={handleDialog} open={open}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
