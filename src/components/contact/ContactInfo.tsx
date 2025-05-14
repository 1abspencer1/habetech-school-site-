
import React from 'react';
import { Mail, Phone, Home } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Get In Touch</h2>
      <p className="text-gray-700 mb-6">
        We're here to answer any questions you may have about our school, admissions process, 
        or programs. Please fill out the form and we'll get back to you as soon as possible.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <Phone className="text-school-navy mt-1 mr-3" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-700">(555) 123-4567</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="text-school-navy mt-1 mr-3" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-700">info@academy.edu</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Home className="text-school-navy mt-1 mr-3" />
          <div>
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-700">
              123 Education Avenue<br />
              Anytown, ST 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
