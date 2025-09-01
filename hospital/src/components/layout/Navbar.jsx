import React, { useState } from 'react';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = ({ currentView, onViewChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onViewChange('home');
    setIsProfileOpen(false);
  };

  const navItems = user ? (
    user.role === 'admin' ? [
      { key: 'home', label: 'Home' },
      { key: 'admin-dashboard', label: 'Dashboard' },
      { key: 'doctors', label: 'Doctors' }
    ] : [
      { key: 'home', label: 'Home' },
      { key: 'patient-dashboard', label: 'Dashboard' },
      { key: 'doctors', label: 'Doctors' },
      { key: 'appointments', label: 'Appointments' }
    ]
  ) : [
    { key: 'home', label: 'Home' },
    { key: 'doctors', label: 'Doctors' },
    { key: 'login', label: 'Login' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onViewChange('home')}
            >
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">MedCare Hospital</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onViewChange(item.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === item.key
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      {user.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onViewChange(item.key);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    currentView === item.key
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {user && (
                <div className="border-t pt-2">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    {user.name} ({user.email})
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;