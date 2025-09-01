import React from 'react';
import { Phone, Mail, MapPin, Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hospital Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">MedCare Hospital</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Providing exceptional healthcare services with compassion and excellence. 
              Your health is our priority.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <div className="text-sm text-gray-300">
                  <p>123 Healthcare Avenue</p>
                  <p>Medical District, MD 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <div className="text-sm text-gray-300">
                  <p>+1 (555) 123-4567</p>
                  <p className="text-xs text-gray-400">Main Reception</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <div className="text-sm text-gray-300">
                  <p>info@medcarehospital.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-red-400">Emergency</h3>
            <div className="bg-red-600 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-white" />
                <div>
                  <p className="text-lg font-bold text-white">911</p>
                  <p className="text-xs text-red-200">24/7 Emergency Line</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-white" />
                <div>
                  <p className="text-lg font-bold text-white">+1 (555) 999-0000</p>
                  <p className="text-xs text-blue-200">Hospital Emergency</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                About Us
              </a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Services
              </a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Departments
              </a>
              <a href="#" className="block text-gray-300 hover:text-blue-400 transition-colors">
                Patient Resources
              </a>
            </div>
            
            <div className="pt-4">
              <h4 className="text-md font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 MedCare Hospital. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Patient Rights</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;