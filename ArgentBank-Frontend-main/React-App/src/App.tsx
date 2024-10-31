import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { SignIn } from './pages/SignIn/SignIn';
import { Profile } from './pages/Profile/Profile';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import './assets/style/index.scss';
import { RootState } from './app/store';
import { useSelector } from 'react-redux';



export const App: React.FC = () => {

  // We check if the user is authenticated from the Redux state
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* We handle the sign-in route and redirect if the user is already authenticated */}
        <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/profile" />:<SignIn />} />
        {/* We use the ProtectedRoute component to secure the profile route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};