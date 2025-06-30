import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import GoogleCallback from './pages/GoogleCallback';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = useSelector(state => state.user.token);
  const accessToken = localStorage.getItem('access_token');

  if (!token || !accessToken) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/auth/google/signin/callback" element={<GoogleCallback />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
