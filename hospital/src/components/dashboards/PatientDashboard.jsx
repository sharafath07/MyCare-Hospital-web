import React, { useState } from 'react';
import { Calendar, User, Users, FileText, Clock, Heart, Star, Phone, Mail, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { sampleDoctors, sampleAppointments } from '../../data/sampleData';
import DoctorCard from '../common/DoctorCard';
import AppointmentCard from '../common/AppointmentCard';
import AppointmentForm from '../common/AppointmentForm';
import ResponsiveSidebar from '../layout/ResponsiveSidebar';

const PatientDashboard = ({ currentView, onViewChange }) => {
  const { user } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorFilter, setDoctorFilter] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [appointments, setAppointments] = useState(sampleAppointments);

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleAppointmentSubmit = (appointmentData) => {
    const doctor = sampleDoctors.find(d => d.id === appointmentData.doctorId);
    if (doctor && user) {
      const newAppointment = {
        id: Date.now().toString(),
        patientId: user.id,
        patientName: user.name,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialization: doctor.specialization,
        date: appointmentData.date,
        time: appointmentData.time,
        reason: appointmentData.reason,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
  };

  const handleCancelAppointment = (id) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      )
    );
  };

  const filteredDoctors = sampleDoctors.filter(doctor => {
    const matchesName = doctor.name.toLowerCase().includes(doctorFilter.toLowerCase());
    const matchesSpecialization = !specializationFilter || doctor.specialization === specializationFilter;
    return matchesName && matchesSpecialization;
  });

  const userAppointments = appointments.filter(apt => apt.patientId === user?.id);
  const upcomingAppointments = userAppointments.filter(apt => 
    apt.status !== 'cancelled' && apt.status !== 'completed' && new Date(apt.date) >= new Date()
  );
  const pastAppointments = userAppointments.filter(apt => 
    apt.status === 'completed' || new Date(apt.date) < new Date()
  );

  const specializations = Array.from(new Set(sampleDoctors.map(d => d.specialization)));

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100">Manage your appointments and health information</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
              <p className="text-gray-600">Upcoming Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pastAppointments.length}</p>
              <p className="text-gray-600">Past Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{sampleDoctors.length}</p>
              <p className="text-gray-600">Available Doctors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
          <button
            onClick={() => onViewChange('appointments')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View All
          </button>
        </div>
        {upcomingAppointments.slice(0, 2).length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.slice(0, 2).map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onCancel={handleCancelAppointment}
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => onViewChange('doctors')}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
          >
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Find Doctors</h3>
            <p className="text-sm text-gray-600">Browse available doctors</p>
          </button>

          <button
            onClick={() => onViewChange('appointments')}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
          >
            <Calendar className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Appointments</h3>
            <p className="text-sm text-gray-600">Manage your appointments</p>
          </button>

          <button
            onClick={() => onViewChange('profile')}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors"
          >
            <User className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Profile</h3>
            <p className="text-sm text-gray-600">Update your information</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderDoctors = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Doctors</h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by name
            </label>
            <input
              type="text"
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
              placeholder="Enter doctor name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by specialization
            </label>
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Specializations</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={handleBookAppointment}
          />
        ))}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Appointments</h2>
        
        {/* Appointment Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-blue-500 py-2 px-1 text-blue-600 font-medium">
              Upcoming ({upcomingAppointments.length})
            </button>
            <button className="border-b-2 border-transparent py-2 px-1 text-gray-500 hover:text-gray-700 font-medium">
              Past ({pastAppointments.length})
            </button>
          </nav>
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onCancel={handleCancelAppointment}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No upcoming appointments</p>
            <button
              onClick={() => onViewChange('doctors')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book an Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture Section */}
          <div className="text-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-16 w-16 text-blue-600" />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Update Photo
            </button>
          </div>

          {/* Basic Information */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={user?.phone || ''}
                    placeholder="Add phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={user?.dateOfBirth || ''}
                    placeholder="Select date of birth"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={user?.age || ''}
                    placeholder="Enter age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={user?.gender || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select
                    value={user?.bloodGroup || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    value="Patient"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    value={user?.address?.street || ''}
                    placeholder="Enter street address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={user?.address?.city || ''}
                    placeholder="Enter city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={user?.address?.state || ''}
                    placeholder="Enter state"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={user?.address?.zipCode || ''}
                    placeholder="Enter ZIP code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    value={user?.address?.country || ''}
                    placeholder="Enter country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={user?.emergencyContact?.name || ''}
                    placeholder="Enter contact name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <input
                    type="text"
                    value={user?.emergencyContact?.relationship || ''}
                    placeholder="e.g., Spouse, Parent"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={user?.emergencyContact?.phone || ''}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical History & Allergies</label>
                <textarea
                  rows={4}
                  placeholder="Any medical conditions, allergies, medications, or important medical information..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  defaultValue={user?.medicalHistory?.join(', ') || ''}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Emergency Contacts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Hospital Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <Phone className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-800">Emergency Services</p>
              <p className="text-red-600">911</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Phone className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Hospital Emergency</p>
              <p className="text-blue-600">+1 (555) 999-0000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ResponsiveSidebar currentView={currentView} onViewChange={onViewChange} />
      
      <div className="flex-1 lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'patient-dashboard' && renderDashboardOverview()}
          {currentView === 'doctors' && renderDoctors()}
          {currentView === 'appointments' && renderAppointments()}
          {currentView === 'profile' && renderProfile()}
        </div>
      </div>

      {/* Appointment Form Modal */}
      {selectedDoctor && (
        <AppointmentForm
          doctor={selectedDoctor}
          onSubmit={handleAppointmentSubmit}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
};

export default PatientDashboard;