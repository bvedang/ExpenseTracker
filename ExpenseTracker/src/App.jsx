import { useState } from 'react';
import MainRouter from './MainRouter';
import AuthContext from './store/auth-context';

function App() {
  return (
    <div className="App">
        <MainRouter />
    </div>
  );
}

export default App;
