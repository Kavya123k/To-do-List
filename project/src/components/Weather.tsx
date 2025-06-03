import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Snowflake, Wind } from 'lucide-react';

interface WeatherData {
  condition: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  forecast: Array<{
    day: string;
    condition: string;
    high: number;
    low: number;
  }>;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = () => {
      setLoading(true);
      
      setTimeout(() => {
        const mockWeather: WeatherData = {
          condition: ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'][Math.floor(Math.random() * 5)],
          temperature: Math.floor(Math.random() * 30) + 10,
          humidity: Math.floor(Math.random() * 50) + 30,
          windSpeed: Math.floor(Math.random() * 20) + 5,
          forecast: [
            { day: 'Mon', condition: 'sunny', high: 28, low: 18 },
            { day: 'Tue', condition: 'cloudy', high: 25, low: 17 },
            { day: 'Wed', condition: 'rainy', high: 22, low: 15 },
            { day: 'Thu', condition: 'cloudy', high: 24, low: 16 },
            { day: 'Fri', condition: 'sunny', high: 26, low: 17 }
          ]
        };
        
        setWeather(mockWeather);
        setLoading(false);
      }, 1000);
    };
    
    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    const iconProps = {
      size: 24,
      className: "transition-all duration-300 transform group-hover:scale-110"
    };

    switch (condition) {
      case 'sunny':
        return <Sun {...iconProps} className="text-yellow-300 animate-spin-slow" />;
      case 'cloudy':
        return <Cloud {...iconProps} className="text-gray-400" />;
      case 'rainy':
        return <CloudRain {...iconProps} className="text-blue-300" />;
      case 'snowy':
        return <Snowflake {...iconProps} className="text-blue-200 animate-pulse" />;
      case 'windy':
        return <Wind {...iconProps} className="text-gray-300" />;
      default:
        return <Cloud {...iconProps} className="text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 bg-opacity-40 backdrop-blur-lg rounded-xl shadow-lg h-full min-h-[200px]">
        <p className="text-xl animate-pulse">Loading weather data...</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 bg-opacity-40 backdrop-blur-lg rounded-xl shadow-lg">
        <p>Unable to load weather data</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 bg-opacity-40 backdrop-blur-lg rounded-xl shadow-lg transition-all duration-500 hover:bg-opacity-50 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center group">
          <div className="w-16 h-16 mr-4 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
            {getWeatherIcon(weather.condition)}
          </div>
          <div>
            <h3 className="text-5xl font-light tracking-tight transition-all duration-300 group-hover:tracking-normal">
              {weather.temperature}°C
            </h3>
            <p className="text-gray-300 capitalize text-lg">{weather.condition}</p>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-sm text-gray-300">
            <span className="text-gray-400">Humidity:</span> {weather.humidity}%
          </p>
          <p className="text-sm text-gray-300">
            <span className="text-gray-400">Wind:</span> {weather.windSpeed} km/h
          </p>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-4">
        <h4 className="text-sm text-gray-400 mb-3 tracking-wider">5-DAY FORECAST</h4>
        <div className="grid grid-cols-5 gap-4">
          {weather.forecast.map((day) => (
            <div key={day.day} className="text-center group transition-transform duration-300 hover:scale-105">
              <p className="text-sm font-medium">{day.day}</p>
              <div className="w-8 h-8 mx-auto my-2 flex items-center justify-center">
                {getWeatherIcon(day.condition)}
              </div>
              <p className="text-xs space-x-2">
                <span className="text-white font-medium">{day.high}°</span>
                <span className="text-gray-400">{day.low}°</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;