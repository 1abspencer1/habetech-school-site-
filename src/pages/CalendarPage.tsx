
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar as CalendarIcon } from 'lucide-react';

const CalendarPage = () => {
  // Sample calendar events organized by month
  const calendarEvents = {
    May: [
      { id: 1, date: "May 10, 2025", name: "Spring Concert", time: "6:00 PM", location: "Auditorium" },
      { id: 2, date: "May 12-13, 2025", name: "Parent-Teacher Conferences", time: "3:00 PM - 7:00 PM", location: "School Campus" },
      { id: 3, date: "May 15, 2025", name: "Science Fair", time: "9:00 AM - 1:00 PM", location: "Gymnasium" },
      { id: 4, date: "May 20, 2025", name: "Spring Sports Awards", time: "6:30 PM", location: "Auditorium" },
      { id: 5, date: "May 25, 2025", name: "Field Day", time: "9:00 AM - 2:00 PM", location: "Athletic Fields" },
      { id: 6, date: "May 27, 2025", name: "Memorial Day - No School", time: "All Day", location: "" }
    ],
    June: [
      { id: 7, date: "June 1, 2025", name: "Senior Art Exhibition", time: "4:00 PM - 7:00 PM", location: "Art Gallery" },
      { id: 8, date: "June 5, 2025", name: "8th Grade Graduation", time: "10:00 AM", location: "Auditorium" },
      { id: 9, date: "June 7, 2025", name: "Prom", time: "7:00 PM - 11:00 PM", location: "Grand Hotel Ballroom" },
      { id: 10, date: "June 8, 2025", name: "High School Graduation", time: "2:00 PM", location: "Main Campus Lawn" },
      { id: 11, date: "June 10, 2025", name: "Last Day of School", time: "Half Day", location: "" }
    ],
    August: [
      { id: 12, date: "August 15, 2025", name: "New Faculty Orientation", time: "8:00 AM - 4:00 PM", location: "Conference Room" },
      { id: 13, date: "August 18-19, 2025", name: "Faculty Professional Development", time: "8:00 AM - 4:00 PM", location: "School Campus" },
      { id: 14, date: "August 22, 2025", name: "New Student Orientation", time: "9:00 AM - 12:00 PM", location: "School Campus" },
      { id: 15, date: "August 25, 2025", name: "First Day of School", time: "8:00 AM", location: "School Campus" }
    ],
    September: [
      { id: 16, date: "September 2, 2025", name: "Labor Day - No School", time: "All Day", location: "" },
      { id: 17, date: "September 10, 2025", name: "Back to School Night", time: "6:30 PM - 8:30 PM", location: "School Campus" },
      { id: 18, date: "September 15, 2025", name: "Fall Sports Pep Rally", time: "2:00 PM", location: "Gymnasium" }
    ]
  };

  // Filter types for calendar
  const filterTypes = [
    { id: 'academic', label: 'Academic Events' },
    { id: 'sports', label: 'Sports' },
    { id: 'arts', label: 'Arts & Music' },
    { id: 'holiday', label: 'School Holidays' },
    { id: 'community', label: 'Community Events' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 mt-24 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-school-navy font-serif">School Calendar</h1>
          <div className="mt-4 md:mt-0">
            <button className="bg-school-gold text-school-navy px-4 py-2 rounded flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" />
              Subscribe to Calendar
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="font-bold text-xl mb-4">Filter Events</h2>
              <div className="space-y-3">
                {filterTypes.map(filter => (
                  <div key={filter.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={filter.id} 
                      className="h-4 w-4 rounded border-gray-300 text-school-navy focus:ring-school-navy"
                    />
                    <label htmlFor={filter.id} className="ml-2 text-gray-700">{filter.label}</label>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h2 className="font-bold text-xl mb-4">Academic Year</h2>
                <select className="w-full rounded border-gray-300 focus:border-school-navy focus:ring-school-navy">
                  <option>2025-2026</option>
                  <option>2024-2025</option>
                </select>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h2 className="font-bold text-xl mb-4">Jump to Month</h2>
                <div className="grid grid-cols-3 gap-2">
                  {['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
                    <a 
                      key={month} 
                      href={`#${month}`}
                      className="bg-white border border-gray-200 rounded p-2 text-center text-sm hover:bg-gray-100"
                    >
                      {month}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="space-y-12">
              {Object.entries(calendarEvents).map(([month, events]) => (
                <div key={month} id={month} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold text-school-navy font-serif mb-6 border-b border-gray-200 pb-2">{month} 2025</h2>
                  <div className="space-y-4">
                    {events.map(event => (
                      <div key={event.id} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-school-gold">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{event.name}</h3>
                            <div className="text-gray-600">
                              <span>{event.date}</span>
                              {event.time && (
                                <span> • {event.time}</span>
                              )}
                            </div>
                            {event.location && (
                              <div className="text-gray-600">{event.location}</div>
                            )}
                          </div>
                          <div className="mt-3 md:mt-0">
                            <button className="text-school-navy hover:underline text-sm">+ Add to Calendar</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalendarPage;
