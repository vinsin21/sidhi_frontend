// src/components/FilterPanel.tsx

import React from 'react';
import { SearchFilters } from '../types';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  jobCount: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, jobCount }) => {
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  const clearAllFilters = () => {
    onFilterChange({
      platform: 'all',
      jobType: 'all',
      experienceLevel: 'all',
    });
  };

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'Indeed', label: 'Indeed' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Naukri', label: 'Naukri' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Platform Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Platform</label>
          <div className="space-y-2">
            {platforms.map(platform => (
              <label key={platform.value} className="flex items-center">
                <input
                  type="radio"
                  name="platform"
                  value={platform.value}
                  checked={filters.platform === platform.value}
                  onChange={(e) => handleFilterChange('platform', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{platform.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* --- RESTORED: Job Type Filter --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Job Type</label>
          <div className="space-y-2">
            {['all', 'full-time', 'part-time', 'contract', 'internship'].map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="jobType"
                  value={type}
                  checked={filters.jobType === type}
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {type === 'all' ? 'All Types' : type.replace('-', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* --- RESTORED: Experience Level Filter --- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Experience Level</label>
          <div className="space-y-2">
            {['all', 'entry level', 'mid-senior level', 'senior'].map(level => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="experienceLevel"
                  value={level}
                  checked={filters.experienceLevel === level}
                  onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {level === 'all' ? 'All Levels' : level}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* --- RESTORED: Salary Range & Posted Date (UI ONLY) --- */}
        {/* NOTE: These filters will not work until you update your backend API */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Salary Range</label>
          <p className="text-xs text-gray-400 mb-2">(Backend not implemented)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Posted Date</label>
          <p className="text-xs text-gray-400 mb-2">(Backend not implemented)</p>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;