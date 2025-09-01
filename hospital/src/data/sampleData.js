export const sampleDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    experience: 12,
    photo: 'https://images.pexels.com/photos/559831/pexels-photo-559831.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    availability: [
      { day: 'Monday', times: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { day: 'Tuesday', times: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { day: 'Wednesday', times: ['09:00', '10:00', '11:00'] },
      { day: 'Thursday', times: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { day: 'Friday', times: ['09:00', '10:00', '11:00'] }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    experience: 15,
    photo: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.9,
    email: 'michael.chen@hospital.com',
    phone: '+1 (555) 234-5678',
    availability: [
      { day: 'Monday', times: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'Tuesday', times: ['10:00', '11:00', '14:00', '15:00'] },
      { day: 'Wednesday', times: ['09:00', '10:00', '11:00', '14:00'] },
      { day: 'Thursday', times: ['10:00', '11:00', '14:00', '15:00'] },
      { day: 'Friday', times: ['09:00', '10:00', '11:00', '14:00'] }
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrics',
    experience: 8,
    photo: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    email: 'emily.rodriguez@hospital.com',
    phone: '+1 (555) 345-6789',
    availability: [
      { day: 'Monday', times: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00'] },
      { day: 'Tuesday', times: ['08:00', '09:00', '10:00', '11:00', '13:00'] },
      { day: 'Wednesday', times: ['08:00', '09:00', '10:00', '11:00'] },
      { day: 'Thursday', times: ['08:00', '09:00', '10:00', '11:00', '13:00'] },
      { day: 'Friday', times: ['08:00', '09:00', '10:00', '11:00'] }
    ]
  },
  {
    id: '4',
    name: 'Dr. David Thompson',
    specialization: 'Orthopedics',
    experience: 20,
    photo: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    email: 'david.thompson@hospital.com',
    phone: '+1 (555) 456-7890',
    availability: [
      { day: 'Monday', times: ['09:00', '10:00', '11:00', '15:00', '16:00'] },
      { day: 'Tuesday', times: ['09:00', '10:00', '11:00', '15:00'] },
      { day: 'Wednesday', times: ['09:00', '10:00', '11:00', '15:00', '16:00'] },
      { day: 'Thursday', times: ['09:00', '10:00', '11:00'] },
      { day: 'Friday', times: ['09:00', '10:00', '11:00', '15:00'] }
    ]
  },
  {
    id: '5',
    name: 'Dr. Lisa Wang',
    specialization: 'Dermatology',
    experience: 10,
    photo: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    email: 'lisa.wang@hospital.com',
    phone: '+1 (555) 567-8901',
    availability: [
      { day: 'Monday', times: ['10:00', '11:00', '14:00', '15:00'] },
      { day: 'Tuesday', times: ['10:00', '11:00', '14:00', '15:00', '16:00'] },
      { day: 'Wednesday', times: ['10:00', '11:00', '14:00'] },
      { day: 'Thursday', times: ['10:00', '11:00', '14:00', '15:00'] },
      { day: 'Friday', times: ['10:00', '11:00', '14:00', '15:00'] }
    ]
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    specialization: 'Internal Medicine',
    experience: 18,
    photo: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    email: 'james.wilson@hospital.com',
    phone: '+1 (555) 678-9012',
    availability: [
      { day: 'Monday', times: ['08:00', '09:00', '10:00', '13:00', '14:00', '15:00'] },
      { day: 'Tuesday', times: ['08:00', '09:00', '10:00', '13:00', '14:00'] },
      { day: 'Wednesday', times: ['08:00', '09:00', '10:00', '13:00'] },
      { day: 'Thursday', times: ['08:00', '09:00', '10:00', '13:00', '14:00'] },
      { day: 'Friday', times: ['08:00', '09:00', '10:00', '13:00', '14:00'] }
    ]
  }
];

export const sampleAppointments = [
  {
    id: '1',
    patientId: 'patient1',
    patientName: 'John Smith',
    doctorId: '1',
    doctorName: 'Dr. Sarah Johnson',
    doctorSpecialization: 'Cardiology',
    date: '2024-02-15',
    time: '10:00',
    reason: 'Annual heart checkup',
    status: 'confirmed',
    createdAt: '2024-02-10T10:00:00Z'
  },
  {
    id: '2',
    patientId: 'patient2',
    patientName: 'Jane Doe',
    doctorId: '2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialization: 'Neurology',
    date: '2024-02-16',
    time: '14:00',
    reason: 'Headache consultation',
    status: 'pending',
    createdAt: '2024-02-11T14:00:00Z'
  },
  {
    id: '3',
    patientId: 'patient1',
    patientName: 'John Smith',
    doctorId: '3',
    doctorName: 'Dr. Emily Rodriguez',
    doctorSpecialization: 'Pediatrics',
    date: '2024-02-20',
    time: '09:00',
    reason: 'Child vaccination',
    status: 'confirmed',
    createdAt: '2024-02-12T09:00:00Z'
  }
];

export const specializations = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Internal Medicine',
  'General Practice',
  'Psychiatry',
  'Radiology',
  'Emergency Medicine'
];