import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StarBackground from './components/StarBackground';
import Header from './components/Header';
import APODSection from './components/APODSection';
import LaunchTimeline from './components/LaunchTimeline';
import AstroBot from './components/AstroBot';
import MissionTimeline from './components/MissionTimeline';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'missions'>('home');

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const toggleBot = () => {
    setIsBotOpen(!isBotOpen);
  };

  if (currentView === 'missions') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <StarBackground />
        <div className="relative z-10">
          <Header
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onToggleBot={toggleBot}
            isBotOpen={isBotOpen}
            currentView={currentView}
            onViewChange={setCurrentView}
          />
          <MissionTimeline />
        </div>
        <AstroBot isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      
      <div className="relative z-10">
        <Header
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onToggleBot={toggleBot}
          isBotOpen={isBotOpen}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AkashDhara
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Journey through the cosmos and discover the wonders of space exploration. 
              From ancient astronomical discoveries to modern space missions, explore the universe's greatest stories.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <APODSection selectedDate={selectedDate} onDateChange={handleDateChange} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <LaunchTimeline selectedDate={selectedDate} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
              <motion.h2 
                className="text-3xl font-bold text-white mb-6 text-center"
                whileHover={{ scale: 1.02 }}
              >
                Explore the Cosmos
              </motion.h2>
              <p className="text-gray-300 mb-8 text-center text-lg leading-relaxed max-w-3xl mx-auto">
                Click on different dates to discover what happened in space history, 
                explore our comprehensive mission timeline, or chat with AstroBot to learn about space missions, astronauts, and cosmic phenomena!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { 
                    label: 'NASA APOD', 
                    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
                    onClick: () => window.open('https://apod.nasa.gov/apod/', '_blank')
                  },
                  { 
                    label: 'Space Launches', 
                    color: 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400',
                    onClick: () => {}
                  },
                  { 
                    label: 'Mission Timeline', 
                    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
                    onClick: () => setCurrentView('missions')
                  },
                  { 
                    label: 'AI Assistant', 
                    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
                    onClick: () => setIsBotOpen(true)
                  }
                ].map((tag, index) => (
                  <motion.button
                    key={tag.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={tag.onClick}
                    className={`bg-gradient-to-r ${tag.color} px-6 py-3 rounded-full text-sm font-medium border backdrop-blur-sm cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {tag.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <AstroBot isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
    </div>
  );
}

export default App;