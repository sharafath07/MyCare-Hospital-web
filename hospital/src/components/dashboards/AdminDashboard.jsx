import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { sampleDoctors, sampleAppointments, specializations } from '../../data/sampleData';
import DoctorCard from '../common/DoctorCard';
import AppointmentCard from '../common/AppointmentCard';
import ResponsiveSidebar from '../layout/ResponsiveSidebar';
import LogoutButton from '../common/LogoutButton';

const AdminDashboard = ({ currentView, onViewChange }) => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState(sampleDoctors);
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  
  // Filters
  const [doctorSearch, setDoctorSearch] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [appointmentStatusFilter, setAppointmentStatusFilter] = useState('');
  const [appointmentDateFilter, setAppointmentDateFilter] = useState('');

  const handleApproveAppointment = (id) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'confirmed' } : apt
      )
    );
  };

  const handleRejectAppointment = (id) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      )
    );
  };

  const handleDeleteDoctor = (doctor) => {
    if (window.confirm(`Are you sure you want to delete ${doctor.name}?`)) {
      setDoctors(prev => prev.filter(d => d.id !== doctor.id));
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(doctorSearch.toLowerCase());
    const matchesSpecialization = !specializationFilter || doctor.specialization === specializationFilter;
    return matchesSearch && matchesSpecialization;
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesStatus = !appointmentStatusFilter || appointment.status === appointmentStatusFilter;
    const matchesDate = !appointmentDateFilter || appointment.date === appointmentDateFilter;
    return matchesStatus && matchesDate;
  });

  const stats = {
    totalDoctors: doctors.length,
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter(a => a.status === 'pending').length,
    confirmedAppointments: appointments.filter(a => a.status === 'confirmed').length,
    todayAppointments: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length
  };

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-blue-100">Welcome back, {user?.name}. Manage doctors and appointments.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
              <p className="text-gray-600">Total Doctors</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments}</p>
              <p className="text-gray-600">Total Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingAppointments}</p>
              <p className="text-gray-600">Pending Approvals</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
              <p className="text-gray-600">Today's Appointments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Appointments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Pending Appointments</h2>
            <button
              onClick={() => onViewChange('manage-appointments')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All
            </button>
          </div>
          {appointments.filter(a => a.status === 'pending').slice(0, 3).map(appointment => (
            <div key={appointment.id} className="mb-4 last:mb-0">
              <AppointmentCard
                appointment={appointment}
                isAdmin
                onApprove={handleApproveAppointment}
                onReject={handleRejectAppointment}
                showActions
              />
            </div>
          ))}
          {appointments.filter(a => a.status === 'pending').length === 0 && (
            <p className="text-gray-500 text-center py-8">No pending appointments</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => setShowAddDoctorForm(true)}
              className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors flex items-center space-x-3"
            >
              <Plus className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Add New Doctor</p>
                <p className="text-sm text-gray-600">Register a new doctor to the system</p>
              </div>
            </button>

            <button
              onClick={() => onViewChange('manage-doctors')}
              className="w-full p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors flex items-center space-x-3"
            >
              <Users className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">Manage Doctors</p>
                <p className="text-sm text-gray-600">View and edit doctor profiles</p>
              </div>
            </button>

            <button
              onClick={() => onViewChange('manage-appointments')}
              className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors flex items-center space-x-3"
            >
              <Calendar className="h-6 w-6 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">Manage Appointments</p>
                <p className="text-sm text-gray-600">Review and approve appointments</p>
              </div>
            </button>

            <div className="pt-4 border-t border-gray-200">
              <LogoutButton 
                onLogoutSuccess={() => onViewChange('home')}
                className="w-full justify-center"
              >
                Sign Out of Admin Panel
              </LogoutButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManageDoctors = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Manage Doctors</h2>
          <button
            onClick={() => setShowAddDoctorForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Doctor</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              placeholder="Search doctors..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
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

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            isAdmin
            onEdit={setEditingDoctor}
            onDelete={handleDeleteDoctor}
          />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No doctors found</p>
        </div>
      )}
    </div>
  );

  const renderManageAppointments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Appointments</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={appointmentStatusFilter}
            onChange={(e) => setAppointmentStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="date"
            value={appointmentDateFilter}
            onChange={(e) => setAppointmentDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            onClick={() => {
              setAppointmentStatusFilter('');
              setAppointmentDateFilter('');
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        </div>

        {/* Appointment Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-800">{stats.pendingAppointments}</p>
            <p className="text-yellow-600 text-sm">Pending</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-800">{stats.confirmedAppointments}</p>
            <p className="text-green-600 text-sm">Confirmed</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-red-800">{appointments.filter(a => a.status === 'cancelled').length}</p>
            <p className="text-red-600 text-sm">Cancelled</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-800">{appointments.filter(a => a.status === 'completed').length}</p>
            <p className="text-blue-600 text-sm">Completed</p>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            isAdmin
            onApprove={handleApproveAppointment}
            onReject={handleRejectAppointment}
            showActions
          />
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No appointments found</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ResponsiveSidebar currentView={currentView} onViewChange={onViewChange} />
      
      <div className="flex-1 lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'admin-dashboard' && renderDashboardOverview()}
          {currentView === 'manage-doctors' && renderManageDoctors()}
          {currentView === 'manage-appointments' && renderManageAppointments()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;