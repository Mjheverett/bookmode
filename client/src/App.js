import React from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <div className="App">
      <h1>Book Club App</h1>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}

export default App;
