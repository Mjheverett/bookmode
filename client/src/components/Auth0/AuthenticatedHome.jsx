import React from "react";
import { Redirect } from 'react-router-dom';

import Home from '../Home/Home';

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticatedHome = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <Redirect to="/dashboard" /> : <Home />;
};

export default AuthenticatedHome;