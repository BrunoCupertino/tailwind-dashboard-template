import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';

function SignIn() {
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/google/signin/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      // Redirect to the Google sign-in URL
      window.location.href = data.Url;
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email and password to sign in!
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn; 