import React, { useState,useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Signin(props) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  });

  const navigate = useNavigate();

  const clickSubmit = async() => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    console.log(user);
    if (user.email === 'vedang@hawk.iit.edu' && user.password === '1234') {
      setValues({ ...values, error: '', redirectToReferrer: true });
      navigate('/');
    }

  };
  

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
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
            marginTop: 2,
            color: '#002f6c',
          }}
        >
          Sign In
        </Typography>
        <TextField
          id="email"
          type="email"
          label="Email"
          sx={{
            marginLeft: 1,
            marginRight: 1,
            width: 300,
          }}
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          sx={{
            marginLeft: 1,
            marginRight: 1,
            width: 300,
          }}
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <br />{' '}
        {values.error && (
          <Typography component="p" color="error">
            <Icon
              color="error"
              sx={{
                verticalAlign: 'middle',
              }}
            >
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
          sx={{ m: 'auto', mb: 2 }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
