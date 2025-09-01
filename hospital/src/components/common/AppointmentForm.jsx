import React, { useState } from 'react';
import { Calendar, Clock, FileText, User, X, CheckCircle, AlertCircle } from 'lucide-react';
import CalendarComponent from "./Calender";

const AppointmentForm = ({ doctor, onSubmit, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const getAvailableTimesForDate = (date) => {
    if (!date) return [];
    
    const selectedDateObj = new Date(date);
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[selectedDateObj.getDay()];
    
    const daySchedule = doctor.availability.find(schedule => 
      schedule.day.toLowerCase() === dayName
    );
    
    return daySchedule?.times || [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Validation
    const newErrors = {};
    
    if (!selectedDate) newErrors.date = 'Please select a date';
    if (!selectedTime) newErrors.time = 'Please select a time slot';
    if (!reason.trim()) newErrors.reason = 'Please provide a reason for your visit';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        doctorId: doctor.id,
        date: selectedDate,
        time: selectedTime,
        reason: reason.trim()
      });
      
      setSuccess(true);
      
      // Close form after success
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      setErrors({ general: 'Failed to book appointment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableTimes = getAvailableTimesForDate(selectedDate);

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h3>
          <p className="text-gray-600 mb-4">
            Your appointment with {doctor.name} has been successfully scheduled for {selectedDate} at {selectedTime}.
          </p>
          <p className="text-sm text-gray-500">
            You will receive a confirmation email shortly. This window will close automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
              <p className="text-sm text-gray-600">with {doctor.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Doctor Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-4">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
              </div>
            </div>
          </div>

          {/* Error Messages */}
          {errors.general && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-700 text-sm">{errors.general}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <CalendarComponent
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                minDate={new Date().toISOString().split('T')[0]}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            {/* Time & Details */}
            <div className="space-y-6">
              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Available Time Slots
                </label>
                {selectedDate ? (
                  availableTimes.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 text-sm font-medium rounded-lg border transition-colors ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No available time slots for the selected date.
                    </p>
                  )
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Please select a date first to see available time slots.
                  </p>
                )}
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                )}
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Reason for Visit
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="Please describe your symptoms or reason for the appointment..."
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                    errors.reason ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{errors.reason && <span className="text-red-600">{errors.reason}</span>}</span>
                  <span>{reason.length}/500</span>
                </div>
              </div>

              {/* Patient Instructions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Important Notes:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Please arrive 15 minutes early for your appointment</li>
                  <li>• Bring a valid ID and insurance card</li>
                  <li>• You will receive a confirmation email</li>
                  <li>• Cancellations must be made at least 24 hours in advance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedDate || !selectedTime || !reason.trim()}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Booking...</span>
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;