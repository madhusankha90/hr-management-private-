import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

 // console.log('PrivateRoute: token=', token, 'userRole=', userRole, 'requiredRole=', role);
  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default PrivateRoute;
