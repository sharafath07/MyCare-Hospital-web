import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook for handling logout functionality
 * Provides logout state management and error handling
 */
const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { logout } = useAuth();

  const performLogout = async (onSuccess) => {
    setIsLoggingOut(true);
    setError('');
    setSuccess(false);

    try {
      // Simulate API call delay for logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear authentication data
      logout();
      
      // Show success state
      setSuccess(true);
      
      // Call success callback after a short delay
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 1000);
      
    } catch (err) {
      setError('Failed to logout. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const resetLogoutState = () => {
    setError('');
    setSuccess(false);
    setIsLoggingOut(false);
  };

  return {
    performLogout,
    isLoggingOut,
    error,
    success,
    resetLogoutState
  };
};

export default useLogout;