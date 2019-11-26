import React from 'react';
import './App.css';

import Routes from './routes';
import { GlobalProvider } from './store/GlobalContext';

function App() {
  return (
    <div className="container">
      <div className="content">
        <GlobalProvider>
          <Routes />
        </GlobalProvider>
      </div>
    </div>
  );
}

export default App;
