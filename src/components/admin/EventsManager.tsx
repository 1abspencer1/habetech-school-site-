import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, Clock, MapPin, Edit, Trash2, Plus } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useToast } from '@/components/ui/use-toast';
import useAdminSync, { EventItem } from '@/hooks/useAdminSync';

const EventsManager = () => {
  const { toast } = useToast();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [date, setDate] = useState<Date>();
  const { getEvents, updateEvents } = useAdminSync();
  
  // Get events from the useAdminSync hook
  const [events, setEvents] = useState<EventItem[]>([]);
  
  // Load events on component mount
  useEffect(() => {
    setEvents(getEvents());
  }, [getEvents]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: ""
  });

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        variant: "destructive",
        title: "Required fields missing",
        description: "Please fill in at least the title and date."
      });
      return;
    }

    let updatedEvents: EventItem[];
    
    if (editingId) {
      // Update existing event
      updatedEvents = events.map(event => 
        event.id === editingId ? { ...event, ...newEvent } : event
      );
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully."
      });
    } else {
      // Add new event
      const id = Math.max(0, ...events.map(event => event.id)) + 1;
      updatedEvents = [
        {
          id,
          title: newEvent.title,
          date: newEvent.date,
          time: newEvent.time,
          location: newEvent.location,
          description: newEvent.description
        },
        ...events
      ];
      toast({
        title: "Event Added",
        description: "The event has been added successfully."
      });
    }
    
    // Update state and persist to localStorage via useAdminSync
    setEvents(updatedEvents);
    updateEvents(updatedEvents);
    
    // Reset form
    setNewEvent({
      title: "",
      date: "",
      time: "",
      location: "",
      description: ""
    });
    setIsAddingEvent(false);
    setEditingId(null);
    setDate(undefined);
  };

  const handleEditEvent = (id: number) => {
    const eventToEdit = events.find(event => event.id === id);
    if (eventToEdit) {
      setNewEvent({
        title: eventToEdit.title,
        date: eventToEdit.date,
        time: eventToEdit.time,
        location: eventToEdit.location,
        description: eventToEdit.description
      });
      setEditingId(id);
      setIsAddingEvent(true);
    }
  };

  const handleDeleteEvent = (id: number) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    updateEvents(updatedEvents);
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully."
    });
  };
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = format(selectedDate, "MMM d");
      setNewEvent({...newEvent, date: formattedDate});
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Event Manager</CardTitle>
            <CardDescription>
              Manage school events, activities, and important dates.
            </CardDescription>
          </div>
          {!isAddingEvent && (
            <Button 
              onClick={() => setIsAddingEvent(true)}
              className="bg-school-navy"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          )}
        </CardHeader>
        
        <CardContent>
          {isAddingEvent ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                {editingId ? "Edit Event" : "Add New Event"}
              </h3>
              
              <div>
                <label className="block text-sm font-medium mb-1">Event Title*</label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="e.g. Spring Concert"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date*</label>
                  <div className="flex">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newEvent.date ? newEvent.date : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      placeholder="e.g. 3:30 PM"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    placeholder="e.g. School Auditorium"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full border rounded-md px-3 py-2 h-24"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Event details"
                ></textarea>
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddingEvent(false);
                    setEditingId(null);
                    setNewEvent({
                      title: "",
                      date: "",
                      time: "",
                      location: "",
                      description: ""
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveEvent} className="bg-school-navy">
                  {editingId ? "Update Event" : "Add Event"}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {events.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No events scheduled.</p>
                  <Button 
                    variant="link" 
                    onClick={() => setIsAddingEvent(true)}
                  >
                    Add your first event
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div 
                      key={event.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <div className="bg-school-navy text-white rounded text-center p-2 mr-4 min-w-[70px]">
                            <span className="block text-sm font-medium">{event.date.split(' ')[0]}</span>
                            <span className="block text-xl font-bold">{event.date.split(' ')[1]}</span>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <div className="flex flex-wrap text-sm text-gray-600 mt-1">
                              {event.time && (
                                <div className="flex items-center mr-6 mb-1">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {event.time}
                                </div>
                              )}
                              
                              {event.location && (
                                <div className="flex items-center mb-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                            {event.description && (
                              <p className="text-gray-600 mt-2 text-sm">
                                {event.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditEvent(event.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsManager;
