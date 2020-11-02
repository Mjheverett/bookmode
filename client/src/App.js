import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './auth/ProtectedRoute';
import Navbar from './components/Navbar';
import LightDarkToggle from './components/LightDark/LightDarkToggle';
import Home from './components/Home';
import Profile from './components/Profile/Profile';
import Library from './components/Library/Library';
import Groups from './components/Groups/Groups';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <LightDarkToggle />
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/library">
            <Library />
          </ProtectedRoute>
          <ProtectedRoute path="/groups">
            <Groups />
          </ProtectedRoute>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;