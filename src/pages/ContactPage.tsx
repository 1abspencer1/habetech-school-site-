
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import OfficeHours from '../components/contact/OfficeHours';
import CampusMap from '../components/contact/CampusMap';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 mt-24 mb-12">
        <h1 className="text-4xl font-bold text-school-navy font-serif mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <ContactInfo />
            <OfficeHours />
          </div>
          
          <div>
            <ContactForm />
          </div>
        </div>
        
        <CampusMap />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
