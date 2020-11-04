import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MaterialNavbar from './components/Navbar/MaterialNavbar';
import Home from './components/Home/Home';
import AuthenticatedHome from './components/Auth0/AuthenticatedHome';
import Profile from './components/Profile/Profile';
import Library from './components/Library/Library';
import Groups from './components/Groups/Groups';
import Footer from './components/Footer/Footer';
import Results from './components/Results/Results';
import './App.css'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#002B36',
      contrastText: '#93A1A1',
    },
    // seconday: {
    //   main: '#D33682',
    //   contrastText: '#93A1A1',
    // },
  },
});

function App() {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>  
    <MaterialNavbar />
      <div className="app-container">
        <Switch>
          <Route exact path="/">
            <AuthenticatedHome />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/library">
            <Library />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/results" render={(props) => <Results {...props}/>}/>
        </Switch>
      </div>
      <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;