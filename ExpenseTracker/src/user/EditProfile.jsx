import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from '@mui/material';
import { useEffect } from 'react';
import { updateUser } from './userApi';

export default function EditProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    created: '',
    updated: '',
    publicId: '',
    id: '',
    password: '',
    error: '',
  });
  const state = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setUser({
      ...user,
      name: state.state.name,
      email: state.state.email,
      created: state.state.created,
      updated: state.state.updated,
      publicId: state.state.publicId,
      id: state.state.id,
      password: '',
      error: '',
    });
  }, []);
  const handleChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const updatedUser = {
      name: user.name || undefined,
      email: user.email || undefined,
      password: user.password || undefined,
      id: user.id || undefined,
    };
    updateUser(updatedUser).then((resp) => {
      console.log(resp.data);
      navigate('/profile');
    });
    console.log(updatedUser);
  };
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: 5,
        paddingBottom: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ margin: 2, color: '#2bbd7e' }}>
          Edit Profile
        </Typography>
        <TextField
          id="name"
          variant="standard"
          label="Name"
          sx={{
            marginLeft: 1,
            marginRight: 1,
            width: 300,
          }}
          value={user.name}
          onChange={handleChange('name')}
          margin="normal"
        />
        <br />
        <TextField
          id="email"
          variant="standard"
          type="email"
          label="Email"
          sx={{
            marginLeft: 1,
            marginRight: 1,
            width: 300,
          }}
          value={user.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          variant="standard"
          type="password"
          label="Password"
          sx={{
            marginLeft: 1,
            marginRight: 1,
            width: 300,
          }}
          value={user.password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <br />{' '}
        {user.error && (
          <Typography component="p" color="error">
            <Icon color="error" sx={{ verticalAlign: 'middle' }}>
              error
            </Icon>
            {user.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          sx={{ margin: 'auto', marginBottom: 2 }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
