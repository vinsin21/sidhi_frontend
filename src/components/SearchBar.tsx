import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (title: string, location: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  
  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const jobTitleSuggestions = [
    'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer',
    'Marketing Manager', 'Sales Representative', 'Business Analyst', 'DevOps Engineer',
    'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Mobile Developer'
  ];

  const locationSuggestionsData = [
    'New York, NY', 'San Francisco, CA', 'London, UK', 'Toronto, Canada',
    'Berlin, Germany', 'Mumbai, India', 'Singapore', 'Remote',
    'Bangalore, India', 'Seattle, WA', 'Austin, TX', 'Boston, MA'
  ];

  useEffect(() => {
    if (title.length > 1) {
      const filtered = jobTitleSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(title.toLowerCase())
      );
      setTitleSuggestions(filtered.slice(0, 5));
      setShowTitleSuggestions(true);
    } else {
      setShowTitleSuggestions(false);
    }
  }, [title]);

  useEffect(() => {
    if (location.length > 1) {
      const filtered = locationSuggestionsData.filter(suggestion =>
        suggestion.toLowerCase().includes(location.toLowerCase())
      );
      setLocationSuggestions(filtered.slice(0, 5));
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSearch(title.trim(), location.trim());
      setShowTitleSuggestions(false);
      setShowLocationSuggestions(false);
    }
  };

  const handleTitleSelect = (selectedTitle: string) => {
    setTitle(selectedTitle);
    setShowTitleSuggestions(false);
    titleRef.current?.focus();
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowLocationSuggestions(false);
    locationRef.current?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Job Title Input */}
          <div className="relative flex-1">
            <div className="flex items-center">
              <Search className="w-5 h-5 text-gray-400 ml-4" />
              <input
                ref={titleRef}
                type="text"
                placeholder="Job title, keywords, or company"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => title.length > 1 && setShowTitleSuggestions(true)}
                onBlur={() => setTimeout(() => setShowTitleSuggestions(false), 200)}
                className="w-full pl-3 pr-4 py-4 text-gray-900 placeholder-gray-500 border-none outline-none rounded-xl"
                disabled={loading}
              />
            </div>
            
            {showTitleSuggestions && titleSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                {titleSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleTitleSelect(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location Input */}
          <div className="relative flex-1 md:max-w-xs">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 ml-4" />
              <input
                ref={locationRef}
                type="text"
                placeholder="Location (optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => location.length > 1 && setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                className="w-full pl-3 pr-4 py-4 text-gray-900 placeholder-gray-500 border-none outline-none rounded-xl"
                disabled={loading}
              />
            </div>
            
            {showLocationSuggestions && locationSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                {locationSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleLocationSelect(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={!title.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search Jobs
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;