
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AcademicsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 mt-24 mb-12">
        <h1 className="text-4xl font-bold text-school-navy font-serif mb-8">Academics</h1>
        
        <section id="overview" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Curriculum Overview</h2>
          <p className="text-gray-700 mb-4">
            Our curriculum is designed to challenge students intellectually while fostering creativity, critical thinking, and a love of learning. 
            We integrate traditional academic disciplines with innovative approaches to prepare students for success in a rapidly changing world.
          </p>
          <p className="text-gray-700">
            Our academic approach emphasizes:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
            <li>Strong foundation in core subjects</li>
            <li>Project-based learning opportunities</li>
            <li>Integration of technology across all subjects</li>
            <li>Development of critical thinking and problem-solving skills</li>
            <li>Global perspective and cultural awareness</li>
          </ul>
        </section>
        
        <section id="elementary" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Elementary School (K-5)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                Our elementary program provides a nurturing environment where young minds develop a solid foundation in reading, 
                writing, mathematics, science, and social studies. Students also explore art, music, physical education, and technology.
              </p>
              <p className="text-gray-700 mb-4">
                Key features of our elementary program:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Balanced literacy approach</li>
                <li>Hands-on mathematics curriculum</li>
                <li>Inquiry-based science program</li>
                <li>Social studies curriculum that builds global awareness</li>
                <li>Spanish language instruction beginning in kindergarten</li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-xl font-semibold mb-2">Elementary School</p>
                <p className="text-gray-600">Image Placeholder</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="middle" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Middle School (6-8)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg flex items-center justify-center md:order-1 order-2">
              <div className="text-center p-6">
                <p className="text-xl font-semibold mb-2">Middle School</p>
                <p className="text-gray-600">Image Placeholder</p>
              </div>
            </div>
            <div className="md:order-2 order-1">
              <p className="text-gray-700 mb-4">
                Our middle school program acknowledges the unique developmental needs of early adolescents and provides 
                a supportive structure that encourages independence, responsibility, and intellectual growth.
              </p>
              <p className="text-gray-700 mb-4">
                Key features of our middle school program:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Departmentalized instruction with subject specialists</li>
                <li>Advanced math offerings including Algebra I</li>
                <li>Integrated science curriculum</li>
                <li>Writing across the curriculum</li>
                <li>Introduction to research skills</li>
                <li>Advisory program focusing on social-emotional development</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section id="high" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">High School (9-12)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                Our high school program prepares students for success in college and beyond through a challenging academic 
                curriculum that emphasizes deep understanding, critical thinking, and real-world application of knowledge.
              </p>
              <p className="text-gray-700 mb-4">
                Key features of our high school program:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>College preparatory curriculum</li>
                <li>Advanced Placement (AP) and Honors courses</li>
                <li>Four years of core subjects (English, Math, Science, Social Studies)</li>
                <li>World language requirements</li>
                <li>Arts and elective options</li>
                <li>Senior capstone project</li>
                <li>College counseling program</li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-xl font-semibold mb-2">High School</p>
                <p className="text-gray-600">Image Placeholder</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AcademicsPage;
