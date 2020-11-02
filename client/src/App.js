import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "./components/Home";
import LightDarkToggle from "./components/LightDark/LightDarkToggle";

function App() {
  return (
    <>
      <LightDarkToggle />

      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <ProtectedRoute path="/profile"></ProtectedRoute>
        </Switch>
      </div>
    </>
  );
}

export default App;
