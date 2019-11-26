import React from 'react';
import './App.css';

import Routes from './routes';
import { UserProvider } from './store/UserContext';

function App() {
  return (
    <div className="container">
      <div className="content">
        <UserProvider>
          <Routes />
        </UserProvider>
      </div>
    </div>
  );
}

export default App;
