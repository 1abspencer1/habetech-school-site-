
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 mt-24 mb-12">
        <h1 className="text-4xl font-bold text-school-navy font-serif mb-8">About Our Academy</h1>
        
        <section id="mission" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Our Mission & Vision</h2>
          <p className="text-gray-700 mb-4">
            Our mission is to provide a nurturing, inclusive, and academically rigorous environment where students 
            grow into confident, compassionate leaders. We are committed to academic excellence, character development, 
            and fostering a love of learning that will serve our students throughout their lives.
          </p>
          <p className="text-gray-700">
            Our vision is to be a leader in education, known for innovation, academic excellence, and developing 
            well-rounded individuals who contribute positively to society.
          </p>
        </section>
        
        <section id="faculty" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Leadership & Faculty</h2>
          <p className="text-gray-700 mb-4">
            Our dedicated faculty members are experts in their fields, passionate about teaching, and committed to 
            helping every student succeed. Our administration provides strong leadership and guidance to create an 
            optimal learning environment.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* Placeholder for faculty profiles */}
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
              <h3 className="font-semibold">Dr. Jane Smith</h3>
              <p className="text-gray-600">Principal</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
              <h3 className="font-semibold">Mr. Robert Johnson</h3>
              <p className="text-gray-600">Vice Principal</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
              <h3 className="font-semibold">Ms. Lisa Chen</h3>
              <p className="text-gray-600">Academic Director</p>
            </div>
          </div>
        </section>
        
        <section id="history" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">History & Accreditations</h2>
          <p className="text-gray-700 mb-4">
            Founded in 1993, our Academy has a rich history of academic excellence and community involvement. Over the 
            past three decades, we have grown from a small school with just 50 students to a comprehensive educational 
            institution serving hundreds of students from diverse backgrounds.
          </p>
          <p className="text-gray-700 mb-4">
            We are proudly accredited by the National Association of Independent Schools (NAIS) and the State Department 
            of Education, ensuring our curriculum and practices meet the highest standards of educational excellence.
          </p>
        </section>
        
        <section id="campus" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Campus Tour</h2>
          <p className="text-gray-700 mb-4">
            Our beautiful campus features modern classrooms, state-of-the-art science and computer labs, a library, 
            sports facilities, and dedicated spaces for arts and music. Our campus is designed to provide a safe, 
            inspiring environment for learning and growth.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">Campus Image</div>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">Campus Image</div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
