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
      salaryRange: 'all',
      postedDate: 'all'
    });
  };

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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Platform
          </label>
          <div className="space-y-2">
            {['all', 'indeed', 'linkedin', 'naukri.com', 'glassdoor'].map(platform => (
              <label key={platform} className="flex items-center">
                <input
                  type="radio"
                  name="platform"
                  value={platform}
                  checked={filters.platform === platform}
                  onChange={(e) => handleFilterChange('platform', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {platform === 'all' ? 'All Platforms' : platform}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Job Type
          </label>
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

        {/* Experience Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Experience Level
          </label>
          <div className="space-y-2">
            {['all', 'entry', 'mid', 'senior'].map(level => (
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

        {/* Salary Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Salary Range
          </label>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'All Salaries' },
              { value: '0-50k', label: 'Under $50K' },
              { value: '50k-100k', label: '$50K - $100K' },
              { value: '100k-150k', label: '$100K - $150K' },
              { value: '150k+', label: '$150K+' }
            ].map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="salaryRange"
                  value={option.value}
                  checked={filters.salaryRange === option.value}
                  onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Posted Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Posted Date
          </label>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'Any time' },
              { value: '1', label: 'Past 24 hours' },
              { value: '7', label: 'Past week' },
              { value: '30', label: 'Past month' }
            ].map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="postedDate"
                  value={option.value}
                  checked={filters.postedDate === option.value}
                  onChange={(e) => handleFilterChange('postedDate', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {jobCount > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{jobCount}</span> job{jobCount !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;