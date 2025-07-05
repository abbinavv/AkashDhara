import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Camera, Calendar, Heart, Share2, Download, AlertCircle, RefreshCw, Info, Maximize2, CalendarDays } from 'lucide-react';
import { APODData } from '../types';
import { fetchAPOD } from '../services/nasaApi';
import { formatDisplayDate } from '../utils/dateUtils';

interface APODSectionProps {
  selectedDate: Date;
  onDateChange?: (date: Date) => void;
}

const APODSection: React.FC<APODSectionProps> = ({ selectedDate, onDateChange }) => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const loadAPOD = async (retryAttempt = 0) => {
    setLoading(true);
    setError(null);
    setImageLoaded(false);
    
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      
      // Check if the date is before APOD service started (June 16, 1995)
      const apodStartDate = new Date('1995-06-16');
      if (selectedDate < apodStartDate) {
        throw new Error('NASA\'s Astronomy Picture of the Day service started on June 16, 1995. Please select a more recent date.');
      }
      
      // Check if the date is in the future
      const today = new Date();
      today.setHours(23, 59, 59, 999); // Set to end of today
      if (selectedDate > today) {
        throw new Error('Cannot fetch APOD for future dates. Please select today\'s date or earlier.');
      }
      
      const data = await fetchAPOD(dateString);
      setApodData(data);
      setRetryCount(0);
    } catch (err) {
      console.error('APOD loading error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load APOD';
      setError(errorMessage);
      
      // Auto-retry for network errors (up to 2 times)
      if (retryAttempt < 2 && (
        errorMessage.includes('Network error') || 
        errorMessage.includes('technical difficulties') ||
        errorMessage.includes('try again')
      )) {
        setTimeout(() => {
          setRetryCount(retryAttempt + 1);
          loadAPOD(retryAttempt + 1);
        }, 2000 * (retryAttempt + 1)); // Exponential backoff
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAPOD();
  }, [selectedDate]);

  const handleRetry = () => {
    loadAPOD();
  };

  const handleDateChange = (newDate: string) => {
    const date = new Date(newDate);
    if (onDateChange) {
      onDateChange(date);
    }
    setShowDatePicker(false);
  };

  const handleShare = async () => {
    if (apodData && navigator.share) {
      try {
        await navigator.share({
          title: apodData.title,
          text: `Check out today's Astronomy Picture of the Day: ${apodData.title}`,
          url: window.location.href
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${apodData.title} - ${window.location.href}`);
      }
    }
  };

  const getDateLimits = () => {
    const today = new Date();
    const apodStartDate = new Date('1995-06-16');
    return {
      min: apodStartDate.toISOString().split('T')[0],
      max: today.toISOString().split('T')[0]
    };
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
          <div className="h-8 bg-white/20 rounded-lg w-3/4"></div>
          <div className="h-80 bg-white/20 rounded-2xl relative overflow-hidden">
            <motion.div
              animate={{ x: [-100, 400] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-white/20 rounded w-full"></div>
            <div className="h-4 bg-white/20 rounded w-5/6"></div>
            <div className="h-4 bg-white/20 rounded w-4/6"></div>
          </div>
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

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-2xl rounded-3xl p-8 border border-red-500/20 shadow-2xl"
      >
        <div className="flex items-start space-x-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-400 mb-2">Unable to Load APOD</h3>
            <p className="text-red-200 mb-6 leading-relaxed">{error}</p>
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={handleRetry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 px-5 py-3 rounded-xl border border-red-500/30 transition-all duration-300 shadow-lg"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </motion.button>
              <motion.button
                onClick={() => {
                  const today = new Date();
                  if (onDateChange) {
                    onDateChange(today);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-5 py-3 rounded-xl border border-blue-500/30 transition-all duration-300 shadow-lg"
              >
                <Calendar className="h-4 w-4" />
                <span>Try Today's APOD</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const dateLimits = getDateLimits();

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
              className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Camera className="relative h-8 w-8 text-blue-400" />
          </div>
          Astronomy Picture of the Day
        </motion.h2>
        
        <div className="flex items-center space-x-3">
          <motion.div 
            className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Calendar className="h-5 w-5 mr-2 text-blue-400" />
            <span className="text-blue-200 font-medium">{formatDisplayDate(selectedDate)}</span>
          </motion.div>

          {/* Date Picker Button */}
          {onDateChange && (
            <motion.div className="relative">
              <motion.button
                onClick={() => setShowDatePicker(!showDatePicker)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all shadow-lg border border-purple-500/30"
              >
                <CalendarDays className="h-5 w-5" />
                <span className="hidden sm:inline">Change Date</span>
              </motion.button>

              <AnimatePresence>
                {showDatePicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-2xl z-10 min-w-[280px]"
                  >
                    <div className="space-y-3">
                      <h4 className="text-white font-medium text-sm flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-blue-400" />
                        Select Date for APOD
                      </h4>
                      <input
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(e) => handleDateChange(e.target.value)}
                        min={dateLimits.min}
                        max={dateLimits.max}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      />
                      <div className="text-xs text-gray-400 space-y-1">
                        <p>• Available from June 16, 1995</p>
                        <p>• Up to today's date</p>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleDateChange(new Date().toISOString().split('T')[0])}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 px-3 py-2 rounded-lg text-xs border border-blue-500/30 transition-all"
                        >
                          Today
                        </motion.button>
                        <motion.button
                          onClick={() => setShowDatePicker(false)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 px-3 py-2 rounded-lg text-xs border border-gray-500/30 transition-all"
                        >
                          Close
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {apodData && (
        <div className="space-y-8">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white leading-tight"
          >
            {apodData.title}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl group"
          >
            {apodData.media_type === 'image' ? (
              <div className="relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-white/60"
                    >
                      <Camera className="h-8 w-8" />
                    </motion.div>
                  </div>
                )}
                <img
                  src={apodData.url}
                  alt={apodData.title}
                  className={`w-full h-auto max-h-96 object-cover transition-all duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageLoaded(true);
                    setError('Failed to load the image. The image may be temporarily unavailable.');
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ) : (
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
            
            {apodData.copyright && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium">© {apodData.copyright}</p>
              </motion.div>
            )}

            {/* Action buttons overlay */}
            <motion.div 
              className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1 }}
              whileHover={{ opacity: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full backdrop-blur-sm border border-white/20 transition-colors shadow-lg ${
                  isLiked ? 'bg-red-500/80 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
              {apodData.hdurl && (
                <motion.a
                  href={apodData.hdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg"
                >
                  <Maximize2 className="h-5 w-5" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Info className="h-5 w-5 mr-2 text-blue-400" />
                Description
              </h4>
              {apodData.explanation.length > 300 && (
                <motion.button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </motion.button>
              )}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={showFullDescription ? 'full' : 'truncated'}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-gray-200 leading-relaxed text-lg"
              >
                {showFullDescription 
                  ? apodData.explanation 
                  : apodData.explanation.length > 300 
                    ? `${apodData.explanation.substring(0, 300)}...`
                    : apodData.explanation
                }
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {apodData.hdurl && (
              <motion.a
                href={apodData.hdurl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <ExternalLink className="h-5 w-5" />
                <span>View HD Version</span>
              </motion.a>
            )}
            
            <motion.div
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-gray-300 text-sm">Media Type:</span>
              <span className="text-white font-medium capitalize">{apodData.media_type}</span>
            </motion.div>

            {apodData.copyright && (
              <motion.div
                className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-gray-300 text-sm">Copyright:</span>
                <span className="text-white font-medium">{apodData.copyright}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default APODSection;