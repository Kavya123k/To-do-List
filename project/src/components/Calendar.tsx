import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location?: string;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from an actual calendar API
    const fetchEvents = () => {
      setLoading(true);
      
      // Simulated calendar data
      setTimeout(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        const mockEvents: CalendarEvent[] = [
          {
            id: '1',
            title: 'Team Meeting',
            date: today,
            time: '10:00 AM',
            location: 'Conference Room A'
          },
          {
            id: '2',
            title: 'Dentist Appointment',
            date: tomorrow,
            time: '2:30 PM',
            location: 'Dental Clinic'
          },
          {
            id: '3',
            title: 'Birthday Party',
            date: nextWeek,
            time: '7:00 PM',
            location: 'John\'s House'
          }
        ];
        
        setEvents(mockEvents);
        setLoading(false);
      }, 1200);
    };
    
    fetchEvents();
    
    // Refresh calendar every hour
    const interval = setInterval(fetchEvents, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if date is today
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    // Check if date is tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    // Otherwise, return formatted date
    return date.toLocaleDateString(undefined, { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-xl shadow-lg min-h-[200px]">
        <p className="text-xl animate-pulse">Loading calendar events...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-xl shadow-lg transition-all duration-500 hover:bg-opacity-50">
      <div className="flex items-center mb-4">
        <CalendarIcon className="mr-2" size={20} />
        <h3 className="text-2xl font-medium">Upcoming Events</h3>
      </div>
      
      {events.length === 0 ? (
        <p className="text-gray-400 italic">No upcoming events</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="flex items-start border-b border-gray-700 pb-4 last:border-0 transition-all duration-300 hover:bg-gray-800 hover:bg-opacity-30 p-2 rounded"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex flex-col items-center justify-center mr-4 flex-shrink-0">
                <span className="text-xs text-gray-400">{formatDate(event.date).split(' ')[0]}</span>
                <span className="text-xl font-medium">{event.date.getDate()}</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-medium">{event.title}</h4>
                <p className="text-gray-300 text-sm">{event.time}</p>
                {event.location && (
                  <p className="text-gray-400 text-sm mt-1">{event.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;