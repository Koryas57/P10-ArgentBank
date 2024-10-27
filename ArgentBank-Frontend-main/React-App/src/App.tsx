import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { SignIn } from './pages/SignIn/SignIn';
import { Profile } from './pages/Profile/Profile';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'; // Import de la route protégée
import './assets/style/index.scss';
import { RootState } from './app/store';
import { useSelector } from 'react-redux';


/** Composant principal de l'application */
export const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={isAuthenticated ? <Navigate to="/profile" />:<SignIn />} />
        {/* Protégez la route du profil avec le composant ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};