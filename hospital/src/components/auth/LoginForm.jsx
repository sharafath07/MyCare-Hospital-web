import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    bloodGroup: '',
    dateOfBirth: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  
  const { login, register, loading } = useAuth();

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password)
    };
    
    return {
      isValid: Object.values(criteria).every(Boolean),
      criteria
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    // Validation
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (!isLogin) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!validatePassword(formData.password).isValid) {
        newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password, role);
        if (success) {
          setSuccess('Login successful!');
          setTimeout(onSuccess, 1000);
        } else {
          setErrors({ general: 'Invalid credentials. Try patient@hospital.com / admin@hospital.com with password123 / admin123' });
        }
      } else {
        const success = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role,
          phone: formData.phone,
          age: formData.age ? parseInt(formData.age) : undefined,
          bloodGroup: formData.bloodGroup || undefined,
          dateOfBirth: formData.dateOfBirth || undefined,
          gender: formData.gender || undefined,
          address: (formData.street || formData.city || formData.state || formData.zipCode || formData.country) ? {
            street: formData.street || undefined,
            city: formData.city || undefined,
            state: formData.state || undefined,
            zipCode: formData.zipCode || undefined,
            country: formData.country || undefined
          } : undefined
        });
        
        if (success) {
          setSuccess('Registration successful!');
          setTimeout(onSuccess, 1000);
        } else {
          setErrors({ general: 'Registration failed. Email may already exist.' });
        }
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    }
  };

  const passwordValidation = !isLogin ? validatePassword(formData.password) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h2>
            <p className="mt-2 text-gray-600">
              {isLogin ? 'Welcome back to MedCare' : 'Join MedCare Hospital'}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="mb-6">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setRole('patient')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  role === 'patient'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  role === 'admin'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          {errors.general && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-700 text-sm">{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone field (register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            )}

            {/* Additional Profile Fields Toggle */}
            {!isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowAdditionalFields(!showAdditionalFields)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {showAdditionalFields ? 'Hide' : 'Add'} Additional Details (Optional)
                </button>
              </div>
            )}

            {/* Additional Profile Fields */}
            {!isLogin && showAdditionalFields && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">Additional Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your age"
                      min="1"
                      max="120"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Address</h5>
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Street address"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="State"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="ZIP Code"
                      />
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              
              {/* Password strength indicator (register only) */}
              {!isLogin && formData.password && passwordValidation && (
                <div className="mt-2 space-y-1">
                  <div className="text-xs text-gray-600">Password Requirements:</div>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className={`flex items-center space-x-1 ${passwordValidation.criteria.length ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.criteria.length ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>8+ characters</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordValidation.criteria.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.criteria.uppercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>Uppercase</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordValidation.criteria.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.criteria.lowercase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>Lowercase</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${passwordValidation.criteria.number ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${passwordValidation.criteria.number ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>Number</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password field (register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Remember Me (login only) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setSuccess('');
                setShowAdditionalFields(false);
                setFormData({ 
                  name: '', 
                  email: '', 
                  password: '', 
                  confirmPassword: '', 
                  phone: '',
                  age: '',
                  bloodGroup: '',
                  dateOfBirth: '',
                  gender: '',
                  street: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  country: ''
                });
              }}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>

          {/* Test Credentials */}
          {isLogin && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
              <p className="font-medium text-blue-800 mb-1">Test Credentials:</p>
              <p className="text-blue-700">Patient: patient@hospital.com / password123</p>
              <p className="text-blue-700">Admin: admin@hospital.com / admin123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;