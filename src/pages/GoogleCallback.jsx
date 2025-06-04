import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { setUserInfo } from '../store/userSlice';

function GoogleCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const state = searchParams.get('state');
        const code = searchParams.get('code');

        if (!state || !code) {
          throw new Error('Missing required parameters');
        }

        const response = await fetch('http://localhost:8080/auth/google/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ state, code })
        });

        const data = await response.json();
        
        if (data.access_token) {
          // Store the access token in localStorage
          localStorage.setItem('access_token', data.access_token);
          
          // Decode the JWT token
          const decodedToken = jwtDecode(data.access_token);

          // Dispatch the entire decoded token to Redux store
          dispatch(setUserInfo({
            token: decodedToken,
            avatarUrl: data.avatar_url,
          }));
        }

        // After successful callback, redirect to dashboard
        navigate('/');
      } catch (error) {
        console.error('Error during callback:', error);
      }
    };

    handleCallback();
  }, [location, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Processing sign in...
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Please wait while we complete your sign in.
        </p>
      </div>
    </div>
  );
}

export default GoogleCallback; 