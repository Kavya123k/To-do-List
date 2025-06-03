import React, { useState, useEffect } from 'react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  summary: string;
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from an actual news API
    const fetchNews = () => {
      setLoading(true);
      
      // Simulated news data
      setTimeout(() => {
        const mockNews: NewsItem[] = [
          {
            id: '1',
            title: 'New Breakthrough in Quantum Computing',
            source: 'Tech Today',
            timestamp: '2 hours ago',
            summary: 'Scientists have achieved a major milestone in quantum computing, demonstrating a stable 128-qubit processor.'
          },
          {
            id: '2',
            title: 'Global Climate Agreement Reached',
            source: 'World News',
            timestamp: '5 hours ago',
            summary: 'World leaders have signed a new agreement to reduce carbon emissions by 50% by 2030.'
          },
          {
            id: '3',
            title: 'Stock Markets Reach Record Highs',
            source: 'Financial Times',
            timestamp: '1 day ago',
            summary: 'Major indices closed at all-time highs yesterday, driven by strong tech sector performance.'
          }
        ];
        
        setNews(mockNews);
        setLoading(false);
      }, 1500);
    };
    
    fetchNews();
    
    // Refresh news every hour
    const interval = setInterval(fetchNews, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-xl shadow-lg min-h-[200px]">
        <p className="text-xl animate-pulse">Loading latest news...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 bg-opacity-40 backdrop-blur-lg rounded-xl shadow-lg transition-all duration-500 hover:bg-opacity-50">
      <h3 className="text-2xl font-medium mb-4">Latest News</h3>
      
      <div className="space-y-4">
        {news.map((item) => (
          <div 
            key={item.id} 
            className="border-b border-gray-700 pb-4 last:border-0 transition-transform duration-300 hover:translate-x-1"
          >
            <h4 className="text-lg font-medium">{item.title}</h4>
            <div className="flex items-center text-sm text-gray-400 mt-1 mb-2">
              <span>{item.source}</span>
              <span className="mx-2">•</span>
              <span>{item.timestamp}</span>
            </div>
            <p className="text-gray-300">{item.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;