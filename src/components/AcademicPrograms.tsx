
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, GraduationCap, BookOpen } from 'lucide-react';
import useAdminSync, { AcademicProgram } from '@/hooks/useAdminSync';

const AcademicPrograms = () => {
  const { getAcademicPrograms } = useAdminSync();
  const [programs, setPrograms] = useState<AcademicProgram[]>([]);
  
  useEffect(() => {
    const fetchedPrograms = getAcademicPrograms();
    setPrograms(fetchedPrograms);
  }, [getAcademicPrograms]);
  
  // Define icons for each program
  const getIconForIndex = (index: number) => {
    const icons = [BookOpen, Book, GraduationCap];
    return icons[index % icons.length];
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Academic Programs</h2>
          <p className="section-subtitle">
            Our comprehensive academic programs provide students with the knowledge, skills,
            and experiences needed to excel in college and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            const ProgramIcon = getIconForIndex(index);
            return (
              <div 
                key={program.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:translate-y-[-5px]"
              >
                <div className="bg-school-navy text-white p-6 flex items-center justify-center">
                  <ProgramIcon className="h-12 w-12" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-1">{program.name}</h3>
                  <p className="text-school-gold font-medium mb-4">Grades: {program.grades}</p>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <Link 
                    to={`/academics#${program.id}`}
                    className="text-school-navy font-medium hover:text-school-gold flex items-center"
                  >
                    Learn More
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;
