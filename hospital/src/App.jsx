import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoginForm from './components/auth/LoginForm';
import PatientDashboard from './components/dashboards/PatientDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import DoctorCard from './components/common/DoctorCard';
import { sampleDoctors } from './data/sampleData';
import { Heart, Users, Calendar, Shield, Award, Clock } from 'lucide-react';

const AppContent = () => {
  const [currentView, setCurrentView] = useState('home');
  const { user, loading } = useAuth();

  const handleLoginSuccess = () => {
    if (user?.role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('patient-dashboard');
    }
  };

  const renderHome = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Your Health, Our Priority
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Experience world-class healthcare with our dedicated team of medical professionals. 
                Book your appointment today and take the first step towards a healthier you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentView('login')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setCurrentView('doctors')}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  View Doctors
                </button>
              </div>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Healthcare professionals"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MedCare Hospital?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive healthcare services with modern facilities and experienced medical professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Doctors</h3>
              <p className="text-gray-600">
                Our team consists of highly qualified doctors with years of experience in their specializations.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Emergency Care</h3>
              <p className="text-gray-600">
                Round-the-clock emergency services to ensure you get the care you need, when you need it.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Care</h3>
              <p className="text-gray-600">
                We maintain the highest standards of medical care with state-of-the-art equipment and facilities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book appointments online at your convenience with our user-friendly scheduling system.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient-Centered Care</h3>
              <p className="text-gray-600">
                We prioritize your comfort and well-being with personalized treatment plans and compassionate care.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                Your health information is protected with the highest security standards and privacy protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Doctors
            </h2>
            <p className="text-xl text-gray-600">
              Dedicated healthcare professionals committed to your well-being
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleDoctors.slice(0, 3).map(doctor => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBookAppointment={() => setCurrentView('login')}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentView('doctors')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Doctors
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Medical Emergency?</h2>
            <p className="text-xl mb-8 text-red-100">
              Don't wait. Get immediate medical attention.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">911</p>
                <p className="text-red-200">Emergency Services</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">+1 (555) 999-0000</p>
                <p className="text-red-200">Hospital Emergency Line</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderDoctors = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Medical Professionals
          </h1>
          <p className="text-xl text-gray-600">
            Meet our team of experienced doctors and specialists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={() => setCurrentView('login')}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!user && <Navbar currentView={currentView} onViewChange={setCurrentView} />}
      
      <main>
        {currentView === 'login' && (
          <LoginForm onSuccess={handleLoginSuccess} />
        )}
        
        {currentView === 'home' && !user && renderHome()}
        {currentView === 'doctors' && !user && renderDoctors()}
        
        {user?.role === 'patient' && (
          <PatientDashboard currentView={currentView} onViewChange={setCurrentView} />
        )}
        
        {user?.role === 'admin' && (
          <AdminDashboard currentView={currentView} onViewChange={setCurrentView} />
        )}
      </main>
      
      {!user && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;