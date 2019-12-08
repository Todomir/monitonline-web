import React from 'react';

import './App.css';

import Routes from './routes';
import { GlobalProvider } from './store/GlobalContext';

function App() {
  return (
    <GlobalProvider>
      <Routes />
    </GlobalProvider>
  );
}

export default App;
