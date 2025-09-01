import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Calendar, 
  Users, 
  Settings,
  Heart,
  FileText,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ResponsiveSidebar = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const patientMenuItems = [
    { key: 'patient-dashboard', label: 'Dashboard', icon: Home },
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'doctors', label: 'Doctors', icon: Users },
    { key: 'appointments', label: 'Appointments', icon: Calendar },
    { key: 'medical-history', label: 'Medical History', icon: FileText }
  ];

  const adminMenuItems = [
    { key: 'admin-dashboard', label: 'Dashboard', icon: Home },
    { key: 'manage-doctors', label: 'Manage Doctors', icon: Users },
    { key: 'manage-appointments', label: 'Manage Appointments', icon: Calendar },
    { key: 'admin-profile', label: 'Profile', icon: User },
    { key: 'settings', label: 'Settings', icon: Settings }
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : patientMenuItems;

  const handleItemClick = (key) => {
    onViewChange(key);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static lg:translate-x-0 top-0 left-0 h-full w-64 bg-white shadow-lg z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-gray-800">MedCare</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleItemClick(item.key)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left
                    transition-colors duration-200 hover:bg-blue-50
                    ${currentView === item.key 
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${currentView === item.key ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>24/7 Emergency: 911</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveSidebar;