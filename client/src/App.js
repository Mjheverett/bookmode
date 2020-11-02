import React from 'react';
import { Switch } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './auth/ProtectedRoute';
import AuthenticationButton from './components/AuthenticationButton';
import SignupButton from './components/SignUpButton';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <ProtectedRoute path="/profile">
          
        </ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
