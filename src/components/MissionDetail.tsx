import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Globe, 
  Target, 
  Award,
  Clock,
  Users,
  DollarSign,
  Zap,
  ExternalLink,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Mission } from '../types';

interface MissionDetailProps {
  mission: Mission | null;
  isOpen: boolean;
  onClose: () => void;
  getStatusColor: (status: string) => string;
}

const MissionDetail: React.FC<MissionDetailProps> = ({ 
  mission, 
  isOpen, 
  onClose, 
  getStatusColor 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!mission) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mission.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mission.images.length) % mission.images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-gray-900/95 to-blue-900/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div className="flex items-center space-x-4">
                <motion.div
                  className={`bg-gradient-to-r ${getStatusColor(mission.status)} px-4 py-2 rounded-full text-sm font-medium border`}
                  whileHover={{ scale: 1.05 }}
                >
                  {mission.status}
                </motion.div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{mission.name}</h2>
                  <p className="text-gray-300">{mission.agency} • {mission.country}</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="p-6 space-y-8">
                {/* Image Gallery */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={mission.images[currentImageIndex]}
                      alt={mission.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {mission.images.length > 1 && (
                      <>
                        <motion.button
                          onClick={prevImage}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </motion.button>
                        <motion.button
                          onClick={nextImage}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </motion.button>
                      </>
                    )}

                    {/* Image Indicators */}
                    {mission.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {mission.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Mission Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4">Mission Overview</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">{mission.description}</p>
                    </div>

                    {/* Objectives */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Target className="h-6 w-6 mr-3 text-blue-400" />
                        Mission Objectives
                      </h3>
                      <ul className="space-y-3">
                        {mission.objectives.map((objective, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start text-gray-300"
                          >
                            <span className="text-blue-400 mr-3 mt-1">•</span>
                            {objective}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Achievements */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Award className="h-6 w-6 mr-3 text-yellow-400" />
                        Key Achievements
                      </h3>
                      <ul className="space-y-3">
                        {mission.achievements.map((achievement, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start text-gray-300"
                          >
                            <span className="text-yellow-400 mr-3 mt-1">★</span>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Clock className="h-6 w-6 mr-3 text-purple-400" />
                        Mission Timeline
                      </h3>
                      <div className="space-y-4">
                        {mission.timeline.map((event, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-4"
                          >
                            <div className="flex-shrink-0 w-3 h-3 bg-purple-400 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-1">
                                <h4 className="text-white font-semibold">{event.event}</h4>
                                <span className="text-purple-400 text-sm">
                                  {formatDate(event.date)}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm">{event.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Significance */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Zap className="h-6 w-6 mr-3 text-purple-400" />
                        Historical Significance
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">{mission.significance}</p>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Key Facts */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4">Key Facts</h3>
                      <div className="space-y-4">
                        {mission.keyFacts.map((fact, index) => (
                          <div key={index} className="border-b border-white/10 pb-3 last:border-b-0">
                            <p className="text-gray-400 text-sm">{fact.label}</p>
                            <p className="text-white font-semibold">{fact.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mission Details */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4">Mission Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-blue-400" />
                          <div>
                            <p className="text-gray-400 text-sm">Launch Date</p>
                            <p className="text-white font-semibold">{formatDate(mission.launchDate)}</p>
                          </div>
                        </div>

                        {mission.endDate && (
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-red-400" />
                            <div>
                              <p className="text-gray-400 text-sm">End Date</p>
                              <p className="text-white font-semibold">{formatDate(mission.endDate)}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-green-400" />
                          <div>
                            <p className="text-gray-400 text-sm">Country</p>
                            <p className="text-white font-semibold">{mission.country}</p>
                          </div>
                        </div>

                        {mission.cost && (
                          <div className="flex items-center space-x-3">
                            <DollarSign className="h-5 w-5 text-yellow-400" />
                            <div>
                              <p className="text-gray-400 text-sm">Cost</p>
                              <p className="text-white font-semibold">{mission.cost}</p>
                            </div>
                          </div>
                        )}

                        {mission.crew && mission.crew.length > 0 && (
                          <div className="flex items-start space-x-3">
                            <Users className="h-5 w-5 text-purple-400 mt-1" />
                            <div>
                              <p className="text-gray-400 text-sm">Crew</p>
                              <div className="space-y-1">
                                {mission.crew.map((member, index) => (
                                  <p key={index} className="text-white font-semibold text-sm">
                                    {member}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Technical Specifications */}
                    {mission.technicalSpecs && (
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4">Technical Specs</h3>
                        <div className="space-y-3">
                          {Object.entries(mission.technicalSpecs).map(([key, value], index) => (
                            <div key={index} className="border-b border-white/10 pb-2 last:border-b-0">
                              <p className="text-gray-400 text-sm">{key}</p>
                              <p className="text-white font-semibold text-sm">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionDetail;