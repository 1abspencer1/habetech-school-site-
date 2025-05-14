
import React from 'react';

const CampusMap = () => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-school-navy font-serif mb-6">Campus Map</h2>
      <div className="bg-gray-50 rounded-lg h-96 overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00639682315998!3d40.71277829286723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197c06b7cb%3A0x40a06c78f79e5de6!2sBroadway%2C%20New%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1708882546418!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Academy Location"
          className="w-full h-full"
        ></iframe>
      </div>
      <p className="text-gray-600 text-sm mt-2">
        <span className="font-semibold">Visit us:</span> 123 Academy Drive, Anytown, ST 12345
      </p>
    </div>
  );
};

export default CampusMap;
