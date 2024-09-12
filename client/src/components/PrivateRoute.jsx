import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext' ;

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
