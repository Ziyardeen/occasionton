import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../../appwrite/authentication';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        console.log(user);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    };

    checkUser();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  return authenticated ? children : <Navigate to='/signin' />;
};

export default ProtectedRoute;
