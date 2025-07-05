import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Calendar, Bot, Sparkles, Baseline as Timeline, Home, Star } from 'lucide-react';

interface HeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onToggleBot: () => void;
  isBotOpen: boolean;
  currentView?: 'home' | 'missions';
  onViewChange?: (view: 'home' | 'missions') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  selectedDate, 
  onDateChange, 
  onToggleBot, 
  isBotOpen,
  currentView = 'home',
  onViewChange
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 p-3 rounded-full shadow-lg">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
              >
                <Star className="h-3 w-3 text-yellow-900 m-0.5" />
              </motion.div>
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                onClick={() => onViewChange?.('home')}
              >
                AkashDhara
              </motion.h1>
              <motion.p 
                className="text-sm text-blue-200/80 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Flow of the Sky ✨
              </motion.p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-6">
            {/* Navigation */}
            {onViewChange && (
              <motion.div 
                className="flex items-center space-x-1 bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={() => onViewChange('home')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                    currentView === 'home'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </motion.button>
                <motion.button
                  onClick={() => onViewChange('missions')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                    currentView === 'missions'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Timeline className="h-4 w-4" />
                  <span className="hidden sm:inline">Missions</span>
                </motion.button>
              </motion.div>
            )}

            {currentView === 'home' && (
              <motion.div 
                className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Calendar className="h-5 w-5 text-blue-400" />
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => onDateChange(new Date(e.target.value))}
                  className="bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm font-medium cursor-pointer"
                />
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleBot}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`relative flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-medium shadow-lg ${
                isBotOpen
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/25'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
              }`}
            >
              <div className="relative">
                <Bot className="h-5 w-5" />
                {!isBotOpen && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full shadow-lg"
                  />
                )}
              </div>
              <span className="hidden sm:inline">AstroBot</span>
              {isBotOpen && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;