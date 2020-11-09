import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';

import MaterialNavbar from './components/Navbar/MaterialNavbar';
import AuthenticatedHome from './components/Auth0/AuthenticatedHome';
import Dashboard from './components/Dashboard/Dashboard';
import Library from './components/Library/Library';
import Groups from './components/Groups/Groups';
import Footer from './components/Footer/Footer';
import Results from './components/Results/Results';
import Profile from './components/Profile/Profile';
import Sharing from './components/Sharing/Sharing';
import Notifications from './components/Notifications/Notifications';
import './App.css';


function App() {
  return (
    <div className="App">
        <MaterialNavbar />
        <div className="app-container">
          <Switch>
            <Route exact path="/">
              <AuthenticatedHome />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/library">
              <Library />
            </Route>
            <Route path="/groups">
              <Groups />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/sharing">
              <Sharing />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/results" render={(props) => <Results {...props}/>}/>
          </Switch>
        </div>
        <Footer />
    </div>
  );
}

export default App;