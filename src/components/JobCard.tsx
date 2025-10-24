import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { useAuth } from '../context/AuthContext';
import { toggleBookmark } from '../services/bookmarkService';
import { MapPin, Calendar, Building2, ExternalLink, Bookmark, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const { isAuthenticated, token } = useAuth();

  const [isBookmarked, setIsBookmarked] = useState(job.isBookmarked || false);
  const [isProcessing, setIsProcessing] = useState(false);

  // This ensures the bookmark status is updated if the job prop changes
  useEffect(() => {
    setIsBookmarked(job.isBookmarked || false);
  }, [job.isBookmarked]);

  const getPlatformColor = (platform: string) => {
    switch (platform?.toLowerCase()) {
      case 'indeed': return 'bg-blue-100 text-blue-800';
      case 'linkedin': return 'bg-sky-100 text-sky-800';
      case 'naukri': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExperienceColor = (level: string | null) => {
    switch (level?.toLowerCase()) {
      case 'entry level': return 'bg-green-100 text-green-800';
      case 'mid-senior level': return 'bg-orange-100 text-orange-800';
      case 'senior': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPostedDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return 'Today';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}m ago`;
  };

  const isRemote = job.location.toLowerCase().includes('remote');

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the main card's onClick from firing

    if (!isAuthenticated || !token) {
      alert("Please sign in to bookmark jobs.");
      return;
    }

    setIsProcessing(true);
    try {
      // Optimistically update the UI for instant feedback
      setIsBookmarked(!isBookmarked);
      await toggleBookmark(job._id, token);
    } catch (error) {
      console.error("Failed to toggle bookmark", error);
      // If the API call fails, revert the UI change back to its original state
      setIsBookmarked(isBookmarked);
      alert("Failed to update bookmark. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group relative"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-12">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            {isRemote && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Remote
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{job.companyName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getPlatformColor(job.sourcePlatform)}`}>
              via {job.sourcePlatform}
            </span>
            {job.experienceLevel && (
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getExperienceColor(job.experienceLevel)}`}>
                {job.experienceLevel}
              </span>
            )}
            {job.jobType && (
              <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold capitalize">
                {job.jobType}
              </span>
            )}
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <button
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
            onClick={handleBookmarkClick}
            disabled={isProcessing || !isAuthenticated}
            title={isBookmarked ? "Remove bookmark" : "Save job"}
          >
            <Bookmark className={`w-5 h-5 ${isAuthenticated && isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Posted {formatPostedDate(job.postedOn)}</span>
        </div>

        <div className="flex gap-2">
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Apply
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

