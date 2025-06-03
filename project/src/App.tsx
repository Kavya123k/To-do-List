import React, { useState, useEffect } from 'react';
import { Sun, Moon, Mic, MicOff, X } from 'lucide-react';
import Clock from './components/Clock';
import Weather from './components/Weather';
import News from './components/News';
import Calendar from './components/Calendar';
import VoiceAssistant from './components/VoiceAssistant';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [listening, setListening] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState({
    clock: true,
    weather: true,
    news: true,
    calendar: true,
  });

  // Simulate motion detection (in a real implementation, this would use a camera)
  const [motionDetected, setMotionDetected] = useState(true);
  
  useEffect(() => {
    // Simulate motion detection timing out after 30 seconds
    const interval = setInterval(() => {
      // In a real implementation, this would check for actual motion
      const hasMotion = Math.random() > 0.7;
      setMotionDetected(hasMotion);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Simulate ambient light detection
  useEffect(() => {
    const handleAmbientLight = () => {
      // In a real implementation, this would use a light sensor
      const isDark = new Date().getHours() >= 18 || new Date().getHours() < 6;
      setDarkMode(isDark);
    };
    
    handleAmbientLight();
    const interval = setInterval(handleAmbientLight, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleWidget = (widget) => {
    setActiveWidgets({
      ...activeWidgets,
      [widget]: !activeWidgets[widget],
    });
  };

  const toggleListening = () => {
    setListening(!listening);
  };

  return (
    <div 
      className={`transition-colors duration-1000 ${
        darkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
      } min-h-screen overflow-hidden`}
    >
      {/* Only show content when motion is detected */}
      <div className={`transition-opacity duration-1000 ${motionDetected ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header with controls */}
        <div className="fixed top-0 right-0 p-4 flex items-center space-x-4 z-10">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={toggleListening} 
            className={`p-2 rounded-full ${listening ? 'bg-red-500 hover:bg-red-600' : 'hover:bg-gray-800'} transition-colors`}
            aria-label={listening ? "Stop listening" : "Start listening"}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Clock widget */}
          {activeWidgets.clock && (
            <div className="relative widget-container">
              <button 
                onClick={() => toggleWidget('clock')} 
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Close clock widget"
              >
                <X size={16} />
              </button>
              <Clock />
            </div>
          )}
          
          {/* Weather widget */}
          {activeWidgets.weather && (
            <div className="relative widget-container">
              <button 
                onClick={() => toggleWidget('weather')} 
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Close weather widget"
              >
                <X size={16} />
              </button>
              <Weather />
            </div>
          )}
          
          {/* News widget */}
          {activeWidgets.news && (
            <div className="relative widget-container md:col-span-2">
              <button 
                onClick={() => toggleWidget('news')} 
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Close news widget"
              >
                <X size={16} />
              </button>
              <News />
            </div>
          )}
          
          {/* Calendar widget */}
          {activeWidgets.calendar && (
            <div className="relative widget-container md:col-span-2">
              <button 
                onClick={() => toggleWidget('calendar')} 
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Close calendar widget"
              >
                <X size={16} />
              </button>
              <Calendar />
            </div>
          )}
        </div>
        
        {/* Voice assistant overlay */}
        <VoiceAssistant listening={listening} setListening={setListening} />
      </div>
    </div>
  );
}

export default App;