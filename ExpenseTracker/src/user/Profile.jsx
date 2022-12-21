import { useState, useEffect, useContext } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import { Edit, Person } from '@mui/icons-material';
import { getCurrentUser } from './userApi';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteUser from './DeleteUser';
import AuthContext from '../store/auth-context';

export default function Profile() {
  const userContext = useContext(AuthContext);
  const userProfile = userContext.user;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    userContext.getUserProfile(token);
  }, []);

  const toEditProfile = () => {
    navigate('/user/edit/' + userProfile.id, { state: userProfile });
  };
  return (
    <Paper sx={{ minWidth: 500, margin: 3, p: 3, mt: 5 }} elevation={4}>
      <Typography variant="h6" color="secondary">
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={userProfile.name} secondary={userProfile.email} />{' '}
          <ListItemSecondaryAction>
            <IconButton
              onClick={toEditProfile}
              aria-label="Edit"
              color="primary"
            >
              <Edit />
            </IconButton>
            <DeleteUser userId={userProfile.id} />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={'Joined: ' + new Date(userProfile.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
