
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar } from 'lucide-react';
import useAdminSync, { NewsItem, EventItem } from '@/hooks/useAdminSync';

const NewsEventsPage = () => {
  const { getNewsItems, getEvents } = useAdminSync();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  
  useEffect(() => {
    setNewsItems(getNewsItems());
    setUpcomingEvents(getEvents());
  }, [getNewsItems, getEvents]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 mt-24 mb-12">
        <h1 className="text-4xl font-bold text-school-navy font-serif mb-8">News & Events</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-school-navy font-serif mb-6">Latest News</h2>
              <div className="space-y-8">
                {newsItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-700 mb-4">{item.excerpt}</p>
                      <a href="#" className="text-school-navy font-semibold hover:underline">Read more</a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div>
            <section className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <div className="flex items-center mb-4">
                <Calendar className="text-school-navy mr-2" />
                <h2 className="text-xl font-bold text-school-navy font-serif">Upcoming Events</h2>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="text-sm text-gray-600">
                      <div>{event.date}</div>
                      <div>{event.time}</div>
                      <div>{event.location}</div>
                    </div>
                  </div>
                ))}
              </div>
              <a 
                href="/calendar" 
                className="mt-6 block text-center bg-school-gold text-school-navy py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
              >
                View Full Calendar
              </a>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsEventsPage;
