import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const ProtectedRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth0();
    
    return (
        <Route {...rest} render={() => {
            return isAuthenticated === true
                ? children
                : <Redirect to="/" />
        }} />
    )
};

export default ProtectedRoute;