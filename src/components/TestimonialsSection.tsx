
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "My children have thrived academically and socially since enrolling at the Academy. The teachers truly care about each student's success.",
      author: "Rebecca Johnson",
      role: "Parent of 8th and 10th graders"
    },
    {
      quote: "The Academy helped me discover my passion for science and provided me with countless opportunities to explore and grow as a student and leader.",
      author: "David Chen",
      role: "Class of 2022, now at Stanford University"
    },
    {
      quote: "As an alum who now sends my own children here, I can attest to the consistent excellence of the Academy's educational experience across generations.",
      author: "Thomas Garcia",
      role: "Alumnus and current parent"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-school-navy text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-school-gold opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title text-white">What Our Community Says</h2>
          <p className="section-subtitle text-gray-300">
            Hear from our parents, students, and alumni about their experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg"
            >
              <svg 
                className="h-10 w-10 text-school-gold mb-4 opacity-80"
                fill="currentColor"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              
              <p className="mb-4 italic">"{testimonial.quote}"</p>
              
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-300">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
