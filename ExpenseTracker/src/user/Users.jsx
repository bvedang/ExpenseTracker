import React, { useState } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import { Person, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Users() {
  const users = [
    { name: 'Vedang Barhate', id: 1 },
    { name: 'Vedang Barhate', id: 2 },
    { name: 'Vedang Barhate', id: 3 },
    { name: 'Vedang Barhate', id: 4 },
    { name: 'Vedang Barhate', id: 5 },
    { name: 'Vedang Barhate', id: 6 },
    { name: 'Vedang Barhate', id: 7 },
  ];
  return (
    <Paper
      sx={{
        p: 1,
        m: 5,
      }}
      elevation={4}
    >
      <Typography
        variant="h6"
        sx={{
          mx: 4,
          my: 2,
        }}
      >
        All Users
      </Typography>
      <List dense>
        {users.map((item, i) => {
          return (
            <Link to={'/user/' + item._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
}
