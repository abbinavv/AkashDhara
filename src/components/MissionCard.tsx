import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Globe, 
  Target, 
  Award,
  Clock,
  Users,
  DollarSign,
  Zap,
  ChevronRight,
  Check,
  Plus
} from 'lucide-react';
import { Mission } from '../types';
import MissionDetail from './MissionDetail';

interface MissionCardProps {
  mission: Mission;
  index: number;
  isSelected: boolean;
  onToggleSelection: (mission: Mission) => void;
  getStatusColor: (status: string) => string;
}

const MissionCard: React.FC<MissionCardProps> = ({ 
  mission, 
  index, 
  isSelected, 
  onToggleSelection, 
  getStatusColor 
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMissionTypeIcon = (type: string) => {
    switch (type) {
      case 'Lunar': return '🌙';
      case 'Mars': return '🔴';
      case 'Venus': return '🟡';
      case 'Jupiter': return '🟠';
      case 'Saturn': return '🪐';
      case 'Solar': return '☀️';
      case 'Earth Orbit': return '🌍';
      case 'Deep Space': return '🌌';
      case 'ISS': return '🛰️';
      case 'Satellite': return '📡';
      default: return '🚀';
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border transition-all duration-500 cursor-pointer group ${
          isSelected 
            ? 'border-purple-400/50 shadow-2xl shadow-purple-500/20' 
            : 'border-white/20 hover:border-white/30 shadow-2xl hover:shadow-3xl'
        }`}
        onClick={() => setShowDetail(true)}
      >
        {/* Selection Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelection(mission);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
            isSelected
              ? 'bg-purple-600 border-purple-400 text-white'
              : 'border-white/30 text-white/70 hover:border-purple-400 hover:text-purple-400'
          }`}
        >
          {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </motion.button>

        {/* Mission Image */}
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          <img
            src={mission.images[0]}
            alt={mission.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Mission Type Badge */}
          <div className="absolute top-4 left-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30"
            >
              <span className="text-white text-sm font-medium flex items-center">
                <span className="mr-2 text-lg">{getMissionTypeIcon(mission.missionType)}</span>
                {mission.missionType}
              </span>
            </motion.div>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 right-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-r ${getStatusColor(mission.status)} px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm`}
            >
              {mission.status}
            </motion.div>
          </div>
        </div>

        {/* Mission Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {mission.name}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {mission.description}
            </p>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-3">
              <div className="flex items-center text-blue-400 mb-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium">Launch Date</span>
              </div>
              <p className="text-white text-sm font-semibold">
                {formatDate(mission.launchDate)}
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-3">
              <div className="flex items-center text-green-400 mb-1">
                <Globe className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium">Agency</span>
              </div>
              <p className="text-white text-sm font-semibold">
                {mission.agency}
              </p>
            </div>

            {mission.cost && (
              <div className="bg-white/5 rounded-xl p-3">
                <div className="flex items-center text-yellow-400 mb-1">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span className="text-xs font-medium">Cost</span>
                </div>
                <p className="text-white text-sm font-semibold">
                  {mission.cost}
                </p>
              </div>
            )}

            <div className="bg-white/5 rounded-xl p-3">
              <div className="flex items-center text-purple-400 mb-1">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium">Duration</span>
              </div>
              <p className="text-white text-sm font-semibold">
                {mission.duration || 'N/A'}
              </p>
            </div>
          </div>

          {/* Achievements Preview */}
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <Award className="h-4 w-4 mr-2 text-yellow-400" />
              Key Achievements
            </h4>
            <ul className="space-y-1">
              {mission.achievements.slice(0, 2).map((achievement, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  {achievement}
                </li>
              ))}
              {mission.achievements.length > 2 && (
                <li className="text-purple-400 text-sm">
                  +{mission.achievements.length - 2} more achievements
                </li>
              )}
            </ul>
          </div>

          {/* View Details Button */}
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center justify-between pt-4 border-t border-white/10"
          >
            <span className="text-purple-400 font-medium">View Full Details</span>
            <ChevronRight className="h-5 w-5 text-purple-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Detail Modal */}
      <MissionDetail
        mission={mission}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        getStatusColor={getStatusColor}
      />
    </>
  );
};

export default MissionCard;