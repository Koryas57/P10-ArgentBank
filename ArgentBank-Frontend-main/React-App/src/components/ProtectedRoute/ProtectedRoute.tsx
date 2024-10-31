import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../app/store';


// We create a component for protected routes, here specifically for the profile route
export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated} = useSelector((state: RootState) => state.auth);

    
  
  // The Outlet component from react-router-dom allows us to render the children of the protected route
  // If the user is not authenticated, we redirect them to the sign-in page
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};