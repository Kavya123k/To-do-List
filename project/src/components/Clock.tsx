import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-xl shadow-lg transition-all duration-500 hover:bg-opacity-50">
      <h2 className="text-6xl md:text-8xl font-light tracking-tight transition-all">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </h2>
      <p className="text-xl md:text-2xl font-light mt-2 text-gray-300 transition-all">
        {formatDate(time)}
      </p>
    </div>
  );
};

export default Clock;