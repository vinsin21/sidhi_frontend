// src/components/JobCard.tsx

import React from 'react';
import { Job } from '../types';
import { MapPin, Calendar, Building2, ExternalLink, Bookmark, Clock } from 'lucide-react';

// ... (keep the other functions like getPlatformColor, getExperienceColor, etc.)

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  // Functions like getPlatformColor, formatPostedDate, etc. go here...
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

    if (diffDays <= 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const isRemote = job.location.toLowerCase().includes('remote');


  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
    >
      {/* ... (keep the top part of the card the same) */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
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
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{job.companyName}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatPostedDate(job.postedOn)}</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
            {job.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(job.sourcePlatform)}`}>
              {job.sourcePlatform}
            </span>
            {job.experienceLevel && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getExperienceColor(job.experienceLevel)}`}>
                {job.experienceLevel}
              </span>
            )}
            {job.jobType && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
                {job.jobType}
              </span>
            )}
            {job.salary && (
              <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                {job.salary}
              </span>
            )}
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="text-gray-500 text-xs px-2 py-1">
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Click to view details</span>
        </div>

        <div className="flex gap-2">
          {/* --- THIS IS THE CHANGE --- */}
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Apply on {job.sourcePlatform}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;