
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StudentLifePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 mt-24 mb-12">
        <h1 className="text-4xl font-bold text-school-navy font-serif mb-8">Student Life</h1>
        
        <section id="sports" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Sports</h2>
          <p className="text-gray-700 mb-4">
            Our athletic program emphasizes teamwork, leadership, and personal growth. We offer a variety of competitive 
            sports for students at all levels, from beginners to elite athletes.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Fall Sports</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Soccer (Boys & Girls)</li>
                <li>Cross Country</li>
                <li>Volleyball</li>
                <li>Tennis</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Winter Sports</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Basketball (Boys & Girls)</li>
                <li>Swimming</li>
                <li>Wrestling</li>
                <li>Indoor Track</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Spring Sports</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Baseball</li>
                <li>Softball</li>
                <li>Track & Field</li>
                <li>Golf</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">Athletic Facilities</h3>
            <p className="text-gray-700">
              Our campus features a full-sized gymnasium, outdoor fields for various sports, tennis courts, and a fitness center.
            </p>
          </div>
        </section>
        
        <section id="arts" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Arts & Music</h2>
          <p className="text-gray-700 mb-4">
            We believe that the arts are essential to a well-rounded education. Our comprehensive arts program includes 
            visual arts, music, theater, and dance.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Visual Arts</h3>
              <p className="text-gray-700 mb-2">
                Our visual arts program includes courses in drawing, painting, sculpture, ceramics, photography, and digital art. 
                Student work is displayed throughout campus and in our annual art show.
              </p>
              <h3 className="font-bold text-lg mt-4 mb-2">Music</h3>
              <p className="text-gray-700">
                Our music program includes choir, band, orchestra, and music theory. Students perform in concerts throughout the year 
                and have opportunities to participate in regional and state competitions.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Theater</h3>
              <p className="text-gray-700 mb-2">
                Our theater program produces multiple shows each year, giving students experience in acting, directing, set design, 
                lighting, sound, and stage management.
              </p>
              <h3 className="font-bold text-lg mt-4 mb-2">Dance</h3>
              <p className="text-gray-700">
                Our dance program offers instruction in ballet, modern, jazz, and hip-hop. The annual dance showcase 
                features choreography by both students and faculty.
              </p>
            </div>
          </div>
        </section>
        
        <section id="clubs" className="mb-12">
          <h2 className="text-2xl font-bold text-school-navy font-serif mb-4">Clubs & Activities</h2>
          <p className="text-gray-700 mb-4">
            We offer a wide range of clubs and activities that allow students to explore their interests, develop new skills, 
            and build community outside the classroom.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Academic Clubs</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Debate Team</li>
                <li>Math Olympiad</li>
                <li>Science Club</li>
                <li>Model United Nations</li>
                <li>Robotics Team</li>
                <li>Coding Club</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Service & Leadership</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Student Government</li>
                <li>Community Service Club</li>
                <li>Environmental Club</li>
                <li>Peer Tutoring</li>
                <li>School Newspaper</li>
                <li>Yearbook Committee</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Special Interest Clubs</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Chess Club</li>
                <li>Cooking Club</li>
                <li>Film Society</li>
                <li>Photography Club</li>
                <li>Book Club</li>
                <li>Gaming Club</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-700 mt-6">
            Students are also encouraged to propose and establish new clubs based on their interests, with faculty sponsorship.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default StudentLifePage;
