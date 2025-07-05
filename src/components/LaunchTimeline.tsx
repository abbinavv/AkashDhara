import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Calendar, Clock, MapPin, Star, Award, Zap, ExternalLink, Info, TrendingUp, Globe, AlertCircle, RefreshCw } from 'lucide-react';
import { LaunchData, HistoricalEvent } from '../types';
import { fetchLaunchesForDate, fetchHistoricalEvents } from '../services/launchLibraryApi';
import { formatDisplayDate, getMonthDay } from '../utils/dateUtils';

interface LaunchTimelineProps {
  selectedDate: Date;
}

const LaunchTimeline: React.FC<LaunchTimelineProps> = ({ selectedDate }) => {
  const [launches, setLaunches] = useState<LaunchData[]>([]);
  const [historicalEvents, setHistoricalEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'launches'>('events');
  const [retryCount, setRetryCount] = useState(0);

  const loadData = async (retryAttempt = 0) => {
    setLoading(true);
    setError(null);
    
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const monthDay = getMonthDay(selectedDate);
      
      const [launchData, eventData] = await Promise.all([
        fetchLaunchesForDate(dateStr).catch(() => []), // Graceful fallback for launch data
        fetchHistoricalEvents(monthDay)
      ]);
      
      setLaunches(launchData);
      setHistoricalEvents(eventData);
      setRetryCount(0);
    } catch (err) {
      console.error('Timeline loading error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load timeline data';
      setError(errorMessage);
      
      // Auto-retry for network errors (up to 2 times)
      if (retryAttempt < 2 && (
        errorMessage.includes('Network error') || 
        errorMessage.includes('Failed to fetch')
      )) {
        setTimeout(() => {
          setRetryCount(retryAttempt + 1);
          loadData(retryAttempt + 1);
        }, 2000 * (retryAttempt + 1));
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const handleRetry = () => {
    loadData();
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'moon landing':
      case 'moon mission':
        return <Star className="h-5 w-5" />;
      case 'isro mission':
        return <Rocket className="h-5 w-5" />;
      case 'space telescope':
        return <Award className="h-5 w-5" />;
      case 'mars mission':
        return <Globe className="h-5 w-5" />;
      case 'human spaceflight':
        return <TrendingUp className="h-5 w-5" />;
      case 'deep space':
        return <Zap className="h-5 w-5" />;
      case 'satellite':
        return <MapPin className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'moon landing':
      case 'moon mission':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400';
      case 'isro mission':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400';
      case 'space telescope':
        return 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400';
      case 'mars mission':
        return 'from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400';
      case 'human spaceflight':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
      case 'deep space':
        return 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400';
      case 'space tragedy':
        return 'from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-400';
      case 'satellite':
        return 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-400';
      case 'space pioneer':
        return 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400';
      default:
        return 'from-slate-500/20 to-slate-600/20 border-slate-500/30 text-slate-400';
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl"
      >
        <div className="animate-pulse space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 bg-white/20 rounded-lg w-64"></div>
            <div className="h-6 bg-white/20 rounded-lg w-32"></div>
          </div>
          <div className="flex space-x-4">
            <div className="h-12 bg-white/20 rounded-xl w-32"></div>
            <div className="h-12 bg-white/20 rounded-xl w-32"></div>
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white/20 rounded-2xl relative overflow-hidden">
              <motion.div
                animate={{ x: [-100, 400] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
              />
            </div>
          ))}
        </div>
        {retryCount > 0 && (
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center space-x-2 text-blue-300">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
              <span className="text-sm">Retrying... (Attempt {retryCount + 1})</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.h2 
          className="text-3xl font-bold text-white flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative mr-4">
            <motion.div 
              className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Rocket className="relative h-8 w-8 text-purple-400" />
          </div>
          Space Timeline
        </motion.h2>
        <motion.div 
          className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <Calendar className="h-5 w-5 mr-2 text-purple-400" />
          <span className="text-purple-200 font-medium">{formatDisplayDate(selectedDate)}</span>
        </motion.div>
      </div>

      {error && (
        <motion.div 
          className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="text-red-400 font-semibold mb-2">Timeline Loading Issue</h4>
              <p className="text-red-200 mb-4">{error}</p>
              <motion.button
                onClick={handleRetry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 px-4 py-2 rounded-lg border border-red-500/30 transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Tab Navigation */}
      <div className="flex space-x-2 mb-8 bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
        <motion.button
          onClick={() => setActiveTab('events')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
            activeTab === 'events'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
              : 'text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Star className="h-5 w-5" />
          <span>Historical Events</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            activeTab === 'events' ? 'bg-white/20' : 'bg-purple-500/20'
          }`}>
            {historicalEvents.length}
          </span>
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('launches')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
            activeTab === 'launches'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
              : 'text-gray-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Rocket className="h-5 w-5" />
          <span>Recent Launches</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            activeTab === 'launches' ? 'bg-white/20' : 'bg-purple-500/20'
          }`}>
            {launches.length}
          </span>
        </motion.button>
      </div>

      <div className="space-y-6">
        {/* Enhanced Historical Events */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {historicalEvents.map((event, index) => (
                <motion.div
                  key={`${event.date}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <motion.div
                          className={`flex items-center space-x-2 bg-gradient-to-r ${getCategoryColor(event.category)} px-4 py-2 rounded-full text-sm font-medium border shadow-lg`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {getCategoryIcon(event.category)}
                          <span>{event.category}</span>
                        </motion.div>
                        {event.year > 0 && (
                          <motion.span 
                            className="bg-white/10 text-gray-300 px-3 py-2 rounded-full text-sm font-medium border border-white/20 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                          >
                            {event.year}
                          </motion.span>
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                        {event.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed text-lg">{event.description}</p>
                      
                      {/* Additional context for significant events */}
                      {event.category === 'ISRO Mission' && (
                        <motion.div 
                          className="mt-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-green-300 text-sm flex items-center">
                            <Award className="h-4 w-4 mr-2" />
                            Proud achievement of the Indian Space Research Organisation
                          </p>
                        </motion.div>
                      )}
                      
                      {(event.category === 'Moon Landing' || event.category === 'Moon Mission') && (
                        <motion.div 
                          className="mt-4 p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-yellow-300 text-sm flex items-center">
                            <Star className="h-4 w-4 mr-2" />
                            Historic milestone in lunar exploration
                          </p>
                        </motion.div>
                      )}

                      {event.category === 'Human Spaceflight' && (
                        <motion.div 
                          className="mt-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-blue-300 text-sm flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Pioneering achievement in human space exploration
                          </p>
                        </motion.div>
                      )}

                      {event.category === 'Space Tragedy' && (
                        <motion.div 
                          className="mt-4 p-3 bg-gray-500/10 rounded-xl border border-gray-500/20"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-gray-300 text-sm flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            A solemn reminder that shaped space safety protocols
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Enhanced Recent Launches */}
        {activeTab === 'launches' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {launches.length > 0 ? (
              <AnimatePresence>
                {launches.map((launch, index) => (
                  <motion.div
                    key={launch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <motion.span
                            className={`px-4 py-2 rounded-full text-sm font-medium border shadow-lg ${
                              launch.status.abbrev === 'Success' 
                                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30'
                                : launch.status.abbrev === 'Go'
                                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30'
                                : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {launch.status.name}
                          </motion.span>
                          <motion.span 
                            className="bg-white/10 text-gray-300 px-3 py-2 rounded-full text-sm font-medium border border-white/20 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                          >
                            {launch.launch_service_provider.name}
                          </motion.span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                          {launch.name}
                        </h4>
                        <p className="text-gray-300 mb-4 leading-relaxed text-lg">{launch.mission.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <motion.div 
                            className="flex items-center bg-white/5 rounded-xl px-4 py-3 border border-white/10"
                            whileHover={{ scale: 1.02 }}
                          >
                            <Rocket className="h-4 w-4 mr-3 text-blue-400" />
                            <div>
                              <p className="text-gray-400">Rocket</p>
                              <p className="text-white font-medium">{launch.rocket.configuration.name}</p>
                            </div>
                          </motion.div>
                          <motion.div 
                            className="flex items-center bg-white/5 rounded-xl px-4 py-3 border border-white/10"
                            whileHover={{ scale: 1.02 }}
                          >
                            <Clock className="h-4 w-4 mr-3 text-green-400" />
                            <div>
                              <p className="text-gray-400">Launch Time</p>
                              <p className="text-white font-medium">{new Date(launch.net).toLocaleString()}</p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      {launch.image && (
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 2 }}
                          className="ml-6 relative"
                        >
                          <img
                            src={launch.image}
                            alt={launch.name}
                            className="w-24 h-24 object-cover rounded-xl border border-white/20 shadow-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-blue-500/30 shadow-lg"
                >
                  <Rocket className="h-10 w-10 text-blue-400" />
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-3">No launches found for this date</h4>
                <p className="text-gray-400 text-lg">
                  Space launches happen regularly - try checking other dates to discover recent missions!
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Enhanced Empty State for Historical Events */}
        {activeTab === 'events' && historicalEvents.length === 0 && !loading && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mx-auto mb-8 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30 shadow-lg"
            >
              <Star className="h-12 w-12 text-purple-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Exploring Space History
            </h3>
            <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
              While no specific events are recorded for this date, space exploration continues with ongoing missions and discoveries happening around the world.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const today = new Date();
                // This would trigger a re-fetch with today's date
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all shadow-lg"
            >
              Explore Today's Space Events
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LaunchTimeline;