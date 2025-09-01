import React from 'react';
import { Star, Calendar, Clock, MapPin } from 'lucide-react';

const DoctorCard = ({ 
  doctor, 
  onBookAppointment, 
  onEdit, 
  onDelete, 
  isAdmin = false 
}) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getTodayAvailability = () => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayName = dayNames[new Date().getDay()];
    
    const todaySlots = doctor.availability.find(slot => 
      slot.day.toLowerCase() === todayName
    );
    
    return todaySlots?.times.slice(0, 3) || [];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Doctor Image */}
      <div className="relative overflow-hidden">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-700">{doctor.rating}</span>
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
          <p className="text-blue-600 font-medium">{doctor.specialization}</p>
          <p className="text-gray-600 text-sm mt-1">{doctor.experience} years experience</p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex space-x-1">
            {renderStars(doctor.rating)}
          </div>
          <span className="text-sm text-gray-600">({doctor.rating}/5.0)</span>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Room 201, 2nd Floor</span>
          </div>
        </div>

        {/* Today's Availability */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Today's Availability
          </h4>
          <div className="flex flex-wrap gap-2">
            {getTodayAvailability().length > 0 ? (
              getTodayAvailability().map((time) => (
                <span
                  key={time}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {time}
                </span>
              ))
            ) : (
              <span className="text-xs text-red-600">No slots available today</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {!isAdmin && onBookAppointment && (
            <button
              onClick={() => onBookAppointment(doctor)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          )}

          {isAdmin && (
            <>
              <button
                onClick={() => onEdit?.(doctor)}
                className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(doctor)}
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;