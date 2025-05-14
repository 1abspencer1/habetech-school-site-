
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import AcademicPrograms from '../components/AcademicPrograms';
import EventsSection from '../components/EventsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-16"> {/* Margin to account for fixed navbar */}
        <Hero />
        <AboutSection />
        <AcademicPrograms />
        <EventsSection />
        <TestimonialsSection />
        <CallToAction />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
