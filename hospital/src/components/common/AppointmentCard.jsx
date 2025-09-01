import React from 'react';
import { Calendar, Clock, User, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const AppointmentCard = ({
  appointment,
  onCancel,
  onReschedule,
  onApprove,
  onReject,
  isAdmin = false,
  showActions = true
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'cancelled':
        return 'text-red-700 bg-red-100 border-red-200';
      case 'completed':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}:00`);
    return time.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {isAdmin ? appointment.patientName : appointment.doctorName}
            </h3>
            <p className="text-blue-600 font-medium">
              {appointment.doctorSpecialization}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-1 ${getStatusColor(appointment.status)}`}>
            {getStatusIcon(appointment.status)}
            <span className="capitalize">{appointment.status}</span>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium">{formatDate(appointment.date)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-700">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-medium">{formatTime(appointment.time)}</p>
            </div>
          </div>
        </div>

        {/* Reason */}
        <div className="mb-4">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Reason for Visit</p>
              <p className="text-gray-800">{appointment.reason}</p>
            </div>
          </div>
        </div>

        {/* Patient Info (Admin View) */}
        {isAdmin && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Patient Information</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p>ID: {appointment.patientId}</p>
              <p>Booked: {new Date(appointment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex flex-wrap gap-2 mt-4">
            {!isAdmin && (
              <>
                {appointment.status === 'confirmed' || appointment.status === 'pending' ? (
                  <>
                    {onReschedule && (
                      <button
                        onClick={() => onReschedule(appointment.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                      >
                        Reschedule
                      </button>
                    )}
                    {onCancel && (
                      <button
                        onClick={() => onCancel(appointment.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </>
                ) : null}
              </>
            )}

            {isAdmin && appointment.status === 'pending' && (
              <>
                {onApprove && (
                  <button
                    onClick={() => onApprove(appointment.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center space-x-1"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                )}
                {onReject && (
                  <button
                    onClick={() => onReject(appointment.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center space-x-1"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                )}
              </>
            )}

            {isAdmin && (
              <button
                onClick={() => onReschedule?.(appointment.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Reschedule
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;