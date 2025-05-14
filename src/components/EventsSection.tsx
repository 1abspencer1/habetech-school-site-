
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import useAdminSync, { EventItem } from '@/hooks/useAdminSync';

const EventsSection = () => {
  const { getEvents } = useAdminSync();
  const [events, setEvents] = useState<EventItem[]>([]);
  
  useEffect(() => {
    const latestEvents = getEvents().slice(0, 4); // Get first 4 events for display
    setEvents(latestEvents);
  }, [getEvents]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">
            Stay updated on school activities, performances, and important dates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Link 
              to={`/events/${event.id}`}
              key={event.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="bg-school-navy text-white rounded text-center p-2 mr-4 min-w-[60px]">
                  <span className="block text-sm font-medium">
                    {event.date.split(' ')[0]}
                  </span>
                  <span className="block text-xl font-bold">
                    {event.date.split(' ')[1]}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-serif font-semibold text-lg mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{event.time} • {event.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/calendar" className="inline-flex items-center btn-primary">
            <Calendar className="mr-2 h-5 w-5" />
            View Full Calendar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
