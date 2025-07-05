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
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Mission } from '../types';

interface MissionComparisonProps {
  missions: Mission[];
  isOpen: boolean;
  onClose: () => void;
  getStatusColor: (status: string) => string;
}

const MissionComparison: React.FC<MissionComparisonProps> = ({ 
  missions, 
  isOpen, 
  onClose, 
  getStatusColor 
}) => {
  if (missions.length === 0) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const parseCost = (costString: string): number => {
    if (!costString) return 0;
    const match = costString.match(/[\d.]+/);
    if (!match) return 0;
    const number = parseFloat(match[0]);
    if (costString.toLowerCase().includes('billion')) return number * 1000;
    return number;
  };

  const getComparisonData = () => {
    return {
      costs: missions.map(m => ({ name: m.name, value: parseCost(m.cost || '0') })),
      durations: missions.map(m => {
        const launch = new Date(m.launchDate);
        const end = m.endDate ? new Date(m.endDate) : new Date();
        const days = Math.floor((end.getTime() - launch.getTime()) / (1000 * 60 * 60 * 24));
        return { name: m.name, value: days };
      }),
      achievements: missions.map(m => ({ name: m.name, value: m.achievements.length })),
      objectives: missions.map(m => ({ name: m.name, value: m.objectives.length }))
    };
  };

  const comparisonData = getComparisonData();

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
            className="bg-gradient-to-br from-gray-900/95 to-blue-900/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Mission Comparison</h2>
                <p className="text-gray-300">Comparing {missions.length} space missions</p>
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
                {/* Mission Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {missions.map((mission, index) => (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    >
                      <div className="relative mb-4">
                        <img
                          src={mission.images[0]}
                          alt={mission.name}
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <div className={`absolute top-2 right-2 bg-gradient-to-r ${getStatusColor(mission.status)} px-2 py-1 rounded-full text-xs font-medium border`}>
                          {mission.status}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{mission.name}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{mission.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Agency:</span>
                          <span className="text-white font-medium">{mission.agency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Launch:</span>
                          <span className="text-white font-medium">{formatDate(mission.launchDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white font-medium">{mission.missionType}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Comparison Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Cost Comparison */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <DollarSign className="h-6 w-6 mr-3 text-yellow-400" />
                      Cost Comparison (Millions USD)
                    </h3>
                    <div className="space-y-4">
                      {comparisonData.costs.map((item, index) => {
                        const maxCost = Math.max(...comparisonData.costs.map(c => c.value));
                        const percentage = maxCost > 0 ? (item.value / maxCost) * 100 : 0;
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">{item.name}</span>
                              <span className="text-white font-medium">
                                ${item.value > 0 ? `${item.value}M` : 'N/A'}
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Duration Comparison */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Clock className="h-6 w-6 mr-3 text-blue-400" />
                      Mission Duration (Days)
                    </h3>
                    <div className="space-y-4">
                      {comparisonData.durations.map((item, index) => {
                        const maxDuration = Math.max(...comparisonData.durations.map(d => d.value));
                        const percentage = maxDuration > 0 ? (item.value / maxDuration) * 100 : 0;
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">{item.name}</span>
                              <span className="text-white font-medium">
                                {item.value.toLocaleString()} days
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Achievements Comparison */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Award className="h-6 w-6 mr-3 text-purple-400" />
                      Key Achievements Count
                    </h3>
                    <div className="space-y-4">
                      {comparisonData.achievements.map((item, index) => {
                        const maxAchievements = Math.max(...comparisonData.achievements.map(a => a.value));
                        const percentage = maxAchievements > 0 ? (item.value / maxAchievements) * 100 : 0;
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">{item.name}</span>
                              <span className="text-white font-medium">{item.value} achievements</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Objectives Comparison */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Target className="h-6 w-6 mr-3 text-green-400" />
                      Mission Objectives Count
                    </h3>
                    <div className="space-y-4">
                      {comparisonData.objectives.map((item, index) => {
                        const maxObjectives = Math.max(...comparisonData.objectives.map(o => o.value));
                        const percentage = maxObjectives > 0 ? (item.value / maxObjectives) * 100 : 0;
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-300">{item.name}</span>
                              <span className="text-white font-medium">{item.value} objectives</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>

                {/* Detailed Comparison Table */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <BarChart3 className="h-6 w-6 mr-3 text-cyan-400" />
                    Detailed Comparison
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-gray-400 font-medium py-3">Attribute</th>
                          {missions.map(mission => (
                            <th key={mission.id} className="text-left text-gray-400 font-medium py-3 px-4">
                              {mission.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="space-y-2">
                        <tr className="border-b border-white/10">
                          <td className="text-white font-medium py-3">Country</td>
                          {missions.map(mission => (
                            <td key={mission.id} className="text-gray-300 py-3 px-4">{mission.country}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="text-white font-medium py-3">Agency</td>
                          {missions.map(mission => (
                            <td key={mission.id} className="text-gray-300 py-3 px-4">{mission.agency}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="text-white font-medium py-3">Mission Type</td>
                          {missions.map(mission => (
                            <td key={mission.id} className="text-gray-300 py-3 px-4">{mission.missionType}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="text-white font-medium py-3">Launch Date</td>
                          {missions.map(mission => (
                            <td key={mission.id} className="text-gray-300 py-3 px-4">{formatDate(mission.launchDate)}</td>
                          ))}
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="text-white font-medium py-3">Status</td>
                          {missions.map(mission => (
                            <td key={mission.id} className="py-3 px-4">
                              <span className={`bg-gradient-to-r ${getStatusColor(mission.status)} px-2 py-1 rounded-full text-xs font-medium border`}>
                                {mission.status}
                              </span>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="text-white font-medium py-3">Cost</td>
                          {missions.map(mission => (
                            <td key={mission.id} className="text-gray-300 py-3 px-4">{mission.cost || 'N/A'}</td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-white font-medium py-3">Duration</td>
                          {missions.map(mission => (
                            <td key={mission.id} className="text-gray-300 py-3 px-4">{mission.duration || 'N/A'}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionComparison;