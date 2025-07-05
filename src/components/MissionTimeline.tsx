import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Filter, Search, Rocket, Globe, Target, Award, Clock, Users, DollarSign, Zap, ChevronDown, X, GitCompare as Compare, TrendingUp, BarChart3, Star } from 'lucide-react';
import { Mission, TimelineFilters } from '../types';
import { fetchMissions, getCountries, getMissionTypes, getStatuses } from '../services/missionApi';
import MissionCard from './MissionCard';
import MissionComparison from './MissionComparison';

const MissionTimeline: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMissions, setSelectedMissions] = useState<Mission[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'agency'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<TimelineFilters>({
    countries: [],
    missionTypes: [],
    statuses: [],
    dateRange: { start: 1950, end: 2030 }
  });

  const countries = getCountries();
  const missionTypes = getMissionTypes();
  const statuses = getStatuses();

  useEffect(() => {
    const loadMissions = async () => {
      try {
        const missionData = await fetchMissions();
        setMissions(missionData);
        setFilteredMissions(missionData);
      } catch (error) {
        console.error('Failed to load missions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMissions();
  }, []);

  useEffect(() => {
    let filtered = missions.filter(mission => {
      const matchesSearch = mission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mission.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mission.country.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = filters.countries.length === 0 || filters.countries.includes(mission.country);
      const matchesType = filters.missionTypes.length === 0 || filters.missionTypes.includes(mission.missionType);
      const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(mission.status);
      
      const launchYear = new Date(mission.launchDate).getFullYear();
      const matchesDateRange = launchYear >= filters.dateRange.start && launchYear <= filters.dateRange.end;

      return matchesSearch && matchesCountry && matchesType && matchesStatus && matchesDateRange;
    });

    // Enhanced sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime();
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'agency':
          comparison = a.agency.localeCompare(b.agency);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    setFilteredMissions(filtered);
  }, [missions, searchTerm, filters, sortBy, sortOrder]);

  const toggleFilter = (filterType: keyof Omit<TimelineFilters, 'dateRange'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      countries: [],
      missionTypes: [],
      statuses: [],
      dateRange: { start: 1950, end: 2030 }
    });
    setSearchTerm('');
  };

  const toggleMissionSelection = (mission: Mission) => {
    setSelectedMissions(prev => {
      const isSelected = prev.find(m => m.id === mission.id);
      if (isSelected) {
        return prev.filter(m => m.id !== mission.id);
      } else if (prev.length < 3) {
        return [...prev, mission];
      }
      return prev;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400';
      case 'Ongoing': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
      case 'Partial Success': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-400';
      case 'Failure': return 'from-red-500/20 to-pink-500/20 border-red-500/30 text-red-400';
      case 'Planned': return 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500/30 text-gray-400';
    }
  };

  const getStatsData = () => {
    const totalMissions = filteredMissions.length;
    const successfulMissions = filteredMissions.filter(m => m.status === 'Success').length;
    const ongoingMissions = filteredMissions.filter(m => m.status === 'Ongoing').length;
    const countriesCount = new Set(filteredMissions.map(m => m.country)).size;
    
    return { totalMissions, successfulMissions, ongoingMissions, countriesCount };
  };

  const stats = getStatsData();

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-20 bg-white/10 rounded-2xl"></div>
            <div className="h-16 bg-white/10 rounded-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-white/10 rounded-2xl relative overflow-hidden">
                  <motion.div
                    animate={{ x: [-100, 400] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                    className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Mission Timeline
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                Explore the complete history of space exploration missions from around the world. 
                Filter, compare, and discover the greatest achievements in human space exploration.
              </p>
            </div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-50"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full shadow-2xl">
                <Rocket className="h-12 w-12 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Total Missions', value: stats.totalMissions, icon: Rocket, color: 'blue' },
              { label: 'Successful', value: stats.successfulMissions, icon: Award, color: 'green' },
              { label: 'Ongoing', value: stats.ongoingMissions, icon: TrendingUp, color: 'yellow' },
              { label: 'Countries', value: stats.countriesCount, icon: Globe, color: 'purple' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/20 border border-${stat.color}-500/30`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Search and Filter Bar */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search missions, agencies, countries, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Sort Options */}
              <div className="flex space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'agency')}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
                >
                  <option value="date" className="bg-gray-800">Sort by Date</option>
                  <option value="name" className="bg-gray-800">Sort by Name</option>
                  <option value="agency" className="bg-gray-800">Sort by Agency</option>
                </select>
                
                <motion.button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  {sortOrder === 'desc' ? '↓' : '↑'}
                </motion.button>
              </div>

              {/* Filter Toggle */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  showFilters
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Compare Button */}
              <motion.button
                onClick={() => setShowComparison(true)}
                disabled={selectedMissions.length < 2}
                whileHover={{ scale: selectedMissions.length >= 2 ? 1.02 : 1 }}
                whileTap={{ scale: selectedMissions.length >= 2 ? 0.98 : 1 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedMissions.length >= 2
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Compare className="h-5 w-5" />
                <span>Compare ({selectedMissions.length})</span>
              </motion.button>
            </div>

            {/* Enhanced Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-white/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Countries */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-blue-400" />
                        Countries ({filters.countries.length})
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {countries.map(country => (
                          <label key={country} className="flex items-center space-x-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={filters.countries.includes(country)}
                              onChange={() => toggleFilter('countries', country)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-300 text-sm">{country}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Mission Types */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2 text-green-400" />
                        Mission Types ({filters.missionTypes.length})
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {missionTypes.map(type => (
                          <label key={type} className="flex items-center space-x-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={filters.missionTypes.includes(type)}
                              onChange={() => toggleFilter('missionTypes', type)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-300 text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-yellow-400" />
                        Status ({filters.statuses.length})
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {statuses.map(status => (
                          <label key={status} className="flex items-center space-x-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <input
                              type="checkbox"
                              checked={filters.statuses.includes(status)}
                              onChange={() => toggleFilter('statuses', status)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-gray-300 text-sm">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={clearFilters}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Clear all filters</span>
                    </button>
                    <span className="text-gray-400 text-sm">
                      Showing {filteredMissions.length} of {missions.length} missions
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mission Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredMissions.map((mission, index) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                index={index}
                isSelected={selectedMissions.some(m => m.id === mission.id)}
                onToggleSelection={toggleMissionSelection}
                getStatusColor={getStatusColor}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Empty State */}
        {filteredMissions.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mx-auto mb-8 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30 shadow-2xl"
            >
              <Rocket className="h-16 w-16 text-purple-400" />
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-6">No missions found</h3>
            <p className="text-gray-400 text-xl mb-8 max-w-md mx-auto">
              Try adjusting your search terms or filters to discover amazing space missions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-all shadow-lg"
              >
                Clear all filters
              </button>
              <button
                onClick={() => setSearchTerm('')}
                className="bg-white/10 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all border border-white/20"
              >
                Clear search
              </button>
            </div>
          </motion.div>
        )}

        {/* Mission Comparison Modal */}
        <MissionComparison
          missions={selectedMissions}
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
          getStatusColor={getStatusColor}
        />
      </div>
    </div>
  );
};

export default MissionTimeline;