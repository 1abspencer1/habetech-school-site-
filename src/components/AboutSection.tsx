
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAdminSync from '@/hooks/useAdminSync';

const AboutSection = () => {
  const { getContentSections } = useAdminSync();
  const [aboutContent, setAboutContent] = useState({
    title: '',
    description: '',
    stats: [] as { value: string; label: string }[]
  });
  
  useEffect(() => {
    const sections = getContentSections();
    if (sections && sections.about) {
      setAboutContent(sections.about);
    }
  }, [getContentSections]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="section-title">{aboutContent.title}</h2>
            <p className="mb-6 text-gray-700">
              {aboutContent.description}
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {aboutContent.stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-school-navy font-serif">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary inline-block">
              Learn More About Us
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="School building"
                className="rounded-lg shadow-xl w-full object-cover h-[400px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-school-gold h-24 w-24 rounded-full flex items-center justify-center">
                <span className="text-school-navy font-serif font-bold text-xl">Est. 1993</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
