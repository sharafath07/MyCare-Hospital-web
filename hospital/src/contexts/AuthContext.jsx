import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Sample users for testing
const sampleUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'patient@hospital.com',
    password: 'password123',
    role: 'patient',
    phone: '+1 (555) 123-0001',
    medicalHistory: ['Hypertension', 'Diabetes Type 2'],
    age: 35,
    bloodGroup: 'O+',
    dateOfBirth: '1989-03-15',
    gender: 'male',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 123-0010'
    }
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@hospital.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1 (555) 123-0002',
    age: 42,
    address: {
      street: '456 Admin Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA'
    }
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('hospital_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = sampleUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('hospital_user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (userData) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = sampleUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setLoading(false);
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      age: userData.age,
      bloodGroup: userData.bloodGroup,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      address: userData.address
    };

    setUser(newUser);
    localStorage.setItem('hospital_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospital_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};