// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ element: element }) => {
    // const { user } = useAuth();

    return (

        true? element 
         : <Navigate to="/" />

    );
};

export default PrivateRoute;
