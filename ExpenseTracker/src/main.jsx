import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import App from './App';
import AuthContextProvider from './store/AuthContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
