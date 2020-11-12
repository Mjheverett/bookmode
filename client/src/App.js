import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';

import MaterialNavbar from './components/Navbar/MaterialNavbar';
import AuthenticatedHome from './components/Auth0/AuthenticatedHome';
import Dashboard from './components/Dashboard/Dashboard';
import Library from './components/Library/Library';
import LibraryResults from './components/Library/LibraryResults';
import Groups from './components/Groups/Groups';
import GroupPage from './components/Groups/GroupPage';
import Footer from './components/Footer/Footer';
import Results from './components/Results/Results';
import Profile from './components/Profile/Profile';
import Sharing from './components/Sharing/Sharing';
import Notifications from './components/Notifications/Notifications';
import BookPage from './components/Library/BookPage'
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
            <ProtectedRoute path="/dashboard">
              <Dashboard />
            </ProtectedRoute>
            <Route path="/library/results/:query" render={(props) => <LibraryResults {...props}/>} />
            <ProtectedRoute path="/library">
              <Library />
            </ProtectedRoute>
            <ProtectedRoute path="/groups/:id">
              <GroupPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/groups">
              <Groups />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/sharing">
              <Sharing />
            </ProtectedRoute>
            <ProtectedRoute path="/notifications">
              <Notifications />
            </ProtectedRoute>
            <Route path="/results" render={(props) => <Results {...props} />} />
            <Route path="/works/:editionKey" render={(props) => <BookPage {...props} />} />
          </Switch>
        </div>
        <Footer />
    </div>
  );
}

export default App;