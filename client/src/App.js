import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import MaterialNavbar from './components/Navbar/MaterialNavbar';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Library from './components/Library/Library';
import Groups from './components/Groups/Groups';
import Footer from './components/Footer/Footer';
import Results from './components/Results/Results';
import './App.css'

function App() {
  return (
    <div className="App">
      <MaterialNavbar />
      <div className="app-container">
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
          <ProtectedRoute path="/results">
            <Results />
          </ProtectedRoute>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;