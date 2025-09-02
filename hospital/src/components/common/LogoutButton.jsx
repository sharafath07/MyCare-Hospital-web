import React, { useState } from 'react';
import { LogOut, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LogoutButton = ({ 
  onLogoutSuccess, 
  variant = 'button', 
  className = '',
  showIcon = true,
  children 
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError('');
    setSuccess(false);

    try {
      // Simulate API call delay for logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear authentication data
      logout();
      
      // Show success message briefly
      setSuccess(true);
      
      // Call success callback after a short delay
      setTimeout(() => {
        if (onLogoutSuccess) {
          onLogoutSuccess();
        }
      }, 1000);
      
    } catch (err) {
      setError('Failed to logout. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="flex items-center space-x-2 text-green-600">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm">Logged out successfully</span>
      </div>
    );
  }

  // Button variant
  if (variant === 'button') {
    return (
      <div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors
            ${isLoggingOut 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
            }
            ${className}
          `}
        >
          {isLoggingOut ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Logging out...</span>
            </>
          ) : (
            <>
              {showIcon && <LogOut className="h-4 w-4" />}
              <span>{children || 'Logout'}</span>
            </>
          )}
        </button>
        
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}
      </div>
    );
  }

  // Link variant
  if (variant === 'link') {
    return (
      <div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`
            flex items-center space-x-2 text-left transition-colors
            ${isLoggingOut 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:text-red-600'
            }
            ${className}
          `}
        >
          {isLoggingOut ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Logging out...</span>
            </>
          ) : (
            <>
              {showIcon && <LogOut className="h-4 w-4" />}
              <span>{children || 'Logout'}</span>
            </>
          )}
        </button>
        
        {error && (
          <div className="mt-1 text-red-600 text-xs">{error}</div>
        )}
      </div>
    );
  }

  // Menu item variant (for dropdown menus)
  if (variant === 'menu') {
    return (
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className={`
          flex items-center space-x-2 w-full text-left px-4 py-2 text-sm transition-colors
          ${isLoggingOut 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-gray-700 hover:bg-gray-100'
          }
          ${className}
        `}
      >
        {isLoggingOut ? (
          <>
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Logging out...</span>
          </>
        ) : (
          <>
            {showIcon && <LogOut className="h-4 w-4" />}
            <span>{children || 'Logout'}</span>
          </>
        )}
      </button>
    );
  }

  return null;
};

export default LogoutButton;