import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './auth/ProtectedRoute';
import Home from './components/Home';
import LightDarkToggle from './components/LightDark/LightDarkToggle';
import Navbar from './components/Navbar';
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

          </ProtectedRoute>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;