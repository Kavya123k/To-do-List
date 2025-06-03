import React, { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';

interface VoiceAssistantProps {
  listening: boolean;
  setListening: (listening: boolean) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ listening, setListening }) => {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [animationState, setAnimationState] = useState<'idle' | 'listening' | 'processing' | 'responding'>('idle');

  useEffect(() => {
    if (listening) {
      setAnimationState('listening');
      setTranscript('');
      setResponse('');
      
      const recognitionTimeout = setTimeout(() => {
        const mockTranscripts = [
          'What time is it?',
          'What\'s the weather like today?',
          'Show me the latest news',
          'What events do I have today?'
        ];
        
        const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
        setTranscript(randomTranscript);
        setAnimationState('processing');
        
        setTimeout(() => {
          let assistantResponse = '';
          
          if (randomTranscript.includes('time')) {
            const now = new Date();
            assistantResponse = `It's currently ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
          } else if (randomTranscript.includes('weather')) {
            assistantResponse = 'The current temperature is 24°C with partly cloudy skies. There\'s a 20% chance of rain later today.';
          } else if (randomTranscript.includes('news')) {
            assistantResponse = 'Here are the latest headlines. I\'ve updated the news widget for you.';
          } else if (randomTranscript.includes('events')) {
            assistantResponse = 'You have a team meeting at 10 AM today in Conference Room A.';
          }
          
          setAnimationState('responding');
          setResponse(assistantResponse);
          
          setTimeout(() => {
            setListening(false);
            setAnimationState('idle');
          }, 5000);
        }, 1500);
      }, 2000);
      
      return () => clearTimeout(recognitionTimeout);
    }
  }, [listening, setListening]);

  if (!listening && animationState === 'idle') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-20 transition-opacity duration-500">
      <div className="w-full max-w-md p-8 bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl transition-all duration-500 transform scale-100 hover:scale-105">
        <div className="flex flex-col items-center">
          <div className="mb-6 relative">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 bg-opacity-50 flex items-center justify-center transform transition-all duration-500 ${
              animationState === 'listening' ? 'scale-110 animate-pulse' : ''
            }`}>
              <Mic size={36} className={`text-white transition-all duration-300 ${
                animationState === 'listening' ? 'animate-bounce' : ''
              }`} />
            </div>
            
            {animationState === 'listening' && (
              <>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-indigo-500 opacity-60 animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-2 border-purple-400 opacity-40 animate-ping animation-delay-150" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-violet-300 opacity-20 animate-ping animation-delay-300" />
              </>
            )}
          </div>
          
          <div className="text-center mb-6 w-full">
            {animationState === 'listening' && (
              <p className="text-2xl font-light text-indigo-300 animate-pulse">Listening...</p>
            )}
            
            {animationState === 'processing' && (
              <p className="text-2xl font-light text-purple-300">Processing...</p>
            )}
            
            {transcript && (
              <div className="mt-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg transform transition-all duration-300 hover:scale-105">
                <p className="text-gray-300 italic">"{transcript}"</p>
              </div>
            )}
            
            {response && (
              <div className="mt-6 transform transition-all duration-300">
                <p className="text-xl font-medium text-indigo-300 mb-2">Assistant</p>
                <div className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-30 rounded-lg shadow-lg">
                  <p className="text-white">{response}</p>
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setListening(false)} 
            className="mt-4 px-6 py-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;