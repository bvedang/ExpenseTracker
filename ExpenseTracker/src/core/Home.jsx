import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import tempImage from '../assets/812.jpg';
import { Link } from 'react-router-dom';

export default function Home() {
  
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: 'auto',
        my: 5,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          p: 2,
          color: '#002f6c',
        }}
      >
        Home Page
      </Typography>
      <CardMedia
        sx={{
          minHeight: 400,
        }}
        component="img"
        image={tempImage}
        title="Unicorn Bicycle"
      />
      <Typography
        variant="body2"
        component="p"
        color="textSecondary"
        sx={{
          p: 1,
          textAlign: 'right',
          backgroundColor: '#ededed',
          borderBottom: '1px solid #d0d0d0',
        }}
      >
        Photo by{' '}
        <Link
          color={'#3f4771'}
          href="https://unsplash.com/@boudewijn_huysmans"
          target="_blank"
          rel="noopener noreferrer"
        >
          Boudewijn Huysmans
        </Link>{' '}
        on Unsplash
      </Typography>
      <CardContent>
        <Typography variant="body1" component="p">
          Welcome to the MERN Skeleton home page.
        </Typography>
      </CardContent>
    </Card>
  );
}
