
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-school-navy h-[600px] md:h-[700px] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)'
        }}
      />
      <div className="container relative z-10 px-4 md:px-0">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">
            Empowering Future Leaders
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            We provide a nurturing, inclusive, and academically rigorous environment where students grow into confident, compassionate leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/admissions#apply" className="btn-primary bg-school-gold text-school-navy">
              Apply Now
            </Link>
            <Link to="/about" className="btn-primary bg-transparent border-2 border-white hover:bg-white hover:text-school-navy">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="hidden md:block absolute -bottom-10 -right-10 w-64 h-64 bg-school-gold opacity-10 rounded-full"></div>
      <div className="hidden md:block absolute top-20 -left-20 w-80 h-80 bg-school-gold opacity-10 rounded-full"></div>
    </div>
  );
};

export default Hero;
